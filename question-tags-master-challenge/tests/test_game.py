"""Real browser tests of the standalone game. Runs its own local HTTP server."""
import functools
import os
from pathlib import Path
import shutil
import tempfile
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(tempfile.mkdtemp(prefix='question-tags-browser-tests-'))
PREFIX = '/question-tags-master-challenge'
VIEWPORTS = [(320, 568), (360, 640), (375, 812), (390, 844), (430, 932), (768, 1024), (1024, 768), (1440, 900)]

# Independent expected answers: tests use only browser UI to play the game.
EXPECTED = [
    ('Your sister is a prefect,', "isn't she?"),
    ("They don't live near the school,", 'do they?'),
    ('We can finish this project today,', "can't we?"),
    ("Your brothers aren't tired,", 'are they?'),
    ("He isn't at home,", 'is he?'),
    ('Ali plays football after school,', "doesn't he?"),
    ('Amir played badminton yesterday,', "didn't he?"),
    ('They live near the park,', "don't they?"),
    ('She visited the museum last Saturday,', "didn't she?"),
    ("The pupils didn't arrive late,", 'did they?'),
    ("The pupils weren't noisy,", 'were they?'),
    ('We are ready for Sports Day,', "aren't we?"),
    ('You should recycle these bottles,', "shouldn't you?"),
    ('She will join our study group,', "won't she?"),
    ("Your father wasn't angry,", 'was he?'),
    ('You will plant trees tomorrow,', "won't you?"),
    ('Your cousins visited Langkawi last month,', "didn't they?"),
    ("Siti doesn't waste water,", 'does she?'),
    ('Your friends can bake a cake,', "can't they?"),
    ('The beach was clean after our picnic,', "wasn't it?")
]
PRACTICE = ["isn't she?", 'do you?', "doesn't he?", "didn't she?", 'was he?', "won't she?"]


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith(PREFIX + '/'):
            self.path = self.path[len(PREFIX):]
        super().do_GET()

    def log_message(self, *_):
        pass


def overlap(a, b):
    return (min(a['x'] + a['width'], b['x'] + b['width']) > max(a['x'], b['x']) + 1
            and min(a['y'] + a['height'], b['y'] + b['height']) > max(a['y'], b['y']) + 1)


