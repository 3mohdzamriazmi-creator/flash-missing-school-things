"""Verify the real standalone HTML when a preview cannot serve sibling files."""
import os
from pathlib import Path
import shutil
import tempfile

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(tempfile.mkdtemp(prefix='question-tags-updated-preview-'))
HTML = (ROOT / 'index.html').read_text()
for name, filename, tag in [('STYLES', 'styles.css', 'style'), ('GAME', 'game.js', 'script')]:
    embedded = HTML.split(f'<!-- BEGIN EMBEDDED {name} -->', 1)[1].split(f'<!-- END EMBEDDED {name} -->', 1)[0]
    assert embedded.strip() == f'<{tag}>\n{(ROOT / filename).read_text().rstrip()}\n</{tag}>', 'Run python3 tools/sync_page.py'

ANSWERS = ["isn't she?", 'do they?', "can't we?", 'are they?', 'is he?',
           "doesn't he?", "didn't he?", "don't they?", "didn't she?", 'did they?',
           'were they?', "aren't we?", "shouldn't you?", "won't she?", 'was he?',
           "won't you?", "didn't they?", 'does she?', "can't they?", "wasn't it?"]

with sync_playwright() as p:
    executable = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
    browser = p.chromium.launch(**({'executable_path': executable} if executable else {}), headless=True, args=['--no-sandbox'])
    errors = []
    for width, height in [(320, 568), (360, 640), (375, 812), (390, 844), (430, 932), (768, 1024), (1440, 900)]:
        page = browser.new_page(viewport={'width': width, 'height': height}, has_touch=True, is_mobile=width < 600)
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('console', lambda message: errors.append(message.text) if message.type == 'error' else None)
        requests = []
        page.on('request', lambda request: requests.append(request.resource_type))
        page.route('**/*', lambda route: route.fulfill(status=200, content_type='text/html', body=HTML)
                   if route.request.resource_type == 'document' else route.abort())
        page.goto('http://preview.invalid/course/question-tags/game')
        assert page.locator('#menu-screen').is_visible()
        style = page.evaluate('''() => {
            const cta = document.getElementById('learn-play');
            const art = document.querySelector('.trophy-art');
            const title = document.getElementById('menu-title');
            const container = document.querySelector('.app-shell');
            return {font: getComputedStyle(document.body).fontFamily,
                    background: getComputedStyle(cta).backgroundColor,
                    color: getComputedStyle(cta).color,
                    radius: parseFloat(getComputedStyle(cta).borderRadius),
                    heading: parseFloat(getComputedStyle(title).fontSize),
                    intro: parseFloat(getComputedStyle(document.querySelector('.hero .lead')).fontSize),
                    art: {width: art.getBoundingClientRect().width, height: art.getBoundingClientRect().height},
                    grid: getComputedStyle(document.querySelector('.hero')).display,
                    container: container.getBoundingClientRect().toJSON()};
        }''')
        assert 'Trebuchet' in style['font'], style
        assert style['background'] == 'rgb(8, 123, 121)' and style['color'] == 'rgb(255, 255, 255)'
        assert style['radius'] >= 16 and 32 <= style['heading'] <= 48 and style['intro'] == 17
        assert 80 <= style['art']['width'] <= 145
        assert abs(style['art']['width'] / style['art']['height'] - 220 / 190) < .01
        assert style['grid'] == 'grid'
        assert style['container']['width'] <= 1040
        assert abs(style['container']['x'] + style['container']['width'] / 2 - width / 2) < 1
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        cta = page.locator('#learn-play').bounding_box()
        assert cta['width'] >= 48 and cta['height'] >= 56
        assert cta['y'] + cta['height'] <= height, 'Primary action below the initial phone viewport'
        page.screenshot(path=str(OUTPUT / f'{width}-menu.png'), full_page=True)
        page.locator('#learn-play').tap()
        assert page.locator('#lesson-title').inner_text() == 'Positive statement → negative tag'
        page.screenshot(path=str(OUTPUT / f'{width}-tutorial.png'), full_page=True)
        page.locator('#start-challenge').tap()
        for index, answer in enumerate(ANSWERS):
            assert page.locator('#answers button').count() == 3
            assert page.locator('#question-count').inner_text() == f'Question {index + 1} of 20'
            page.locator('#answers').get_by_role('button', name=answer, exact=True).tap()
            assert page.locator('#score').inner_text() == str((index + 1) * 10)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            if index == 0:
                page.screenshot(path=str(OUTPUT / f'{width}-quiz.png'), full_page=True)
            page.locator('#next-question').tap()
            if index % 5 == 4 and index < 19:
                page.locator('#next-round').tap()
        assert page.locator('#results-screen').is_visible()
        assert page.locator('#final-score').inner_text() == '200'
        assert page.locator('#percentage').inner_text() == '100%'
        page.screenshot(path=str(OUTPUT / f'{width}-results.png'), full_page=True)
        page.locator('#play-again').tap()
        assert page.locator('#score').inner_text() == '0'
        page.locator('#brand-home').tap()
        assert page.locator('#menu-screen').is_visible()
        assert requests == ['document'], requests
        page.close()
        print(f'PASS: HTML-only preview at {width}px; styled menu, tutorial and 20 playable questions; no sibling asset requests', flush=True)
    assert not errors, errors
    browser.close()
print('PASS: 140 preview questions; correct typography, trophy proportions, rounded CTA, source synchronisation and no browser errors.')
print(f'Updated preview screenshots: {OUTPUT}')
