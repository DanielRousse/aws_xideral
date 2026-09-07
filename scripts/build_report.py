import os
import re
import sys
import html
import subprocess
import tempfile
from pathlib import Path

def parse_markdown(md_text):
    lines = md_text.splitlines()
    title = "Reporte Técnico"
    meta = {}
    body_lines = []
    in_header = True

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if in_header:
            if stripped.startswith("# "):
                title = stripped[2:].strip()
                i += 1
                continue
            meta_match = re.match(r'^\*\*([^:]+):\*\*\s*(.+)$', stripped)
            if meta_match:
                key = meta_match.group(1).strip()
                val = meta_match.group(2).strip()
                meta[key] = val
                i += 1
                continue
            if stripped == "---":
                in_header = False
                i += 1
                continue
            if stripped == "":
                i += 1
                continue
            in_header = False

        body_lines.append(line)
        i += 1

    content_html = []
    idx = 0
    total = len(body_lines)

    def format_inline(text):
        escaped = html.escape(text)
        escaped = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<figure class="report-img-wrap"><img src="\2" alt="\1" class="report-img"><figcaption>\1</figcaption></figure>', escaped)
        escaped = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', escaped)
        escaped = re.sub(r'\*(.+?)\*', r'<em>\1</em>', escaped)
        escaped = re.sub(r'`([^`]+)`', r'<code>\1</code>', escaped)
        escaped = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank">\1</a>', escaped)
        return escaped

    while idx < total:
        line = body_lines[idx]
        stripped = line.strip()

        if not stripped:
            idx += 1
            continue

        if stripped.startswith("```"):
            lang = stripped[3:].strip()
            code_lines = []
            idx += 1
            while idx < total and not body_lines[idx].strip().startswith("```"):
                code_lines.append(body_lines[idx])
                idx += 1
            idx += 1
            code_str = html.escape("\n".join(code_lines))
            content_html.append(f'<pre><code class="language-{lang}">{code_str}</code></pre>')
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            table_lines = []
            while idx < total and body_lines[idx].strip().startswith("|") and body_lines[idx].strip().endswith("|"):
                table_lines.append(body_lines[idx].strip())
                idx += 1
            if len(table_lines) >= 2:
                header_cols = [c.strip() for c in table_lines[0].strip('|').split('|')]
                data_rows = table_lines[2:]
                tbl_html = ['<table><thead><tr>']
                for col in header_cols:
                    tbl_html.append(f'<th>{format_inline(col)}</th>')
                tbl_html.append('</tr></thead><tbody>')
                for drow in data_rows:
                    cols = [c.strip() for c in drow.strip('|').split('|')]
                    tbl_html.append('<tr>')
                    for col in cols:
                        tbl_html.append(f'<td>{format_inline(col)}</td>')
                    tbl_html.append('</tr>')
                tbl_html.append('</tbody></table>')
                content_html.append("".join(tbl_html))
            continue

        if stripped.startswith("#### "):
            h_text = stripped[5:].strip()
            content_html.append(f'<h4>{format_inline(h_text)}</h4>')
            idx += 1
            continue

        if stripped.startswith("### "):
            h_text = stripped[4:].strip()
            content_html.append(f'<h3>{format_inline(h_text)}</h3>')
            idx += 1
            continue

        if stripped.startswith("## "):
            h_text = stripped[3:].strip()
            content_html.append(f'<h2>{format_inline(h_text)}</h2>')
            idx += 1
            continue

        if stripped == "---":
            content_html.append('<hr>')
            idx += 1
            continue

        if stripped.startswith("> "):
            callout_lines = []
            while idx < total and body_lines[idx].strip().startswith(">"):
                callout_lines.append(body_lines[idx].strip()[1:].strip())
                idx += 1
            c_text = " ".join(callout_lines)
            content_html.append(f'<div class="callout">{format_inline(c_text)}</div>')
            continue

        if re.match(r'^\*\s+', stripped):
            items = []
            while idx < total and re.match(r'^\*\s+', body_lines[idx].strip()):
                items.append(body_lines[idx].strip()[2:].strip())
                idx += 1
            items_html = "".join([f'<li>{format_inline(it)}</li>' for it in items])
            content_html.append(f'<ul>{items_html}</ul>')
            continue

        if re.match(r'^\d+\.\s+', stripped):
            items = []
            while idx < total and re.match(r'^\d+\.\s+', body_lines[idx].strip()):
                match = re.match(r'^\d+\.\s+(.+)$', body_lines[idx].strip())
                if match:
                    items.append(match.group(1).strip())
                idx += 1
            items_html = "".join([f'<li>{format_inline(it)}</li>' for it in items])
            content_html.append(f'<ol>{items_html}</ol>')
            continue

        img_match = re.match(r'^!\[([^\]]*)\]\(([^)]+)\)$', stripped)
        if img_match:
            alt_txt = html.escape(img_match.group(1))
            src_txt = img_match.group(2)
            content_html.append(f'<figure class="report-img-wrap"><img src="{src_txt}" alt="{alt_txt}" class="report-img"><figcaption>{alt_txt}</figcaption></figure>')
            idx += 1
            continue

        para_lines = []
        while idx < total:
            curr = body_lines[idx].strip()
            if not curr:
                break
            if curr.startswith(("#", "```", "|", ">", "---", "* ", "![")) or re.match(r'^\d+\.\s+', curr):
                break
            para_lines.append(curr)
            idx += 1
        p_text = " ".join(para_lines)
        content_html.append(f'<p>{format_inline(p_text)}</p>')

    return title, meta, "\n".join(content_html)

