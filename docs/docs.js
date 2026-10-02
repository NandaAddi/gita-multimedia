// ==========================================================================
// WEB DOCUMENTATION PORTAL LOGIC
// Strict Constraints: No Icons, No Border Outlines, Pure White/Black/Blue
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const docListEl = document.getElementById('doc-list');
  const docBadgeEl = document.getElementById('doc-badge');
  const docTitleEl = document.getElementById('doc-title');
  const docFilenameEl = document.getElementById('doc-filename');
  const docBodyEl = document.getElementById('doc-body');
  const tocListEl = document.getElementById('toc-list');
  const searchInput = document.getElementById('search-input');
  const contentArea = document.getElementById('content-area');

  if (!window.DOCS_DATA || Object.keys(window.DOCS_DATA).length === 0) {
    docBodyEl.innerHTML = '<p>Dokumen tidak ditemukan atau docs-data.js belum di-generate.</p>';
    return;
  }

  const docs = window.DOCS_DATA;
  const docKeys = Object.keys(docs);
  const urlParams = new URLSearchParams(window.location.search);
  const paramDoc = urlParams.get('doc') || window.location.hash.replace('#', '');
  let activeDocId = (paramDoc && docs[paramDoc]) ? paramDoc : (localStorage.getItem('eco_explorer_active_doc') || docKeys[0]);

  if (!docs[activeDocId]) {
    activeDocId = docKeys[0];
  }

  // 1. Render Left Sidebar Navigation List
  function renderSidebarNav(filterText = '') {
    docListEl.innerHTML = '';
    const query = filterText.toLowerCase().trim();

    docKeys.forEach(key => {
      const d = docs[key];
      const match = !query || 
                    d.title.toLowerCase().includes(query) || 
                    d.category.toLowerCase().includes(query) ||
                    d.filename.toLowerCase().includes(query);

      if (match) {
        const li = document.createElement('li');
        li.className = 'doc-item';

        const btn = document.createElement('button');
        btn.className = `doc-btn ${d.id === activeDocId ? 'active' : ''}`;
        btn.setAttribute('data-id', d.id);

        btn.innerHTML = `
          <span class="doc-btn-category">${escapeHtml(d.category)}</span>
          <span class="doc-btn-title">${escapeHtml(d.title)}</span>
        `;

        btn.addEventListener('click', () => {
          if (activeDocId !== d.id) {
            selectDocument(d.id);
          }
        });

        li.appendChild(btn);
        docListEl.appendChild(li);
      }
    });
  }

  // 2. Select & Render Document Content
  function selectDocument(docId) {
    if (!docs[docId]) return;
    activeDocId = docId;
    localStorage.setItem('eco_explorer_active_doc', docId);

    // Update active class in sidebar
    document.querySelectorAll('.doc-btn').forEach(btn => {
      if (btn.getAttribute('data-id') === docId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const doc = docs[docId];
    docBadgeEl.textContent = doc.badge || doc.category;
    docTitleEl.textContent = doc.title;
    docFilenameEl.textContent = `File Sumber: docs/${doc.filename}`;

    // Configure marked options
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false
      });

      // Parse markdown to HTML
      let rawHtml = marked.parse(doc.content);

      // Clean unwanted emoji icons from headings for strictly typographic clarity
      rawHtml = sanitizeHeadings(rawHtml);

      docBodyEl.innerHTML = rawHtml;
    } else {
      docBodyEl.innerHTML = `<pre>${escapeHtml(doc.content)}</pre>`;
    }

    // Scroll to top of content area
    contentArea.scrollTop = 0;

    // Build Table of Contents (TOC)
    buildTableOfContents();
  }

  // 3. Build Right Sidebar Table of Contents (TOC)
  function buildTableOfContents() {
    tocListEl.innerHTML = '';
    const headings = docBodyEl.querySelectorAll('h2, h3');

    if (headings.length === 0) {
      tocListEl.innerHTML = '<li class="toc-item"><span class="toc-link" style="color:var(--text-light)">Tidak ada sub-bab</span></li>';
      return;
    }

    headings.forEach((heading, idx) => {
      const headingText = heading.textContent.trim();
      const headingId = `section-${idx}-${slugify(headingText)}`;
      heading.id = headingId;

      const li = document.createElement('li');
      li.className = 'toc-item';

      const a = document.createElement('a');
      a.className = `toc-link ${heading.tagName === 'H3' ? 'toc-sub' : ''}`;
      a.href = `#${headingId}`;
      a.textContent = headingText;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        const targetEl = document.getElementById(headingId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
          a.classList.add('active');
        }
      });

      li.appendChild(a);
      tocListEl.appendChild(li);
    });
  }

  // 4. Live Search Filter
  searchInput.addEventListener('input', (e) => {
    renderSidebarNav(e.target.value);
  });

  // Helper: Slugify string
  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  // Helper: Escape HTML
  function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, s => entityMap[s]);
  }

  // Helper: Remove emoji icons from headers to uphold strict NO-ICON constraint
  function sanitizeHeadings(html) {
    return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
      // Remove common emoji character ranges
      const cleanContent = content.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
      return `<h${level}${attrs}>${cleanContent}</h${level}>`;
    });
  }

  // Initial Boot
  renderSidebarNav();
  selectDocument(activeDocId);
});
