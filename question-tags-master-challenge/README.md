# Question Tags Master Challenge

A standalone English grammar game for Malaysian Year 6 pupils (CEFR A2). Built with HTML, CSS and vanilla JavaScript. No accounts, personal data, backend, external assets, paid services or build step.

## Run locally

Open `index.html` in a modern browser. The page embeds the current CSS and JavaScript so it also works in previews that serve only the HTML file. Keep the editable source files together when developing the game.

Alternatively, on your MacBook, open Terminal, type `cd ` (including the space), drag the project folder onto Terminal, then press Return. Start a local server:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser. Stop the server with Control+C. Python 3 is optional; double-clicking `index.html` also works on an unmanaged browser.

## Play

1. Choose **Learn & play**. Explore six tutorial rules, each with two examples, a brief Malay explanation and an interactive practice question.
2. Choose **Start Challenge**. Answer 20 questions across four rounds of five. Each question has three choices and exactly one correct answer.
3. A correct answer earns 10 points and a star. Wrong answers earn zero points. You may retry for full points or choose **Move on · 0 points**. Retrying never awards duplicate points.
4. Use **Rule help** during the quiz to revisit the tutorial without losing your current answer or score. **Back to menu** pauses the current challenge; **Resume challenge** continues it. **Restart challenge** resets all progress.
5. Finish to see your score out of 200, percentage, round scores and achievement badge. **Play Again** starts a fresh challenge.

Progress counts questions that have a correct answer or that you have moved past. A wrong attempt stays on the current question until you retry or move on. Reloading the page starts fresh; no pupil information or scores are stored or sent anywhere.

Badge thresholds: **Question Tag Master** (90–100%), **Grammar Star** (70–85%), **Rising Star** (40–65%), **Brave Learner** (0–35%). Scores increase in steps of 10 points (5%).

## Project files

- `index.html`: menu, tutorial, quiz, round transitions and results.
- `styles.css`: responsive layout, safe areas, touch targets and reduced-motion support.
- `game.js`: six lessons, 20 checked questions, navigation and scoring.
- `tools/sync_page.py`: refreshes the embedded CSS and JavaScript after source edits.
- `.nojekyll`: tells GitHub Pages to serve the static files directly.
- `tests/test_game.py`: optional browser verification; not needed to play or publish.
- `tests/test_preview.py`: standalone preview, styling and asset-loading checks.

The trophy is a local inline SVG, limited to 80 pixels wide on phones and 135–145 pixels on larger screens. Fonts use the browser's built-in fonts. The page needs no sibling asset requests and works under a GitHub Pages repository URL or an arbitrary preview path. This project is independent of any other game or repository.

After editing `styles.css` or `game.js`, run `python3 tools/sync_page.py`. This keeps their embedded copies in `index.html` identical to the editable sources. The game script runs after all HTML game elements exist; no gameplay logic was changed for the standalone preview.

## Test

Manually check tutorial navigation and practice, all four rounds, a wrong answer followed by retry, moving past a wrong answer, scoring, round transitions, rule help, menu/resume, restart and final results. Use Tab and Enter/Space to operate buttons. Resize your browser or rotate a phone. Important controls have at least 48 × 48 CSS pixel touch targets.

The automated browser suite runs its own temporary local server at a repository-style subpath. No server needs to be started first. Optional test dependencies:

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 tests/test_game.py
python3 tests/test_preview.py
```

It verifies all six practice questions and all 20 quiz answers, wrong attempts, retry scoring, repeated click events, progress, round stars, final scores, all four badge bands, help/menu/resume, resets and offline play. It exercises touch at widths **320, 360, 375, 390, 430, 768, 1024 and 1440**, plus landscape rotations, keyboard controls and simulated safe areas. Screenshots are saved to a temporary directory and its path is printed. Set `CHROMIUM_PATH` if you need a particular Chromium executable.

Chromium emulation does not establish physical Android/iPhone or Safari compatibility. Test on those devices before classroom use. The code uses standard browser features, and the optional ResizeObserver enhancement has a fallback.

The preview suite serves only `index.html` at a nested preview URL and rejects all other network requests. It checks the computed heading size, turquoise rounded action button, centred container, proportional trophy, full 20-question playthrough and restart at seven phone/tablet/desktop widths. It also verifies that the embedded copies match the source files.

## Publish in the existing repository as a separate game page

This game belongs in `question-tags-master-challenge/` inside `3mohdzamriazmi-creator/flash-missing-school-things`. The original Flash game stays at the repository root. The Year 6 game uses its own files and does not depend on the Flash game.

1. Confirm the `main` branch contains `question-tags-master-challenge/index.html`, `styles.css` and `game.js`. Its notes, questions and SVG illustration are local; the page also embeds its current CSS and JavaScript. There are no external runtime assets to upload.
2. Open the repository's **Settings → Pages**: `https://github.com/3mohdzamriazmi-creator/flash-missing-school-things/settings/pages`.
3. Under **Build and deployment**, choose **Deploy from a branch**, select **main**, choose **/ (root)**, then click **Save**. If these settings are already active, leave them in place. Serve the repository root so both games remain accessible. Do not change the source to the Year 6 folder or replace the root index.html.
4. Open **Actions** and wait for the Pages deployment for the latest commit to succeed. If GitHub reports a failed build, open the failed job and resolve its stated error before sharing the link.
5. Open the Year 6 game at `https://3mohdzamriazmi-creator.github.io/flash-missing-school-things/question-tags-master-challenge/`. **Visit site** in Settings may open the original game; append `question-tags-master-challenge/` to reach the Year 6 page.
6. Verify the page shows **Question Tags Master Challenge**, the styled **Learn & play** button, six tutorial rules and 20 quiz questions. Check a wrong answer and retry, complete the challenge, verify the result, then use **Play Again** and **Back to Menu**. A complete correct run earns 200 points (100%). Test the link on a phone too.
7. Confirm the original game still loads at `https://3mohdzamriazmi-creator.github.io/flash-missing-school-things/`, including its pictures and audio.

A pushed commit confirms the files are on GitHub; it does not confirm publication. Call the Year 6 page live only after the GitHub deployment succeeds and its published URL loads the correct game. If it shows 404, check the deployment status and the exact folder spelling before retrying.
