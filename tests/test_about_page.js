/* ============================================================
   ECO-EXPLORER — tests/test_about_page.js
   Verifikasi Layar Profil Pengembang (Agita Khairunnisa)
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('  OK  ' + name); }
  else { fail++; console.log('  FAIL ' + name); }
}

function createMockElement(tag, className = '') {
  const el = {
    tagName: tag.toUpperCase(),
    className,
    style: {},
    innerHTML: '',
    textContent: '',
    children: [],
    attributes: {},
    classList: {
      _classes: new Set(className ? className.split(' ') : []),
      add(c) { this._classes.add(c); el.className = Array.from(this._classes).join(' '); },
      remove(c) { this._classes.delete(c); el.className = Array.from(this._classes).join(' '); },
      contains(c) { return this._classes.has(c); }
    },
    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      return child;
    },
    remove() {
      if (this.parentNode) {
        const idx = this.parentNode.children.indexOf(this);
        if (idx !== -1) this.parentNode.children.splice(idx, 1);
        this.parentNode = null;
      }
    },
    querySelector(sel) {
      return createMockElement('div');
    },
    querySelectorAll() {
      return [];
    }
  };
  return el;
}

const rootEl = createMockElement('section');

const sandbox = {
  console,
  el: (sel) => {
    if (sel === '#scr-about') return rootEl;
    return createMockElement('div');
  },
  ic: () => '',
  sfx: { click() {}, back() {} },
  toggleSound: () => {},
  syncSound: () => {},
  buildTeam: () => {},
  buildTeacher: () => {},
  go: () => {}
};

vm.createContext(sandbox);

function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
}

console.log('=== TEST SUITE: TENTANG PENGEMBANG (AGITA KHAIRUNNISA) ===');

load('js/scenes/about.js');

const buildAbout = sandbox.buildAbout;
ok('buildAbout adalah fungsi', typeof buildAbout === 'function');

buildAbout();
const html = rootEl.innerHTML;

ok('Render nama Agita Khairunnisa', html.includes('Agita Khairunnisa'));
ok('Render program studi S1 Teknologi Pendidikan', html.includes('S1 Teknologi Pendidikan'));
ok('Render Universitas Negeri Malang', html.includes('Universitas Negeri Malang'));
ok('Render path foto profil Foto pas agita.webp', html.includes('assets/images/Foto pas agita.webp'));
ok('Render judul media ECO-EXPLORER', html.includes('ECO-EXPLORER'));
ok('Render sapaan Halo!', html.includes('Halo!'));
ok('Render teks Media pembelajaran game simulasi', html.includes('Media pembelajaran game simulasi'));
ok('Render peserta didik kelas V (Fase C)', html.includes('peserta didik kelas V (Fase C)'));
ok('Render fitur pembelajaran simulasi dan kartu aksi', html.includes('simulasi ekosistem, kartu aksi pemulihan ekosistem, musyawarah kelas'));
ok('Bebas dari tag bold acak (tidak ada tag <b>)', !html.includes('<b>') && !html.includes('</b>'));
ok('Bebas dari emoji slop', !/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html));
ok('Bebas dari pill badge dan bento item berlebih', !html.includes('about-role-pill') && !html.includes('about-meta-grid') && !html.includes('about-card-badge'));
ok('Render tombol navigasi Mulai Petualangan dan Panduan Guru', html.includes('about-btn-play') && html.includes('about-btn-teacher'));

// Verifikasi tombol di Home Screen (index.html) dan handler (js/main.js)
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
ok('Tombol #btn-about hadir di index.html pada layar judul', indexHtml.includes('id="btn-about"'));
ok('Tombol #btn-about memiliki teks Tentang Pengembang', indexHtml.includes('Tentang Pengembang'));

const mainJs = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');
ok('Handler #btn-about terdaftar di js/main.js', mainJs.includes("el('#btn-about')") && mainJs.includes("buildAbout()") && mainJs.includes("go('about')"));
ok('Dukungan query param ?screen=about terdaftar di js/main.js', mainJs.includes("p === 'about'"));

const gameCss = fs.readFileSync(path.join(ROOT, 'css/game.css'), 'utf8');
ok('CSS #btn-about terdaftar di css/game.css', gameCss.includes('#btn-about'));

console.log(`\nHasil: ${pass} lolos, ${fail} gagal\n`);
if (fail > 0) process.exit(1);
