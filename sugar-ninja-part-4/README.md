# Sugar Ninja — Part 4 Reading Slice

Separate adaptation of Mr Z’s supplied Gemini Canvas code. Existing Sugar Detective game untouched. Open index.html locally, or upload this entire folder to sugar-ninja-part-4/ on GitHub Pages. Keep assets/ alongside index.html.

Ten-question exam mode, bonus endless mode, swipe/tap answer fruit, bombs/lives, music, Malay meanings, evidence explanations and pupil name/class. Added A/B/C keyboard slicing while matching fruit is visible, focus indicators, reduced-motion handling and safe rendering of pupil details.

Tailwind and Tone.js are bundled in assets/ from the source’s public CDN URLs; Google font requests removed in favour of local fallbacks. Tailwind MIT and Tone MIT dependencies retain upstream embedded notices. No paid API or backend needed for play.

IMPORTANT: Google Sheets is not connected. Existing embedded optional Apps Script setup uses a different POST format from the other games; do not reuse their endpoints. no-cors responses cannot confirm saving: the game now reports submission as unconfirmed. Verify rows in your private spreadsheet. Session log only lasts until reload; CSV can be exported. Automatic recording with confirmed acknowledgements requires a separate integration.

QA: Chrome tested all ten correct matches, 10/10 first-attempt marks, completion, replay reset and widths 320/390/768/1440. Physical-device sound, live Google Sheet writes and endless-mode endurance not tested. Nothing published.

Confirmed automatic recording prepared: new teacher setup in teacher-setup/sugar-ninja-part-4/. Requires its own deployment URL in SCORE_ENDPOINT. Final results use a hidden bridge acknowledgement; no success message until the backend confirms the ID and reading marks. Legacy pupil-facing setup buttons hidden. Browser completion tests pass; live saving awaits setup.

Sugar Ninja recording endpoint configured. Live saving is not yet verified; test after GitHub Pages publication. Local file:// games do not match the backend’s allowed GitHub Pages origin.