def build_html_document(title, meta, body_html, base_dir=None):
    module_badge = meta.get("Módulo", meta.get("Modulo", "Módulo"))
    status_badge = meta.get("Estado", "Entregado")
    author = meta.get("Autor", "Jonathan Daniel Reyes Gordillo")
    date = meta.get("Fecha", "2026")
    program = meta.get("Programa", "AWS Xideral")

    base_tag = f'<base href="file://{base_dir.resolve()}/">' if base_dir else ""

    html_str = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  {base_tag}
  <title>{html.escape(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4;
      margin: 16mm 14mm;
    }}
    * {{
      box-sizing: border-box;
    }}
    body {{
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.55;
      font-size: 13.5px;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .header-card {{
      border-bottom: 2px solid #0284c7;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }}
    .badge-bar {{
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }}
    .badge {{
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 4px;
      background: #e0f2fe;
      color: #0369a1;
    }}
    .badge-success {{
      background: #dcfce7;
      color: #15803d;
    }}
    h1 {{
      font-size: 21px;
      color: #0f172a;
      margin: 0 0 6px 0;
      font-weight: 700;
    }}
    .meta-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      font-size: 12px;
      color: #64748b;
      margin-top: 8px;
    }}
    .meta-grid strong {{
      color: #334155;
    }}
    h2 {{
      font-size: 15.5px;
      color: #0f172a;
      border-left: 4px solid #0284c7;
      padding-left: 8px;
      margin: 18px 0 10px 0;
      font-weight: 600;
      page-break-after: avoid;
    }}
    h3 {{
      font-size: 13.5px;
      color: #1e293b;
      margin: 14px 0 6px 0;
      font-weight: 600;
      page-break-after: avoid;
    }}
    h4 {{
      font-size: 12.5px;
      color: #334155;
      margin: 12px 0 4px 0;
      font-weight: 600;
      page-break-after: avoid;
    }}
    p {{
      margin: 0 0 10px 0;
    }}
    ul, ol {{
      margin: 0 0 12px 0;
      padding-left: 20px;
    }}
    li {{
      margin-bottom: 4px;
    }}
    pre {{
      background: #0f172a;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      padding: 10px 12px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 8px 0 12px 0;
      line-height: 1.45;
      page-break-inside: avoid;
    }}
    code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: #f1f5f9;
      color: #0369a1;
      padding: 2px 5px;
      border-radius: 4px;
    }}
    pre code {{
      background: transparent;
      color: inherit;
      padding: 0;
      font-size: inherit;
    }}
    .callout {{
      background: #f8fafc;
      border-left: 4px solid #f59e0b;
      padding: 10px 12px;
      border-radius: 0 6px 6px 0;
      font-size: 12.5px;
      color: #334155;
      margin: 12px 0;
      page-break-inside: avoid;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }}
    th, td {{
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }}
    th {{
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 600;
    }}
    tr:nth-child(even) {{
      background: #f8fafc;
    }}
    hr {{
      border: 0;
      border-top: 1px solid #e2e8f0;
      margin: 18px 0;
    }}
    .report-img-wrap {{
      margin: 14px 0;
      text-align: center;
      page-break-inside: avoid;
    }}
    .report-img {{
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }}
    figcaption {{
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      font-style: italic;
    }}
  </style>
</head>
<body>
  <div class="header-card">
    <div class="badge-bar">
      <span class="badge">{html.escape(program)}</span>
      <span class="badge">{html.escape(module_badge)}</span>
      <span class="badge badge-success">{html.escape(status_badge)}</span>
    </div>
    <h1>{html.escape(title)}</h1>
    <div class="meta-grid">
      <div><strong>Autor:</strong> {html.escape(author)}</div>
      <div><strong>Fecha:</strong> {html.escape(date)}</div>
    </div>
  </div>
  <main>
    {body_html}
  </main>
</body>
</html>"""
    return html_str

def compile_pdf(md_path, out_pdf_path=None):
    path = Path(md_path)
    if not path.exists():
        print(f"Error: {md_path} no existe")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    title, meta, body_html = parse_markdown(md_text)
    full_html = build_html_document(title, meta, body_html, base_dir=path.parent)

    if out_pdf_path is None:
        stem = path.stem
        out_pdf_path = path.parent / f"{stem}.pdf"
    else:
        out_pdf_path = Path(out_pdf_path)
        out_pdf_path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as tf:
        tf.write(full_html)
        temp_html_path = tf.name

    try:
        cmd = [
            "google-chrome-stable",
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={str(out_pdf_path.resolve())}",
            temp_html_path
        ]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0 and out_pdf_path.exists():
            print(f"[OK] PDF generado con exito: {out_pdf_path} ({out_pdf_path.stat().st_size} bytes)")
            return True
        else:
            print(f"Error al generar PDF: {result.stderr}")
            return False
    finally:
        if os.path.exists(temp_html_path):
            os.remove(temp_html_path)

def main():
    if len(sys.argv) > 1:
        targets = sys.argv[1:]
    else:
        targets = list(Path("docs").glob("**/*.md"))

    if not targets:
        print("No se encontraron archivos markdown para compilar")
        return

    for t in targets:
        compile_pdf(t)

if __name__ == "__main__":
    main()
