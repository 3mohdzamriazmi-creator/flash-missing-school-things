# Picture Quest: Year 1 English Challenge

A mobile-friendly, browser-based English game for Malaysian Year 1 pupils.

## Contents

- `index.html`: complete 30-level game, with CSS, JavaScript, and all SVG illustrations embedded.
- `README.md`: launch, upload, and verification notes.

No external assets, paid APIs, backend, build step, or installation are needed. The original seven assessment questions (7–13) remain unchanged. The 23 additional questions (14–36) are original Year 1 questions.

## Local launch

Open this folder's `index.html` in a modern browser.

## Proposed repository additions

For a Pages site serving from the repository root:

    picture-quest-year-1/index.html
    picture-quest-year-1/README.md

These are new files only. Do not replace the repository's root `index.html`, other games, or Pages configuration.

## Upload when you are ready

1. Open `3mohdzamriazmi-creator/flash-missing-school-things` on GitHub.
2. Check Settings > Pages to identify the existing publishing branch and source folder. Keep the existing configuration. If it uses `/docs`, put this folder inside `docs`; if a workflow deploys a different directory, put it in that workflow's published directory.
3. In the appropriate source folder, choose Add file > Upload files and drag in the entire local `picture-quest-year-1` folder. Do not upload its index.html alone at the repository root.
4. Check the upload list: every addition must be inside `picture-quest-year-1/` (or `docs/picture-quest-year-1/` for a docs source). If that folder already exists, stop and compare its contents before replacing anything.
5. Choose a new branch and open a pull request so you can review the additions before merging into the Pages publishing branch. Suggested commit message: Add Picture Quest Year 1 English game.
6. Merging into the publishing branch may trigger the existing Pages deployment. After deployment, append `picture-quest-year-1/` to your current Pages site URL.

For the standard GitHub Pages project domain, the expected URL is:
https://3mohdzamriazmi-creator.github.io/flash-missing-school-things/picture-quest-year-1/

This URL is proposed, not a confirmed live deployment. A custom domain would use the existing site's base URL instead.

GitHub upload documentation:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Verification

The packaged HTML was served locally at `/flash-missing-school-things/picture-quest-year-1/` and tested in headless Chrome. Passed:

- All 30 correct answers, including the original seven with mappings A, B, C, A, B, C, A.
- Perfect 30/30, all-retry 0/30, and mixed 15/30 scoring.
- Retry hints, no star after an incorrect attempt, and duplicate-answer protection.
- PLAY AGAIN resets and all 30 review entries.
- Keyboard controls and phone mission-map toggle.
- Layout widths of 320, 375, 390, 768, and 1440 pixels, without horizontal overflow.
- No browser JavaScript errors.

The package has no external or absolute asset references and is byte-for-byte identical to the completed source game. No repository changes, pushes, or publications were made. Repository Pages settings could not be verified through the public web view. Actual audio, physical touch, screen-reader output, and other browser engines remain untested.
