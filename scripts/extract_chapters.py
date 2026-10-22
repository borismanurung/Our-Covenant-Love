import sys
import json
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except ImportError:
    print('PyPDF2 not installed, attempting to install...')
    import subprocess, os
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'PyPDF2'])
    from PyPDF2 import PdfReader

pdf_path = Path('C:/Users/SGU/Desktop/Boris/Ministry/Our Covenant Love/Web/Marriage For Life/Chapters.pdf')
if not pdf_path.is_file():
    print(f'PDF not found at {pdf_path}')
    sys.exit(1)

reader = PdfReader(str(pdf_path))
text_pages = []
for page in reader.pages:
    text_pages.append(page.extract_text() or '')
full_text = "\n".join(text_pages)

# Save raw text for debugging
out_txt = Path('C:/Users/SGU/Desktop/Boris/Ministry/Our Covenant Love/Web/Marriage For Life/chapter_text.txt')
out_txt.write_text(full_text, encoding='utf-8')
print('Extracted text saved to', out_txt)

# Simple heuristic to find chapter headings – lines that start with "Chapter" (case‑insensitive)
chapters = []
for line in full_text.splitlines():
    if line.strip().lower().startswith('chapter'):
        chapters.append(line.strip())

# Output JSON list of chapter titles
out_json = Path('C:/Users/SGU/Desktop/Boris/Ministry/Our Covenant Love/Web/Marriage For Life/chapters.json')
out_json.write_text(json.dumps(chapters, ensure_ascii=False, indent=2), encoding='utf-8')
print('Chapter titles saved to', out_json)
