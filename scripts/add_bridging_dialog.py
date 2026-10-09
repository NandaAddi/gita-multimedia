import os
import re
import sys

TARGET_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "TES GITA BARU 1", "index.html"))

BRIDGE_CSS = """
/* BRIDGING CHARACTER DIALOGUE BOX (IFP ULTRA-LARGE & TONAL) */
.bridge-wrap{
  position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;
  padding-bottom:34px;z-index:45;background:rgba(1,18,14,.55);backdrop-filter:blur(3px);
  animation:fadeIn .25s ease;
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.bridge-panel{
  position:relative;width:1580px;min-height:280px;border-radius:32px;
  background:linear-gradient(180deg, rgba(6,56,44,.98) 0%, rgba(2,34,26,.99) 100%);
  box-shadow:0 30px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(254,240,138,.25), inset 0 1px 0 rgba(255,255,255,.12);
  padding:28px 40px;display:flex;gap:36px;align-items:center;
}
.bridge-char{flex:none;display:flex;flex-direction:column;align-items:center;width:180px}
.bridge-avatar{
  width:140px;height:140px;border-radius:50%;
  background:radial-gradient(circle,rgba(254,240,138,.28) 0%,rgba(0,0,0,.25) 70%);
  display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.4);
}
.bridge-nameplate{
  margin-top:12px;background:#f5a30b;color:#3a2c07;font-family:'Fredoka';font-size:24px;
  font-weight:700;padding:6px 18px;border-radius:999px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.3);
  white-space:nowrap;letter-spacing:.5px;
}
.bridge-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.bridge-step-pill{
  display:inline-block;align-self:flex-start;background:rgba(245,163,11,.18);color:#fef08a;
  border-radius:999px;font-family:'Fredoka';font-size:24px;padding:4px 22px;box-shadow:0 2px 8px rgba(0,0,0,.25);
}
.bridge-title{font-family:'Fredoka';font-size:32px;color:#fef08a;letter-spacing:.5px;line-height:1.2}
.bridge-text{font-size:27px;line-height:1.55;color:#eafff3}
.bridge-text b{color:#fef08a}
.bridge-team-shout{font-size:25px;line-height:1.45;color:#7fd4e8;font-family:'Fredoka';margin-top:4px}
.bridge-right{flex:none;display:flex;flex-direction:column;align-items:center;gap:14px;width:300px}
.bridge-team-badge{
  width:100%;background:rgba(3,46,36,.9);border-radius:20px;padding:14px 16px;
  display:flex;flex-direction:column;align-items:center;gap:6px;box-shadow:0 6px 16px rgba(0,0,0,.3);
}
.bridge-team-name{font-family:'Fredoka';font-size:25px;color:#fef08a;line-height:1.1}
.bridge-team-role{font-size:24px;color:#a7f3d0;line-height:1.2;text-align:center}
.bridge-actions{display:flex;flex-direction:column;gap:10px;width:100%}
.bridge-actions .btn{width:100%;min-height:58px;font-size:26px;padding:12px 20px}
"""

BRIDGE_HTML = """    <div id="sim-bridge" class="bridge-wrap" style="display:none">
      <div class="bridge-panel">
        <div class="bridge-char">
          <div class="bridge-avatar" id="bridge-gita-box"></div>
          <div class="bridge-nameplate">GITA &bull; Detektif Alam</div>
        </div>
        <div class="bridge-body">
          <div class="bridge-step-pill" id="bridge-step-pill">Petunjuk Awal Misi &bull; Langkah 1 dari 2</div>
          <h3 class="bridge-title" id="bridge-title"></h3>
          <p class="bridge-text" id="bridge-text"></p>
          <div class="bridge-team-shout" id="bridge-team-shout"></div>
        </div>
        <div class="bridge-right">
          <div class="bridge-team-badge">
            <canvas id="bridge-mascot-cv" width="110" height="110"></canvas>
            <div class="bridge-team-name" id="bridge-team-name"></div>
            <div class="bridge-team-role" id="bridge-team-role"></div>
          </div>
          <div class="bridge-actions">
            <button class="btn btn-gold" id="bridge-btn-next">Lanjut &gt;</button>
            <button class="btn btn-secondary" id="bridge-btn-skip">Lewati</button>
          </div>
        </div>
      </div>
    </div>
"""