def check_layout(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal scrolling'
    for button in page.locator('button:visible').all():
        box = button.bounding_box()
        assert box['width'] >= 48 and box['height'] >= 48, button.inner_text()
    sections = page.locator('main > section:visible')
    assert sections.count() == 1, 'Screens overlap'
    panel = sections.bounding_box()
    assert abs(panel['x'] + panel['width'] / 2 - page.viewport_size['width'] / 2) < 1
    for button in page.locator('.answer:visible').all():
        label = button.locator('.answer-label')
        assert label.evaluate('''el => {
            const range = document.createRange(); range.selectNodeContents(el);
            const bounds = el.closest('button').getBoundingClientRect();
            return [...range.getClientRects()].every(r => r.left >= bounds.left && r.right <= bounds.right);
        }'''), 'Answer text leaves its button'
        if button.locator('.answer-mark').count():
            assert not overlap(label.bounding_box(), button.locator('.answer-mark').bounding_box())
    answers = page.locator('.answer:visible').all()
    for index, button in enumerate(answers):
        for other in answers[index + 1:]:
            assert not overlap(button.bounding_box(), other.bounding_box())
    if page.locator('#quiz-screen').is_visible():
        for a, b in [('#round-label', '.score-pill'), ('#question-count', '#completed-count'), ('#round-count', '#round-stars')]:
            assert not overlap(page.locator(a).bounding_box(), page.locator(b).bounding_box()), 'Status text overlaps'
        if page.viewport_size['width'] < 600:
            bounds = [answer.bounding_box() for answer in page.locator('#answers button').all()]
            assert all(abs(box['x'] - bounds[0]['x']) < 1 for box in bounds), 'Answers need one column'


def choose(page, answer, keyboard=False):
    button = page.locator('#answers').get_by_role('button', name=answer, exact=True)
    if keyboard:
        button.focus()
        page.keyboard.press('Enter')
    else:
        button.tap()
    return button


def advance(page, index):
    page.locator('#next-question').tap()
    if index % 5 == 4 and index < 19:
        assert page.locator('#round-screen').is_visible()
        assert page.locator('#round-title').inner_text() == f'Round {index // 5 + 1} complete!'
        page.locator('#next-round').tap()
        page.locator('#next-round').dispatch_event('click')
        assert page.locator('#question-count').inner_text() == f'Question {index + 2} of 20'


def full_game(page, width, height):
    score = 0
    seen = set()
    for index, (sentence, answer) in enumerate(EXPECTED):
        check_layout(page)
        assert page.locator('#quiz-title').inner_text() == sentence + ' _____?'
        assert sentence not in seen
        seen.add(sentence)
        assert page.locator('#question-count').inner_text() == f'Question {index + 1} of 20'
        assert page.locator('#round-label').inner_text().startswith(f'Round {index // 5 + 1} of 4')
        assert page.locator('#round-count').inner_text() == f'This round: question {index % 5 + 1} of 5'
        assert page.locator('#game-progress').get_attribute('value') == str(index)
        assert page.locator('#completed-count').inner_text() == f'{index} of 20 complete'
        assert page.locator('#answers button').count() == 3
        options = page.locator('#answers .answer-label').all_text_contents()
        assert len(set(options)) == 3 and options.count(answer) == 1
        assert page.locator('#next-question').is_hidden()
        page.locator('#next-question').dispatch_event('click')
        assert page.locator('#question-count').inner_text() == f'Question {index + 1} of 20'
        if index % 5 == 0:
            page.set_viewport_size({'width': height, 'height': width})
            check_layout(page)
            page.locator('#answers button').last.scroll_into_view_if_needed()
            sticky = page.locator('.quiz-status').bounding_box()
            assert sticky['y'] >= -1 and sticky['y'] + sticky['height'] <= width, 'Sticky panel leaves screen'
            page.set_viewport_size({'width': width, 'height': height})
        wrong = next(choice for choice in options if choice != answer)
        choose(page, wrong)
        assert page.locator('#score').inner_text() == str(score)
        assert '0 points' in page.locator('#feedback').inner_text()
        assert page.locator('#explanation').inner_text()
        assert page.locator('#game-progress').get_attribute('value') == str(index)
        page.locator('#retry').tap()
        assert page.locator('#score').inner_text() == str(score)
        assert page.locator('#answers .answer-mark').count() == 0
        assert all(button.is_enabled() for button in page.locator('#answers button').all())
        assert page.locator('#next-question').is_hidden()
        correct = choose(page, answer, keyboard=index == 0)
        score += 10
        assert page.locator('#score').inner_text() == str(score)
        assert page.locator('#game-progress').get_attribute('value') == str(index + 1)
        assert page.locator('#game-progress').get_attribute('aria-valuetext') == f'{index + 1} of 20 questions completed'
        assert page.locator('#round-stars .star-earned').count() == index % 5 + 1
        assert all(button.is_disabled() for button in page.locator('#answers button').all())
        correct.dispatch_event('click')
        page.locator('#retry').dispatch_event('click')
        assert page.locator('#score').inner_text() == str(score), 'Duplicate points'
        check_layout(page)
        if index % 5 == 0:
            page.screenshot(path=str(OUTPUT / f'{width}-round-{index // 5 + 1}.png'), full_page=True)
        advance(page, index)
    assert len(seen) == 20
    assert page.locator('#results-screen').is_visible()
    assert page.locator('#final-score').inner_text() == '200'
    assert page.locator('#percentage').inner_text() == '100%'
    assert page.locator('#correct-count').inner_text() == '20 / 20'
    assert page.locator('#achievement').inner_text() == 'Question Tag Master'
    assert page.locator('.round-result').count() == 4
    assert page.locator('.round-result strong').all_text_contents() == ['50 / 50'] * 4
    check_layout(page)


server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Handler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{server.server_port}{PREFIX}/index.html'
try:
    with sync_playwright() as p:
        executable = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
        browser = p.chromium.launch(**({'executable_path': executable} if executable else {}), headless=True, args=['--no-sandbox'])
        errors = []
        for width, height in VIEWPORTS:
            context = browser.new_context(viewport={'width': width, 'height': height}, has_touch=True, is_mobile=width < 600, reduced_motion='reduce')
            page = context.new_page()
            page.on('pageerror', lambda error: errors.append(str(error)))
            external_requests = []
            page.on('request', lambda request: external_requests.append(request.url) if not request.url.startswith(URL.rsplit('/', 1)[0]) else None)
            page.goto(URL)
            assert page.title() == 'Question Tags Master Challenge'
            check_layout(page)
            page.screenshot(path=str(OUTPUT / f'{width}-menu.png'), full_page=True)
            page.locator('#learn-play').tap()
            for index, answer in enumerate(PRACTICE):
                assert page.locator('#lesson-count').inner_text() == f'Rule {index + 1} of 6'
                assert page.locator('#lesson-examples .example').count() == 2
                assert page.locator('#lesson-malay').inner_text()
                check_layout(page)
                if width == 320:
                    options = page.locator('#practice-answers .answer-label').all_text_contents()
                    wrong = next(option for option in options if option != answer)
                    page.locator('#practice-answers').get_by_role('button', name=wrong, exact=True).tap()
                    assert 'Try the other answer' in page.locator('#practice-feedback').inner_text()
                page.locator('#practice-answers').get_by_role('button', name=answer, exact=True).tap()
                assert 'Exactly!' in page.locator('#practice-feedback').inner_text()
                assert page.locator('#score').inner_text() == '0'
                if index < 5:
                    page.locator('#lesson-next').tap()
            assert page.locator('#lesson-next').is_disabled()
            page.locator('#lesson-back').tap()
            assert page.locator('#lesson-count').inner_text() == 'Rule 5 of 6'
            page.locator('#start-challenge').tap()
            full_game(page, width, height)
            page.screenshot(path=str(OUTPUT / f'{width}-results.png'), full_page=True)
            page.locator('#play-again').tap()
            assert page.locator('#score').inner_text() == '0'
            assert page.locator('#game-progress').get_attribute('value') == '0'
            choose(page, EXPECTED[0][1])
            page.locator('#rule-help').tap()
            assert page.locator('#start-challenge').inner_text() == 'Back to challenge →'
            page.locator('#start-challenge').tap()
            assert page.locator('#score').inner_text() == '10'
            assert all(button.is_disabled() for button in page.locator('#answers button').all())
            page.locator('#quiz-screen [data-menu]').tap()
            assert page.locator('#menu-screen').is_visible()
            page.locator('#resume').tap()
            assert page.locator('#score').inner_text() == '10'
            page.locator('#restart').tap()
            assert page.locator('#score').inner_text() == '0'
            # Notches, home indicator, rotation and offline play.
            page.evaluate('''() => {
                for (const [name, value] of Object.entries({top: 28, right: 24, bottom: 34, left: 24}))
                    document.documentElement.style.setProperty('--safe-' + name, value + 'px');
            }''')
            check_layout(page)
            assert page.locator('#quiz-screen').bounding_box()['x'] >= 24
            context.set_offline(True)
            choose(page, EXPECTED[0][1])
            assert page.locator('#score').inner_text() == '10'
            assert not external_requests, external_requests
            context.close()
            print(f'PASS: {width} × {height}: all 6 lessons, 20 touch questions, retries, keyboard, scores, rotations, navigation, safe areas and offline play', flush=True)

        # Different final scores, badge thresholds, and zero-point skips.
        context = browser.new_context(viewport={'width': 375, 'height': 812}, has_touch=True, is_mobile=True)
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(URL)
        page.locator('#learn-play').tap()
        page.locator('#start-challenge').tap()
        for correct_count, badge in [(18, 'Question Tag Master'), (14, 'Grammar Star'), (8, 'Rising Star'), (0, 'Brave Learner')]:
            for index, (_, answer) in enumerate(EXPECTED):
                if index < correct_count:
                    choose(page, answer)
                else:
                    options = page.locator('#answers .answer-label').all_text_contents()
                    choose(page, next(option for option in options if option != answer))
                    assert page.locator('#score').inner_text() == str(correct_count * 10)
                advance(page, index)
            assert page.locator('#final-score').inner_text() == str(correct_count * 10)
            assert page.locator('#percentage').inner_text() == f'{correct_count * 5}%'
            assert page.locator('#achievement').inner_text() == badge
            assert page.locator('#correct-count').inner_text() == f'{correct_count} / 20'
            page.locator('#results-screen [data-menu]').tap()
            assert page.locator('#resume').is_hidden()
            page.locator('#learn-play').tap()
            page.locator('#start-challenge').tap()
        # Double-next must not skip an unanswered question.
        choose(page, EXPECTED[0][1])
        page.locator('#next-question').dispatch_event('click')
        page.locator('#next-question').dispatch_event('click')
        assert page.locator('#question-count').inner_text() == 'Question 2 of 20'
        page.locator('#brand-home').tap()
        assert page.url == URL, 'Menu navigation must work within a GitHub Pages subpath'
        page.locator('#resume').tap()
        assert page.locator('#question-count').inner_text() == 'Question 2 of 20'
        assert not errors, errors
        context.close()
        browser.close()
        print('PASS: 240 quiz questions, all badge thresholds, zero-point skips, duplicate guards and subpath assets; no browser errors.')
        print('Physical Android/iPhone devices and Safari: not tested (Chromium emulation only).')
        print(f'Screenshots: {OUTPUT}')
finally:
    server.shutdown()
    server.server_close()
