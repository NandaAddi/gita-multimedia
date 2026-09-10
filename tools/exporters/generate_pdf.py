from pathlib import Path
import os
import subprocess
import markdown2

REPO_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE = str(REPO_ROOT)
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

ACADEMIC_CSS = """
@page {
    size: A4 portrait;
    margin: 30mm 25mm 25mm 30mm;
    @bottom-center {
        content: counter(page);
        font-family: "Times New Roman", Times, serif;
        font-size: 11pt;
        color: #000000;
    }
}

* {
    box-sizing: border-box;
}

body {
    font-family: "Times New Roman", Times, serif;
    color: #000000;
    line-height: 1.5;
    font-size: 12pt;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}

h1 {
    font-family: "Times New Roman", Times, serif;
    color: #000000;
    font-size: 14pt;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 18pt;
    page-break-after: avoid;
}

h2 {
    font-family: "Times New Roman", Times, serif;
    color: #000000;
    font-size: 12.5pt;
    font-weight: bold;
    line-height: 1.5;
    margin-top: 18pt;
    margin-bottom: 9pt;
    page-break-after: avoid;
}

h3 {
    font-family: "Times New Roman", Times, serif;
    color: #000000;
    font-size: 12pt;
    font-weight: bold;
    line-height: 1.5;
    margin-top: 14pt;
    margin-bottom: 6pt;
    page-break-after: avoid;
}

h4 {
    font-family: "Times New Roman", Times, serif;
    color: #000000;
    font-size: 12pt;
    font-weight: bold;
    line-height: 1.5;
    margin-top: 12pt;
    margin-bottom: 6pt;
    page-break-after: avoid;
}

p {
    margin-top: 0;
    margin-bottom: 8pt;
    text-align: justify;
    line-height: 1.5;
    font-size: 12pt;
}

ul, ol {
    margin-top: 0;
    margin-bottom: 8pt;
    padding-left: 24pt;
    line-height: 1.5;
    font-size: 12pt;
}

li {
    margin-bottom: 3pt;
    line-height: 1.5;
    text-align: justify;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0 16pt 0;
    font-family: "Times New Roman", Times, serif;
    font-size: 11pt;
    line-height: 1.4;
    page-break-inside: auto;
}

tr {
    page-break-inside: avoid;
}

th {
    border: 1pt solid #000000;
    padding: 6pt 8pt;
    font-weight: bold;
    text-align: left;
    color: #000000;
    background-color: #f2f2f2;
}

td {
    border: 1pt solid #000000;
    padding: 5pt 8pt;
    vertical-align: top;
    color: #000000;
}

hr {
    border: none;
    border-top: 1pt solid #000000;
    margin: 16pt 0;
}
"""

def convert_markdown_to_html(md_content):
    # Standard clean markdown to html conversion
    html = markdown2.markdown(
        md_content,
        extras=["tables", "fenced-code-blocks", "strike", "cuddled-lists", "target-blank-links"]
    )
    return html

def build_pdf_from_html(html_body, doc_title, output_pdf_path):
    temp_html = output_pdf_path.replace(".pdf", "_temp.html")
    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{doc_title}</title>
    <style>
        {ACADEMIC_CSS}
    </style>
</head>
<body>
    {html_body}
</body>
</html>
"""
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)
        
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_pdf_path}",
        temp_html
    ]
    subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(temp_html):
        os.remove(temp_html)
    return os.path.exists(output_pdf_path)

def main():
    print("Memulai pembuatan PDF format akademik bersih...")
    
    # 1. Generate ROADMAP PDF
    roadmap_md = os.path.join(WORKSPACE, "docs", "ROADMAP.md")
    if os.path.exists(roadmap_md):
        with open(roadmap_md, "r", encoding="utf-8") as f:
            content = f.read()
        body = convert_markdown_to_html(content)
        out_pdf = os.path.join(WORKSPACE, "ROADMAP_SKRIPSI_GITO.pdf")
        success = build_pdf_from_html(body, "Roadmap Mingguan Skripsi R&D", out_pdf)
        print("ROADMAP_SKRIPSI_GITO.pdf:", "BERHASIL" if success else "GAGAL", f"({os.path.getsize(out_pdf):,} bytes)" if success else "")

    # 2. Generate SKRIPSI (Instrumen & Outline) PDF
    skripsi_md = os.path.join(WORKSPACE, "docs", "SKRIPSI.md")
    if os.path.exists(skripsi_md):
        with open(skripsi_md, "r", encoding="utf-8") as f:
            content = f.read()
        body = convert_markdown_to_html(content)
        out_pdf = os.path.join(WORKSPACE, "INSTRUMEN_DAN_OUTLINE_SKRIPSI.pdf")
        success = build_pdf_from_html(body, "Instrumen Wawancara dan Outline Skripsi", out_pdf)
        print("INSTRUMEN_DAN_OUTLINE_SKRIPSI.pdf:", "BERHASIL" if success else "GAGAL", f"({os.path.getsize(out_pdf):,} bytes)" if success else "")

if __name__ == "__main__":
    main()
