/* ============================================================
   ECO-EXPLORER — js/scenes/quiz.js
   Buku Catatan Detektif (Kuis C2 Data-Driven)
   ============================================================ */

let QUIZ = null;

/* ================= KUIS ================= */
function startQuiz(m,simStars,days){QUIZ={m,simStars,days,ok:false,answered:false};
 el('#scr-quiz').innerHTML='<div class="ui"><div class="paper">'
 +'<h2>'+m.title+'</h2><div class="qm">Kuis akhir misi — jawab benar untuk +1 bintang!</div>'
 +'<div class="qtext">'+m.quiz.q+'</div>'
 +'<div id="q-opts">'+m.quiz.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="lt">'+'ABC'[i]+'</span>'+o+'</button>').join('')+'</div>'
 +'<div class="qfeed" id="q-feed"><h3 id="q-fh"></h3><p id="q-fp"></p>'
 +'<div class="chain-row">'+m.chain.map(x=>'<span class="chain-pill">'+x+'</span>').join('<span class="chain-ar">→</span>')+'</div></div>'
 +'<div class="mrow" id="q-next" style="display:none"><button class="btn btn-gold" id="q-go" style="font-size:27px;padding:18px 46px">Lihat Hasil!</button></div>'
 +'</div></div>';
 go('quiz');sfx.chime();speak(m.quiz.q);
 els('#q-opts .opt').forEach(o=>o.onclick=()=>{
  if(QUIZ.answered)return;QUIZ.answered=true;const i=+o.dataset.i,ok=i===m.quiz.correct;QUIZ.ok=ok;
  els('#q-opts .opt').forEach(x=>x.classList.add('off'));
  if(ok){o.classList.add('right');sfx.success();}
  else{o.classList.add('wrong');sfx.wrong();setTimeout(()=>{els('#q-opts .opt')[m.quiz.correct].classList.add('right');sfx.chime();},450);}
  el('#q-fh').textContent=ok?'Benar sekali, Detektif!':'Belum tepat, tapi sekarang kamu tahu!';
  el('#q-fp').textContent=m.quiz.explain;
  el('#q-feed').classList.add('show');
  setTimeout(()=>{el('#q-next').style.display='flex';},700);});
 el('#q-go').onclick=()=>{sfx.click();
  startVictory(m,Math.min(3,QUIZ.simStars+(QUIZ.ok?1:0)),QUIZ.days);};}

