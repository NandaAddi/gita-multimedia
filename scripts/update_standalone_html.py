import os
import re
import sys

TARGET_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "TES GITA BARU 1", "index.html"))

NEW_STYLE = """<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}
.modal p,.modal ul,.modal li,.kdetail,.kcard,.kcard p,.gita-bubble,.paper,.paper p,.qtext{user-select:text;-webkit-user-select:text}
html,body{width:100%;height:100%;overflow:hidden;background:#01201a;font-family:'Nunito',sans-serif;touch-action:manipulation}
#stage{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform:translate(-50%,-50%) scale(1);background:#0a5c44;overflow:hidden}
.screen{position:absolute;inset:0;display:none;opacity:0;transition:opacity .3s}
.screen.active{display:block;opacity:1}
canvas.cv{position:absolute;inset:0;width:1920px;height:1080px;pointer-events:none}
.ui{position:absolute;inset:0;pointer-events:none}.ui *{pointer-events:auto}
h1,h2,h3,.fr{font-family:'Fredoka',sans-serif}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;border:none;border-radius:18px;font-family:'Fredoka',sans-serif;font-weight:600;color:#fff;background:#0e7a5a;box-shadow:0 6px 0 #064e3b,0 12px 20px rgba(0,0,0,.35);transition:transform .08s,box-shadow .08s;letter-spacing:.5px;min-height:48px}
.btn:active{transform:translateY(5px);box-shadow:0 1px 0 #064e3b,0 4px 10px rgba(0,0,0,.3)}
.btn-gold{background:#f5a30b;box-shadow:0 6px 0 #b45309,0 12px 20px rgba(0,0,0,.35)}.btn-gold:active{box-shadow:0 1px 0 #b45309}
.btn-ruby{background:#d84f4f;box-shadow:0 6px 0 #8e2626,0 12px 20px rgba(0,0,0,.35)}.btn-ruby:active{box-shadow:0 1px 0 #8e2626}
.btn[disabled]{filter:grayscale(.6) brightness(.75);pointer-events:none}
.panel{background:rgba(4,46,36,.96);border:none;border-radius:24px;box-shadow:0 16px 36px rgba(0,0,0,.45)}
.panel-deep{background:rgba(2,38,29,.96);border:none;border-radius:24px;box-shadow:0 14px 32px rgba(0,0,0,.45)}
.ic{flex:none}
@keyframes breathe{0%,100%{box-shadow:0 0 0 0 rgba(245,163,11,.55)}50%{box-shadow:0 0 0 16px rgba(245,163,11,0)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes blink{0%,93%,100%{transform:scaleY(1)}95%,97%{transform:scaleY(.1)}}
@keyframes mo{from{transform:scaleY(.45)}to{transform:scaleY(1.1)}}
#toast-root{position:absolute;inset:0;pointer-events:none;z-index:700}
.toast{position:absolute;left:50%;bottom:80px;transform:translateX(-50%);background:#022c22;color:#fef08a;border:none;border-radius:18px;padding:16px 36px;font-family:'Fredoka';font-size:26px;box-shadow:0 0 0 2px #f5a30b,0 12px 28px rgba(0,0,0,.5);max-width:1500px;text-align:center}
#modal-root{position:absolute;inset:0;display:none;z-index:600}
#modal-root.show{display:block}
.dim{position:absolute;inset:0;background:rgba(2,20,15,.82)}
.modal-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;padding:30px}
.modal{pointer-events:auto;max-width:1560px;max-height:1000px;overflow:auto;padding:44px 52px;color:#fff}
.modal h2{color:#fef08a;font-size:42px;margin-bottom:20px;display:flex;gap:14px;align-items:center}
.modal p{font-size:27px;line-height:1.55;margin-bottom:14px;color:#eafff3}
.modal ul{margin:6px 0 16px 30px;font-size:26px;color:#eafff3;line-height:1.55}
.mrow{display:flex;gap:24px;justify-content:center;align-items:center;margin-top:30px;flex-wrap:wrap}
.mrow .btn{font-size:26px;padding:16px 38px}
.modal.slim{max-width:980px}
.brief-t{font-family:'Fredoka';color:#fef08a;font-size:27px;margin-top:6px}
.gita .eye{transform-box:fill-box;transform-origin:center;animation:blink 4.8s infinite}
.gita .eh{display:none;fill:none;stroke:#2a2320;stroke-width:5;stroke-linecap:round}
.gita.cheer .eh{display:block}.gita.cheer .eye{display:none}
.gita .brow{fill:none;stroke:#3a2f28;stroke-width:5;stroke-linecap:round;transform-box:fill-box;transform-origin:center}
.gita.worried .b1{transform:translateY(-7px) rotate(10deg)}.gita.worried .b2{transform:translateY(-7px) rotate(-10deg)}
.gita.talk .g-mouth{animation:mo .32s infinite alternate;transform-box:fill-box;transform-origin:center}
.title-ui{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center}
.title-kicker{margin-top:52px;background:rgba(2,44,34,.92);border:none;border-radius:999px;color:#fef08a;font-family:'Fredoka';font-size:25px;padding:12px 44px;letter-spacing:2px;box-shadow:0 6px 16px rgba(0,0,0,.3)}
.title-logo{font-size:120px;font-weight:700;color:#fef08a;margin-top:4px;letter-spacing:4px;line-height:1;text-shadow:0 5px 0 #0a3d2c,0 10px 0 rgba(0,0,0,.28);-webkit-text-stroke:2px #022c22}
.title-sub{font-family:'Fredoka';font-size:36px;color:#fff;background:rgba(2,44,34,.88);border-radius:16px;padding:10px 32px;margin-top:12px;border:none;box-shadow:0 6px 16px rgba(0,0,0,.3)}
.title-gita-row{display:flex;align-items:center;gap:30px;margin-top:40px}
.gita-bubble{max-width:840px;padding:24px 36px;font-size:29px;line-height:1.5;color:#fff;border-radius:26px}
.gita-bubble b{color:#fef08a}
.title-btns{display:flex;gap:32px;margin-top:44px}
.menu-card{width:340px;border-radius:26px;padding:28px 24px 26px;cursor:pointer;border:none;text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center;gap:10px;font-family:'Nunito',sans-serif;box-shadow:0 8px 0 rgba(0,0,0,.35),0 14px 24px rgba(0,0,0,.4);transition:transform .08s,box-shadow .08s}
.menu-card:active{transform:translateY(5px);box-shadow:0 3px 0 rgba(0,0,0,.35),0 4px 10px rgba(0,0,0,.3)}
.menu-card.green{background:#0e6b49}
.menu-card.blue{background:#16467d}
.menu-card.purple{background:#582e82}
.menu-ic{width:104px;height:104px;border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.menu-card.green .menu-ic{background:#12945f}
.menu-card.blue .menu-ic{background:#1d6fb8}
.menu-card.purple .menu-ic{background:#8a3ec9}
.menu-card .mc-t{display:block;font-family:'Fredoka';font-weight:600;font-size:30px;line-height:1.15;letter-spacing:1px}
.menu-card .mc-s{display:block;font-size:24px;line-height:1.35;opacity:.95;min-height:64px}
.menu-card.green .mc-s{color:#b8f0d0}.menu-card.blue .mc-s{color:#bfe3ff}.menu-card.purple .mc-s{color:#e6ccff}
.menu-card .go{font-family:'Fredoka';font-weight:700;font-size:30px;letter-spacing:3px}
.menu-card.green .go{color:#2ec98b}.menu-card.blue .go{color:#38bdf8}.menu-card.purple .go{color:#c084fc}
.title-foot{position:absolute;bottom:24px;width:100%;text-align:center;color:rgba(255,255,255,.9);font-family:'Fredoka';font-size:25px}
.topbar{position:absolute;left:30px;right:30px;top:20px;height:72px;display:flex;align-items:center;gap:16px;z-index:5}
.tb-btn{height:58px;font-size:25px;padding:0 26px}
.tb-stars{display:flex;align-items:center;gap:10px;background:rgba(2,44,34,.95);border:none;border-radius:18px;height:58px;padding:0 26px;font-family:'Fredoka';font-size:25px;color:#fef08a;box-shadow:0 6px 16px rgba(0,0,0,.35)}
.spacer{flex:1}
.plaque{background:rgba(2,44,34,.95);border:none;border-radius:18px;color:#fef08a;font-family:'Fredoka';font-size:32px;padding:10px 42px;text-align:center;box-shadow:0 6px 18px rgba(0,0,0,.35)}
.stage{position:absolute;left:190px;right:190px;top:130px;height:600px;padding:36px 52px;display:flex;gap:50px}
.arrow{position:absolute;top:330px;width:92px;height:126px;border-radius:24px;background:#064e3b;border:none;color:#fef08a;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 0 #023d2c,0 12px 22px rgba(0,0,0,.35);z-index:6}
.arrow:active{transform:translateY(5px);box-shadow:0 3px 0 #023d2c}
.arrow.prev{left:52px}.arrow.next{right:52px}
.hero-left{width:620px;flex:none;display:flex;flex-direction:column;align-items:center;gap:14px}
.pedestal{width:340px;height:340px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(254,240,138,.22) 0%,rgba(254,240,138,0) 68%)}
.pedestal canvas{animation:bob 3.2s ease-in-out infinite}
.hero-right{flex:1;display:flex;flex-direction:column;gap:16px;min-width:0}
.hero-name{font-size:46px;color:#fef08a}
.hero-motto{font-size:26px;color:#7fd4e8;font-family:'Fredoka'}
.hero-dossier{background:rgba(2,44,34,.7);border:none;border-radius:18px;padding:18px 24px;font-size:25px;line-height:1.55;color:#eafff3;box-shadow:0 6px 16px rgba(0,0,0,.3)}
.hero-spec{display:flex;align-items:center;gap:12px;background:#3a2c07;border:none;border-radius:999px;padding:12px 26px;font-family:'Fredoka';font-size:25px;color:#fef08a;box-shadow:0 4px 14px rgba(245,163,11,.3);animation:breathe 1.6s infinite}
.dock{position:absolute;left:50%;transform:translateX(-50%);bottom:32px;display:flex;gap:20px;z-index:5}
.dock-tile{min-width:240px;height:92px;border-radius:20px;background:rgba(2,44,34,.95);border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Fredoka';font-size:25px;color:#cfe9dd;cursor:pointer;padding:0 24px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
.dock-tile.on{box-shadow:0 0 0 3px #f5a30b,0 8px 22px rgba(0,0,0,.45);color:#fef08a;background:#064e3b}
.mmenu{position:absolute;left:130px;right:130px;top:126px;display:flex;flex-direction:column;gap:36px}
.mcard{padding:28px 40px;display:flex;gap:32px;align-items:center;position:relative}
.mcard.locked{filter:grayscale(.75) brightness(.7)}
.mcard .micon{flex:none;width:116px;height:116px;border-radius:24px;background:rgba(2,44,34,.95);border:none;display:flex;align-items:center;justify-content:center;color:#7fd4e8;box-shadow:0 4px 12px rgba(0,0,0,.3)}
.mcard .mbody{flex:1;min-width:0}
.mtype{font-family:'Fredoka';font-size:24px;padding:6px 22px;border-radius:999px;margin-bottom:8px;display:inline-block;border:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.mtype.alam{background:#0e7a5a;color:#d9ffe9}
.mtype.manusia{background:#8e2626;color:#ffe3d9}
.mtitle{font-size:36px;color:#fef08a}
.mhead{font-size:25px;color:#fff;margin-top:4px}
.mtask{font-size:25px;color:#7fd4e8;margin-top:4px;font-family:'Fredoka'}
.mstatus{font-family:'Fredoka';font-size:24px;margin-top:10px;padding:6px 20px;border-radius:999px;display:inline-block;border:none}
.mstatus.ok{background:#0e7a5a;color:#d9ffe9}.mstatus.lock{background:#333;color:#bbb}.mstatus.done{background:#f5a30b;color:#3a2c07}
.mstars{display:flex;gap:6px;font-size:32px;color:#f5a30b;margin-top:8px}
.mstars .off{color:rgba(255,255,255,.22)}
.spec-ribbon{position:absolute;top:-20px;left:40px;background:#f5a30b;color:#3a2c07;font-family:'Fredoka';font-size:24px;padding:6px 26px;border-radius:999px;border:none;box-shadow:0 4px 14px rgba(0,0,0,.3);animation:breathe 1.6s infinite}
.biome-wrap{position:absolute;left:90px;right:90px;top:118px;bottom:36px;display:grid;grid-template-columns:1fr 1fr;gap:32px}
.bio-card{display:flex;gap:26px;padding:24px}
.bio-card.lock{filter:grayscale(.8) brightness(.6)}
.bio-prev{width:440px;height:290px;flex:none;border-radius:20px;border:none;box-shadow:0 6px 18px rgba(0,0,0,.35);overflow:hidden;background:#03211a}
.bio-prev canvas{width:440px;height:290px}
.bio-txt{flex:1;display:flex;flex-direction:column;gap:12px;min-width:0}
.bio-name{font-family:'Fredoka';font-size:36px;color:#fef08a}
.bio-tag{color:#7fd4e8;font-family:'Fredoka';font-size:25px}
.bio-desc{font-size:24px;line-height:1.45;color:#eafff3}
.bio-chain{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.bio-chain .cp{background:rgba(3,52,40,.9);border:none;color:#fff;border-radius:14px;padding:8px 16px;font-family:'Fredoka';font-size:24px;box-shadow:0 3px 8px rgba(0,0,0,.25)}
.bio-chain .ca{color:#f5a30b;font-size:24px;font-weight:900}
.sim-topbar{position:absolute;left:20px;right:20px;top:16px;height:80px;display:flex;align-items:center;gap:14px;z-index:5}
.hpod{position:absolute;left:50%;transform:translateX(-50%);top:16px;width:490px;height:76px;background:rgba(4,27,21,.95);border:none;border-radius:20px;padding:10px 20px;z-index:6;box-shadow:0 8px 22px rgba(0,0,0,.45)}
.hpod .r1{display:flex;justify-content:space-between;font-family:'Fredoka';font-size:25px;color:#fff}
.hpod .st.danger{color:#ff6b5e;animation:hb 1s infinite}
@keyframes hb{50%{opacity:.45}}
.hpod .st.warn{color:#f5c445}.hpod .st.mid{color:#c6e86a}.hpod .st.good{color:#4ade9d}
.hbar{height:14px;background:#123328;border-radius:999px;margin-top:7px;overflow:hidden}
.hbar>div{height:100%;border-radius:999px;background:#f5c445;width:0%;transition:width .8s cubic-bezier(.4,0,.2,1)}
.hbar>div.mid{background:#c6e86a}.hbar>div.good{background:#2ec98b}.hbar>div.danger{background:#ff5c4d}.hbar>div.warn{background:#f5c445}
.day-chip{display:flex;align-items:center;gap:10px;background:rgba(2,44,34,.95);border:none;border-radius:18px;height:58px;padding:0 24px;font-family:'Fredoka';font-size:25px;color:#fff;box-shadow:0 6px 16px rgba(0,0,0,.35)}
.day-chip b{color:#7fd4e8;min-width:36px;text-align:right}
.pause-on{background:#b45309!important;color:#fef08a!important}
.hud-left{position:absolute;left:26px;top:108px;width:580px;z-index:5;display:flex;flex-direction:column;gap:14px;transition:transform .25s ease}
.hud-right{position:absolute;right:26px;top:108px;width:550px;padding:20px 24px;z-index:5;transition:transform .25s ease}
.hud-left.collapsed{transform:translateX(-112%)}
.hud-right.collapsed{transform:translateX(112%)}
.edge-tab{position:absolute;top:108px;width:70px;height:70px;border-radius:50%;background:#064e3b;border:none;color:#fef08a;display:none;align-items:center;justify-content:center;cursor:pointer;z-index:6;box-shadow:0 8px 20px rgba(0,0,0,.45)}
.edge-tab.show{display:flex}
.edge-tab.left{left:10px}.edge-tab.right{right:10px}
.edge-tab .dot{position:absolute;top:2px;right:2px;width:20px;height:20px;border-radius:50%;background:#ff5c4d;border:2px solid #fff;display:none}
.edge-tab .dot.show{display:block}
.panel-x{position:absolute;top:8px;right:8px;width:44px;height:44px;border-radius:50%;background:rgba(2,44,34,.9);border:none;color:#fef08a;font-family:'Fredoka';font-size:25px;line-height:1;cursor:pointer;z-index:2;box-shadow:0 3px 8px rgba(0,0,0,.3)}
.panel-x:hover{background:#064e3b}
.gita-card{padding:18px 22px}
.gita-plaque{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.gita-plaque .tag{background:#f5a30b;color:#3a2c07;font-family:'Fredoka';font-size:24px;padding:4px 18px;border-radius:999px;border:none}
.gita-txt{font-size:25px;line-height:1.45;color:#eafff3;min-height:96px}
.targets-card{padding:16px 22px}
.targets-card h3{font-family:'Fredoka';font-size:25px;color:#fef08a;margin-bottom:10px;display:flex;gap:10px;align-items:center}
.panel-title{font-family:'Fredoka';font-size:25px;color:#fef08a;margin-bottom:14px;display:flex;gap:10px;align-items:center}
.q-strip{display:flex;align-items:center;gap:14px;background:rgba(2,44,34,.75);border-radius:14px;padding:8px 18px;margin-top:10px;font-size:24px;color:#fff;font-family:'Fredoka';border:none}
.q-strip span:last-child{flex:1;line-height:1.3}
.q-strip .b{width:38px;height:38px;flex:none;border-radius:50%;background:#f5a30b;color:#3a2c07;display:flex;align-items:center;justify-content:center;font-size:24px}
.q-strip.done{background:rgba(16,185,129,.25)}
.q-strip.done .b{background:#2ec98b;color:#04231a}
.srow{display:flex;align-items:center;gap:14px;background:rgba(4,52,40,.85);border:none;border-radius:18px;padding:12px 16px;cursor:pointer;margin-bottom:12px;box-shadow:0 4px 12px rgba(0,0,0,.25);transition:transform .1s,box-shadow .1s}
.srow:hover{box-shadow:0 0 0 2px #38bdf8,0 6px 16px rgba(0,0,0,.3)}
.srow .si{width:54px;height:54px;border-radius:14px;background:#04241c;border:none;display:flex;align-items:center;justify-content:center;color:#7fd4e8;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.srow .sn{flex:1;min-width:0}
.srow .sn b{font-family:'Fredoka';font-size:24px;color:#fff;display:block;line-height:1.2}
.srow .sbar{height:10px;background:#0a2b22;border-radius:999px;overflow:hidden;margin-top:6px}
.srow .sbar i{display:block;height:100%;border-radius:999px;transition:width .5s}
.srow .sv{font-family:'Fredoka';font-size:28px;min-width:54px;text-align:right}
.sim-dock{position:absolute;left:50%;transform:translateX(-50%);bottom:20px;width:1520px;z-index:5}
.dock-ribbon{text-align:center;font-family:'Fredoka';font-size:25px;color:#9fd8c3;letter-spacing:1px;margin-bottom:12px}
.dock-grid{display:flex;gap:20px}
.dock-card{flex:1;background:rgba(3,44,34,.96);border:none;border-radius:22px;padding:16px 20px;display:flex;flex-direction:column;gap:10px;box-shadow:0 12px 28px rgba(0,0,0,.45)}
.dock-card.finish{background:rgba(18,49,9,.98);box-shadow:0 0 0 3px #f5a30b,0 12px 28px rgba(0,0,0,.45)}
.dock-card.cooling{opacity:.55}
.dc-top{display:flex;align-items:center;gap:14px}
.dc-tt{font-family:'Fredoka';font-size:25px;color:#fef08a;line-height:1.2}
.dc-role{font-size:24px;color:#a7f3d0;line-height:1.3;min-height:56px}
.dc-btn{width:100%;height:54px;font-size:25px}
.dc-quota{font-size:24px;color:#7fd4e8;font-family:'Fredoka';display:flex;align-items:center;gap:8px}
.mini-cd{height:10px;background:#0a2b22;border-radius:999px;overflow:hidden}
.mini-cd i{display:block;height:100%;background:#f5a30b;border-radius:999px}
.dock-card.finish .dc-btn{animation:breathe 1.4s infinite}
.boost-badge{background:#f5a30b;color:#3a2c07;font-family:'Fredoka';font-size:24px;padding:4px 14px;border-radius:999px;border:none;white-space:nowrap;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.vote-bar{display:flex;gap:24px;justify-content:center;margin-top:14px}
.vote-card{flex:1;max-width:440px;border-radius:24px;padding:26px;color:#fff;cursor:pointer;border:none;display:flex;flex-direction:column;gap:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .1s}
.vote-card:active{transform:scale(.96)}
.vote-hijau{background:#0e7a5a}.vote-kuning{background:#b98207}.vote-merah{background:#b03a3a}
.vote-card h3{font-size:28px}.vote-card p{font-size:25px;line-height:1.4;opacity:.95}
.kgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:14px}
.kcard{background:rgba(4,50,38,.94);border:none;border-radius:20px;padding:18px 24px;cursor:pointer;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.35);transition:transform .1s,box-shadow .1s}
.kcard:hover{box-shadow:0 0 0 3px #f5a30b,0 8px 22px rgba(0,0,0,.45);transform:translateY(-2px)}
.kcard h3{font-size:26px;color:#fef08a}
.kcard p{font-size:24px;color:#a7f3d0;margin-top:6px;line-height:1.45}
.kdetail{font-size:26px;line-height:1.55;color:#eafff3;background:rgba(2,44,34,.75);border-radius:16px;padding:16px 24px;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.ktab{font-family:'Fredoka';font-size:25px;padding:10px 28px;border-radius:999px;background:#022c22;color:#9fd8c3;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.ktab.on{background:#064e3b;box-shadow:0 0 0 3px #f5a30b,0 6px 16px rgba(0,0,0,.35);color:#fef08a}
.paper{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1520px;background:#fdf6e3;border-radius:26px;border:none;box-shadow:0 24px 60px rgba(0,0,0,.5);padding:46px 66px;color:#2c3e34}
.paper h2{color:#0a5c44;font-size:44px}
.paper .qm{font-family:'Fredoka';color:#b45309;font-size:25px;margin-top:4px}
.qtext{font-size:33px;font-weight:900;line-height:1.45;margin:24px 0 28px;color:#1d3530}
.opt{width:100%;text-align:left;background:#fff;border:none;border-radius:20px;padding:22px 28px;margin-bottom:16px;font-size:27px;font-weight:800;color:#2c3e34;cursor:pointer;display:flex;gap:20px;align-items:center;font-family:'Nunito';box-shadow:0 6px 16px rgba(0,0,0,.2);transition:transform .1s,box-shadow .1s}
.opt:hover{box-shadow:0 0 0 3px #f5a30b,0 8px 22px rgba(0,0,0,.3)}
.opt.off{pointer-events:none;opacity:.55}
.opt .lt{flex:none;width:52px;height:52px;border-radius:50%;background:#0a5c44;color:#fef08a;display:flex;align-items:center;justify-content:center;font-family:'Fredoka';font-size:28px}
.opt.right{background:#dcf5e5;box-shadow:0 0 0 3px #12945f,0 8px 22px rgba(0,0,0,.3)}
.opt.right .lt{background:#12945f;color:#fff}
.opt.wrong{background:#f9dede;box-shadow:0 0 0 3px #c0392b,0 8px 22px rgba(0,0,0,.3);animation:shake .4s}
@keyframes shake{25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
.qfeed{display:none;background:#eef7ee;border:none;border-radius:20px;padding:24px 30px;margin-top:10px;box-shadow:0 8px 22px rgba(0,0,0,.2)}
.qfeed.show{display:block}
.qfeed h3{color:#0a5c44;font-size:29px}
.qfeed p{font-size:25px;line-height:1.5;margin-top:8px;color:#2c3e34}
.chain-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:16px}
.chain-pill{background:#0a5c44;color:#fef08a;font-family:'Fredoka';font-size:24px;padding:8px 20px;border-radius:999px;border:none;box-shadow:0 3px 8px rgba(0,0,0,.25)}
.chain-ar{color:#b45309;font-size:28px;font-weight:900}
.vwrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:28px;z-index:5}
.vcard{width:1240px;text-align:center;padding:46px 66px}
.vcard h1{font-size:60px;color:#fef08a}
.vcard .vsub{font-size:28px;color:#cfe9dd;margin-top:10px;font-family:'Fredoka'}
.vstars{display:flex;justify-content:center;gap:26px;margin:30px 0 8px;font-size:92px;line-height:1}
.vstars span{color:rgba(255,255,255,.18);opacity:0;transform:scale(.3);transition:all .45s cubic-bezier(.2,2,.4,1)}
.vstars span.on{color:#f5a30b;opacity:1;transform:scale(1)}
.vunlock{background:#3a2c07;border:none;color:#fef08a;border-radius:999px;display:inline-block;font-family:'Fredoka';font-size:25px;padding:12px 36px;margin-top:16px;box-shadow:0 4px 14px rgba(245,163,11,.35)}
.vrelay{font-size:26px;color:#eafff3;line-height:1.5;margin-top:16px}
.vbtns{display:flex;gap:26px;justify-content:center;margin-top:30px}
.tut-slide{width:1500px;text-align:center;padding:44px 66px}
.tut-slide h2{color:#fef08a;font-size:42px}
.tut-slide p{font-size:27px;line-height:1.6;color:#eafff3;margin-top:16px}
.tut-nav{display:flex;gap:24px;justify-content:center;margin-top:28px}
.tdots{display:flex;gap:14px;justify-content:center;margin-top:22px}
.tdots i{width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.25)}
.tdots i.on{background:#fef08a}
.bigchain{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:24px;flex-wrap:wrap}
.bigchain .cp{background:rgba(2,44,34,.95);border:none;color:#fff;border-radius:18px;padding:12px 24px;font-family:'Fredoka';font-size:25px;box-shadow:0 4px 12px rgba(0,0,0,.3)}
.bigchain .ca{color:#f5a30b;font-size:34px;font-weight:900}
</style>"""