BRIDGE_DATA_JS = """
/* ================= BRIDGING DATA 8 MISI ================= */
const BRIDGE_DATA = {
  'sawah-1': {
    step1: {
      title: 'Krisis Air: Tanah Retak & Padi Layu',
      text: 'Waduh teman-teman! Musim kemarau panjang membuat saluran irigasi kering kerontang. Tanah sawah retak-retak dan tunas padi mulai layu kehausan!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Rencana Pemulihan Ekosistem Sawah',
      text: 'Langkah pertama kita: segera tekan kartu <b>Alirkan Air Irigasi</b> di bawah agar tanah sawah gembur kembali dan siap ditanami bibit padi baru!',
      gitaExpr: 'talk'
    }
  },
  'sawah-2': {
    step1: {
      title: 'Krisis Kimia: Racun Berlebih & Ular Diburu',
      text: 'Gawat sekali! Petani menyemprot racun kimia berlebihan dan memburu ular sawah. Sekarang racun menumpuk dan hama tikus meledak merajalela!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Strategi Pembersihan & Pemulihan',
      text: 'Ingat urutan rantai makanan: segera tekan <b>Bersihkan Racun</b> terlebih dahulu! Jika racun sudah hilang, barulah kita aman melepas pemangsa alami.',
      gitaExpr: 'talk'
    }
  },
  'hutan-1': {
    step1: {
      title: 'Krisis Rimba: Mata Air Kering & Pakan Layu',
      text: 'Hutan rimba kita terancam! Kemarau panjang membuat mata air rimba mengering. Rumput pakan rusa layu dan pohon-pohon mulai meranggas!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Alirkan Air & Hijaukan Kembali',
      text: 'Langkah pertama kita: segera tekan kartu <b>Alirkan Mata Air</b> di bawah agar tanah rimba kembali lembap dan pohon peneduh terselamatkan!',
      gitaExpr: 'talk'
    }
  },
  'hutan-2': {
    step1: {
      title: 'Bahaya Perburuan: Jerat Liar & Pembalakan',
      text: 'Ada pembalakan liar di hutan ini! Pohon ditebangi dan pemburu memasang jerat maut yang melukai Harimau Sumatera dan satwa langka kita.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Amankan Satwa & Tanam Kembali',
      text: 'Langkah darurat: segera tekan kartu <b>Sita Jerat Liar</b> untuk menyelamatkan satwa dari jerat pemburu, baru kemudian reboisasi pohon!',
      gitaExpr: 'talk'
    }
  },
  'sungai-1': {
    step1: {
      title: 'Permukaan Tertutup: Eceng Gondok Liar',
      text: 'Aliran sungai surut dan eceng gondok tumbuh terlalu lebat menutupi permukaan air. Sinar matahari terhalang dan ikan lemas kehabisan oksigen!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Buka Aliran & Bersihkan Gulma',
      text: 'Langkah pertama kita: segera tekan <b>Buka Pintu Air Hulu</b> atau <b>Angkat Gulma Liar</b> agar sinar matahari dan oksigen masuk kembali ke air sungai!',
      gitaExpr: 'talk'
    }
  },
  'sungai-2': {
    step1: {
      title: 'Pencemaran Berat: Limbah Pabrik & Plastik',
      text: 'Pabrik membuang limbah kimia berbahaya dan sampah plastik ke sungai! Air berbusa racun, ikan-ikan keracunan, dan bangau kehilangan mangsa sehat.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Hentikan Sumber Racun',
      text: 'Langkah penyelamatan: segera tekan kartu <b>Saring Limbah Pabrik</b> agar racun detergen berhenti mengalir sebelum meracuni seluruh rantai makanan!',
      gitaExpr: 'talk'
    }
  },
  'laut-1': {
    step1: {
      title: 'Pemanasan Laut: Pemutihan Terumbu Karang',
      text: 'Suhu air laut memanas ekstrem! Terumbu karang mengalami pemutihan (bleaching) massal dan ikan-ikan karang kehilangan rumah tempat berlindung.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Dinginkan & Lindungi Karang',
      text: 'Langkah pertama kita: segera pasang <b>Naungi Karang</b> untuk mendinginkan terumbu karang dari sengatan panas, lalu lakukan transplantasi karang baru!',
      gitaExpr: 'talk'
    }
  },
  'laut-2': {
    step1: {
      title: 'Kejahatan Laut: Bom Ikan & Sampah Plastik',
      text: 'Nelayan nakal meledakkan bom ikan dan sampah plastik berserakan di laut! Karang hancur berkeping-keping dan penyu terlilit sampah.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Tindak Tegas & Bersihkan Samudra',
      text: 'Langkah pertama: segera tekan kartu <b>Patroli & Hentikan Bom</b> untuk mengamankan wilayah laut, lalu angkut sampah plastik agar penyu selamat!',
      gitaExpr: 'talk'
    }
  }
};

let bridgeStep = 1;
function showBridgeDialog(m, team){
  bridgeStep = 1;
  const bdata = BRIDGE_DATA[m.id] || {
    step1: { title: m.title, text: m.story, gitaExpr: 'worried' },
    step2: { title: 'Rencana Aksi: '+m.headline, text: 'Langkah pertama: '+m.task, gitaExpr: 'talk' }
  };
  
  const box = el('#sim-bridge');
  if(!box) return;
  box.style.display = 'flex';
  
  function renderBridgeStep(){
    const cur = bridgeStep === 1 ? bdata.step1 : bdata.step2;
    el('#bridge-gita-box').innerHTML = gitaSVG(130, cur.gitaExpr || (bridgeStep === 1 ? 'worried' : 'talk'));
    el('#bridge-step-pill').innerHTML = 'Petunjuk Awal Misi &bull; Langkah ' + bridgeStep + ' dari 2';
    el('#bridge-title').textContent = cur.title;
    el('#bridge-text').innerHTML = cur.text;
    
    // Team shoutout on step 2
    if(bridgeStep === 2 && team){
      el('#bridge-team-shout').innerHTML = 'Tim andalan kita: <b style="color:#fef08a">' + team.name + '</b> (' + team.role + ') dengan keahlian <b>' + team.perk.label + '</b> siap beraksi!';
    } else {
      el('#bridge-team-shout').innerHTML = '';
    }
    
    // Team mascot canvas
    const cv = el('#bridge-mascot-cv');
    if(cv && team && MASC[team.mascot]){
      const c = cv.getContext('2d');
      c.clearRect(0,0,110,110);
      c.save();
      c.translate(55, 60);
      c.scale(0.35, 0.35);
      MASC[team.mascot](c);
      c.restore();
    }
    el('#bridge-team-name').textContent = team ? team.name : '';
    el('#bridge-team-role').textContent = team ? team.role : '';
    
    const btnNext = el('#bridge-btn-next');
    if(bridgeStep === 1){
      btnNext.innerHTML = 'Lanjut ' + ic('arrowR', 24);
      btnNext.className = 'btn btn-gold';
    } else {
      btnNext.innerHTML = ic('check', 26) + ' Ayo Pulihkan!';
      btnNext.className = 'btn btn-gold';
    }
    
    // Audio: chime + speak
    sfx.chime();
    speak(cur.title + '. ' + cur.text.replace(/<[^>]*>/g, ''));
  }

  el('#bridge-btn-next').onclick = () => {
    sfx.click();
    if(bridgeStep === 1){
      bridgeStep = 2;
      renderBridgeStep();
    } else {
      closeBridgeDialog();
    }
  };

  el('#bridge-btn-skip').onclick = () => {
    sfx.click();
    closeBridgeDialog();
  };

  renderBridgeStep();
}

function closeBridgeDialog(){
  const box = el('#sim-bridge');
  if(box) box.style.display = 'none';
  if(SIM){
    SIM.paused = false;
    SIM.bridging = false;
    if(SIM.timer) clearInterval(SIM.timer);
    SIM.timer = setInterval(simTick, 1500);
    sfx.success();
    toast('Hari 1 dimulai! Pilih kartu aksi pertamamu di bawah.');
  }
}
"""

