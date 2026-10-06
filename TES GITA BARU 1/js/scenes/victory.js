/* ============================================================
   ECO-EXPLORER — js/scenes/victory.js
   Layar Selebrasi Prestasi & 3 Bintang
   ============================================================ */

/* ================= KEMENANGAN ================= */
function startVictory(m,stars,days){
 const first=(G.stars[m.id]||0)===0;
 G.stars[m.id]=Math.max(G.stars[m.id]||0,stars);saveG();
 const idx=MISSIONS.indexOf(m),next=MISSIONS[idx+1],all=totStars()===48;
 el('#victory-ui').innerHTML='<div class="vcard panel">'
 +'<h1 style="font-size:38px">'+(all?'Penjaga Keseimbangan Nusantara!':'Misi Berhasil!')+'</h1>'
 +'<div class="vsub">'+m.title+' • selesai dalam '+days+' hari • '+(first?'misi baru ditaklukkan':'bintang terbaikmu disimpan')+'</div>'
 +'<div class="vstars" id="vstars"><span>★</span><span>★</span><span>★</span></div>'
 +'<div class="vrelay">Rantai sebab-akibat yang telah kamu pulihkan:<br><b>'+m.chain.join(' → ')+'</b></div>'
 +(next?'<div class="vunlock">Misi baru terbuka: '+next.title+'</div>'
   :'<div class="vunlock">Semua 16 misi selesai! Total bintang: '+totStars()+'/48</div>')
 +'<div class="vbtns"><button class="btn btn-secondary" id="v-menu">Peta Misi</button>'
 +(next?'<button class="btn btn-gold" id="v-next">Misi Berikutnya</button>':'')+'</div></div>';
 go('victory');confettiBurst();if(typeof playVO === 'function') playVO(all ? 'vo_victory_all' : 'vo_victory_cheer');
 el('#vstars').querySelectorAll('span').forEach((s,i)=>{if(i<stars)setTimeout(()=>{s.classList.add('on');sfx.star();},650+i*480);});
 el('#v-menu').onclick=()=>{sfx.click();buildMissionMenu(m.biome);go('mission');};
 const nx=el('#v-next');if(nx)nx.onclick=()=>{sfx.click();openMission(next);};}

/* ================= KAMUS ================= */
