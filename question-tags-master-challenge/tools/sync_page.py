"""Keep the preview standalone while retaining the editable CSS/JS sources."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
page_path = ROOT / 'index.html'
page = page_path.read_text()
for name, filename, tag in [('STYLES', 'styles.css', 'style'), ('GAME', 'game.js', 'script')]:
    start = f'<!-- BEGIN EMBEDDED {name} -->'
    end = f'<!-- END EMBEDDED {name} -->'
    before, remainder = page.split(start, 1)
    _, after = remainder.split(end, 1)
    content = (ROOT / filename).read_text().rstrip()
    if f'</{tag}' in content.lower():
        raise ValueError(f'Cannot safely embed {filename}: closing HTML tag found')
    page = f'{before}{start}\n<{tag}>\n{content}\n</{tag}>\n  {end}{after}'
if page != page_path.read_text():
    page_path.write_text(page)
print('index.html embeds the current styles.css and game.js for standalone previews.')