NEW_START_SIM = """function startSim(m){
 if(SIM&&SIM.timer)clearInterval(SIM.timer);
 const team=TEAMS.find(t=>t.id===G.team)||TEAMS[0];
 SIM={m,team,S:Object.assign({day:0},m.init),tgt:m.targets.map(()=>false),
  quota:m.actions.map(a=>a.quota+(team.perk.ids.includes(a.id)?1:0)),
  cdi:m.actions.map(a=>team.perk.ids.includes(a.id)?2:3),
  cool:m.actions.map(()=>0),paused:true,mp:0,done:false,voted:0,voteAt:[12,24,36],limit:m.par+18,
  ui:{left:true,right:true,leftDot:false},bridging:true};
 SIM.S.health=m.health(SIM.S);
 buildSimUI();go('sim');updateHUD();
 showBridgeDialog(m,team);}"""

def main():
    if not os.path.exists(TARGET_FILE):
        print(f"Target file not found: {TARGET_FILE}")
        sys.exit(1)

    with open(TARGET_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add CSS before </style>
    if "/* BRIDGING CHARACTER DIALOGUE BOX" not in content:
        content = content.replace("</style>", BRIDGE_CSS + "\n</style>", 1)
        print("1. Bridge CSS added.")
    else:
        print("1. Bridge CSS already present.")

    # 2. Add HTML inside <section class="screen" id="scr-sim">
    if '<div id="sim-bridge"' not in content:
        target_sim_ui = '<div class="ui" id="sim-ui"></div>'
        if target_sim_ui in content:
            content = content.replace(target_sim_ui, target_sim_ui + "\n" + BRIDGE_HTML, 1)
            print("2. Bridge HTML added into scr-sim.")
        else:
            print("ERROR: <div class=\"ui\" id=\"sim-ui\"></div> not found")
            sys.exit(1)
    else:
        print("2. Bridge HTML already present.")

    # 3. Add BRIDGE_DATA_JS before function startSim
    if "const BRIDGE_DATA = {" not in content:
        sim_header = "/* ================= SIMULASI ================= */"
        if sim_header in content:
            content = content.replace(sim_header, sim_header + "\n" + BRIDGE_DATA_JS, 1)
            print("3. BRIDGE_DATA and bridge functions added.")
        else:
            print("ERROR: /* ================= SIMULASI ================= */ not found")
            sys.exit(1)
    else:
        print("3. BRIDGE_DATA already present.")

    # 4. Replace startSim function
    # Match function startSim(m){ ... SIM.timer=setInterval(simTick,1500);}
    start_sim_pattern = re.compile(r'function startSim\(m\)\{.*?SIM\.timer=setInterval\(simTick,1500\);\}', re.DOTALL)
    if start_sim_pattern.search(content):
        content = start_sim_pattern.sub(NEW_START_SIM, content, count=1)
        print("4. startSim updated to pause timer and showBridgeDialog.")
    else:
        # Check if already updated
        if "showBridgeDialog(m,team);" in content:
            print("4. startSim already updated.")
        else:
            print("WARNING: startSim pattern not matched cleanly.")

    # 5. Add URL param query support for testing sim screen directly
    test_param_old = "else if(p==='biome'){buildBiome();go('biome');}"
    test_param_new = "else if(p==='biome'){buildBiome();go('biome');}\n else if(p==='sim'){\n  const misId=new URLSearchParams(location.search).get('mission')||'sawah-1';\n  const targetMis=MISSIONS.find(m=>m.id===misId)||MISSIONS[0];\n  startSim(targetMis);\n }"
    if test_param_old in content and "else if(p==='sim')" not in content:
        content = content.replace(test_param_old, test_param_new, 1)
        print("5. URL test parameter for sim added.")

    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print("BRIDGING DIALOG IMPLEMENTATION COMPLETE.")

if __name__ == "__main__":
    main()
