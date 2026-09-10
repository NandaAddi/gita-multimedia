from pathlib import Path
import os
import re
import docx
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

REPO_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE = str(REPO_ROOT)

def set_cell_shading(cell, color_hex="F2F2F2"):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_table_borders(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/>
            <w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>
            <w:left w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
            <w:right w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
            <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
        </w:tblBorders>
    ''')
    tblPr.append(borders)

def add_styled_paragraph(doc, text="", style='Normal', space_before=0, space_after=6, line_spacing=1.5, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph(style=style)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    p.paragraph_format.alignment = align
    if text:
        append_formatted_text(p, text)
    return p

def append_formatted_text(paragraph, text, base_font_size=12, is_header=False):
    # Regex to tokenise bold and italic: ***bolditalic***, **bold**, *italic*
    tokens = re.split(r'(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)', text)
    for token in tokens:
        if not token:
            continue
        run = paragraph.add_run()
        run.font.name = "Times New Roman"
        run.font.size = Pt(base_font_size)
        run.font.color.rgb = RGBColor(0, 0, 0)
        
        if token.startswith('***') and token.endswith('***'):
            run.text = token[3:-3]
            run.bold = True
            run.italic = True
        elif token.startswith('**') and token.endswith('**'):
            run.text = token[2:-2]
            run.bold = True
        elif token.startswith('*') and token.endswith('*'):
            run.text = token[1:-1]
            run.italic = True
        else:
            run.text = token
            if is_header:
                run.bold = True

def markdown_to_docx(md_content, output_docx_path, doc_main_title):
    doc = Document()
    
    # Page Setup: A4 with standard Indonesian Academic margins (Atas 3, Kiri 3, Bawah 2.5, Kanan 2.5)
    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Cm(3.0)
        section.bottom_margin = Cm(2.5)
        section.left_margin = Cm(3.0)
        section.right_margin = Cm(2.5)
        
        # Add footer with page number
        footer = section.footer
        f_p = footer.paragraphs[0]
        f_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        f_run = f_p.add_run()
        f_run.font.name = "Times New Roman"
        f_run.font.size = Pt(10)

    # Configure Normal Style
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(12)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)

    lines = md_content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            i += 1
            continue
            
        # Horizontal Rule
        if line in ['---', '***', '___']:
            i += 1
            continue
            
        # Heading 1
        if line.startswith('# '):
            title_text = line[2:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(6)
            p.paragraph_format.space_after = Pt(12)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
            append_formatted_text(p, title_text, base_font_size=14, is_header=True)
            i += 1
            continue
            
        # Heading 2
        if line.startswith('## '):
            h2_text = line[3:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(14)
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
            append_formatted_text(p, h2_text, base_font_size=13, is_header=True)
            i += 1
            continue

        # Heading 3
        if line.startswith('### '):
            h3_text = line[4:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
            append_formatted_text(p, h3_text, base_font_size=12, is_header=True)
            i += 1
            continue

        # Heading 4
        if line.startswith('#### '):
            h4_text = line[5:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
            append_formatted_text(p, h4_text, base_font_size=12, is_header=True)
            i += 1
            continue

        # Table detection
        if line.startswith('|') and line.endswith('|'):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith('|') and lines[i].strip().endswith('|'):
                table_lines.append(lines[i].strip())
                i += 1
                
            # Process table
            if len(table_lines) >= 2:
                raw_rows = []
                for t_line in table_lines:
                    # Strip leading and trailing '|' and split by '|'
                    cells = [c.strip() for c in t_line[1:-1].split('|')]
                    raw_rows.append(cells)
                
                # Check if row 1 is separator (:---, ---, etc.)
                if len(raw_rows) >= 2 and all(set(c).issubset({'-', ':', ' '}) for c in raw_rows[1] if c):
                    header_row = raw_rows[0]
                    data_rows = raw_rows[2:]
                else:
                    header_row = raw_rows[0]
                    data_rows = raw_rows[1:]
                    
                num_cols = len(header_row)
                table = doc.add_table(rows=len(data_rows) + 1, cols=num_cols)
                table.alignment = WD_TABLE_ALIGNMENT.CENTER
                set_table_borders(table)
                
                # Header row formatting
                hdr_cells = table.rows[0].cells
                for col_idx, cell_text in enumerate(header_row):
                    if col_idx < num_cols:
                        hdr_cells[col_idx].text = ""
                        p = hdr_cells[col_idx].paragraphs[0]
                        p.paragraph_format.space_before = Pt(3)
                        p.paragraph_format.space_after = Pt(3)
                        p.paragraph_format.line_spacing = 1.15
                        append_formatted_text(p, cell_text, base_font_size=11, is_header=True)
                        set_cell_shading(hdr_cells[col_idx], "EAEAEA")
                        
                # Data rows formatting
                for r_idx, row_data in enumerate(data_rows):
                    row_cells = table.rows[r_idx + 1].cells
                    for col_idx, cell_text in enumerate(row_data):
                        if col_idx < num_cols:
                            row_cells[col_idx].text = ""
                            p = row_cells[col_idx].paragraphs[0]
                            p.paragraph_format.space_before = Pt(3)
                            p.paragraph_format.space_after = Pt(3)
                            p.paragraph_format.line_spacing = 1.15
                            append_formatted_text(p, cell_text, base_font_size=10.5)
                            
                # Add spacing after table
                p_after = doc.add_paragraph()
                p_after.paragraph_format.space_before = Pt(0)
                p_after.paragraph_format.space_after = Pt(6)
            continue

        # Unordered list item
        if line.startswith('* ') or line.startswith('- '):
            list_text = line[2:].strip()
            p = doc.add_paragraph(style='List Bullet')
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            append_formatted_text(p, list_text, base_font_size=12)
            i += 1
            continue

        # Numbered list item
        numbered_match = re.match(r'^(\d+)\.\s+(.*)$', line)
        if numbered_match:
            num_str = numbered_match.group(1)
            item_text = numbered_match.group(2)
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.left_indent = Cm(0.8)
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            # Add number and text
            num_run = p.add_run(f"{num_str}. ")
            num_run.font.name = "Times New Roman"
            num_run.font.size = Pt(12)
            num_run.font.bold = True
            append_formatted_text(p, item_text, base_font_size=12)
            i += 1
            continue

        # Regular paragraph
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        append_formatted_text(p, line, base_font_size=12)
        i += 1

    doc.save(output_docx_path)
    print(f"File DOCX berhasil dibuat: {output_docx_path} ({os.path.getsize(output_docx_path):,} bytes)")

def main():
    # 1. Convert ROADMAP.md to Word (.docx)
    roadmap_md = os.path.join(WORKSPACE, "docs", "ROADMAP.md")
    if os.path.exists(roadmap_md):
        with open(roadmap_md, "r", encoding="utf-8") as f:
            content = f.read()
        out_docx = os.path.join(WORKSPACE, "ROADMAP_SKRIPSI_GITO.docx")
        markdown_to_docx(content, out_docx, "Roadmap Mingguan Skripsi R&D")

    # 2. Convert SKRIPSI.md to Word (.docx)
    skripsi_md = os.path.join(WORKSPACE, "docs", "SKRIPSI.md")
    if os.path.exists(skripsi_md):
        with open(skripsi_md, "r", encoding="utf-8") as f:
            content = f.read()
        out_docx = os.path.join(WORKSPACE, "INSTRUMEN_DAN_OUTLINE_SKRIPSI.docx")
        markdown_to_docx(content, out_docx, "Instrumen Wawancara dan Outline Skripsi")

if __name__ == "__main__":
    main()