def main():
    if not os.path.exists(TARGET_FILE):
        print(f"File not found: {TARGET_FILE}")
        sys.exit(1)

    with open(TARGET_FILE, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # 1. Replace <style>...</style> block
    style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
    if not style_pattern.search(content):
        print("ERROR: <style> block not found")
        sys.exit(1)
    content = style_pattern.sub(NEW_STYLE, content, count=1)
    print("1. Style block updated with Tonal Glassmorphism and font >= 24px")

    # 2. Update renderTeam inline font-size
    old_team_span = '<span class="sm" style="font-size:20px;opacity:.8">'
    new_team_span = '<span class="sm" style="font-size:24px;opacity:.85">'
    if old_team_span in content:
        content = content.replace(old_team_span, new_team_span)
        print("2. renderTeam inline role font updated to 24px")
    else:
        print("WARNING: renderTeam inline font span not found")

    # 3. Update buildHUD dock-card structure
    old_dock_card_tpl = """  m.actions.forEach((a,i)=>{const per=SIM.team.perk.ids.includes(a.id);
   const d=document.createElement('div');d.className='dock-card';
   d.innerHTML='<div class="dc-top">'+ic(a.ic,32)+'<div><div class="dc-tt">'+a.label+'</div><div class="dc-role">'+a.role+'</div></div>'
    +(per?'<div class="boost-badge">Keahlian Tim</div>':'')+'</div>'
    +'<button class="btn dc-btn" data-i="'+i+'">Lakukan!</button>'
    +'<div class="dc-quota">'+ic('target',18)+' Sisa: <span class="q-n"></span></div>'
    +'<div class="mini-cd"><i></i></div>';"""

    new_dock_card_tpl = """  m.actions.forEach((a,i)=>{const per=SIM.team.perk.ids.includes(a.id);
   const d=document.createElement('div');d.className='dock-card';
   d.innerHTML='<div class="dc-top">'+ic(a.ic,36)+'<div style="flex:1;min-width:0"><div class="dc-tt">'+a.label+'</div>'
    +(per?'<span class="boost-badge" style="display:inline-block;margin-top:4px">Keahlian Tim</span>':'')+'</div></div>'
    +'<div class="dc-role">'+a.role+'</div>'
    +'<button class="btn dc-btn" data-i="'+i+'">Lakukan!</button>'
    +'<div class="dc-quota">'+ic('target',24)+' Sisa: <span class="q-n"></span></div>'
    +'<div class="mini-cd"><i></i></div>';"""

    # Also normalize whitespace for replacement
    if old_dock_card_tpl in content:
        content = content.replace(old_dock_card_tpl, new_dock_card_tpl)
        print("3. buildHUD dock-card template updated to adaptive vertical layout")
    else:
        # Try regex replacement if exact string has CRLF difference
        dock_pattern = re.compile(
            r"m\.actions\.forEach\(\(a,i\)=>\{const per=SIM\.team\.perk\.ids\.includes\(a\.id\);\s*"
            r"const d=document\.createElement\('div'\);d\.className='dock-card';\s*"
            r"d\.innerHTML='<div class=\"dc-top\">'\+ic\(a\.ic,32\)\+'<div><div class=\"dc-tt\">'\+a\.label\+'</div><div class=\"dc-role\">'\+a\.role\+'</div></div>'\s*"
            r"\+\(per\?'<div class=\"boost-badge\">Keahlian Tim</div>':''\)\+'</div>'\s*"
            r"\+'<button class=\"btn dc-btn\" data-i=\"'\+i\+'\">Lakukan!</button>'\s*"
            r"\+'<div class=\"dc-quota\">'\+ic\('target',18\)\+' Sisa: <span class=\"q-n\"></span></div>'\s*"
            r"\+'<div class=\"mini-cd\"><i></i></div>';",
            re.DOTALL
        )
        if dock_pattern.search(content):
            content = dock_pattern.sub(new_dock_card_tpl, content, count=1)
            print("3. buildHUD dock-card template updated via regex")
        else:
            print("WARNING: dock-card template pattern not matched")

    # 4. Remove FPS meter & repetitive logs
    fps_decl_pattern = re.compile(
        r'/\* FPS METER SEMENTARA.*?FPSM\.acc=0;FPSM\.n=0;\}\}',
        re.DOTALL
    )
    if fps_decl_pattern.search(content):
        content = fps_decl_pattern.sub('/* FPS Meter dibersihkan untuk Clean Release IFP */', content)
        print("4a. FPS meter declaration & functions removed")
    else:
        print("WARNING: FPS meter declaration not found")

    content = content.replace('loopN++;fpsTick(t);', 'loopN++;')
    content = content.replace("go('title');fpsInit();requestAnimationFrame(loop);", "go('title');requestAnimationFrame(loop);")
    print("4b. fpsTick and fpsInit calls removed from loop/init")

    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print("SUCCESS: index.html has been updated cleanly!")

if __name__ == "__main__":
    main()
