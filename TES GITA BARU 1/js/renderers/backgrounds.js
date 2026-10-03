/* ============================================================
   ECO-EXPLORER — js/renderers/backgrounds.js
   Background Scenes 60 FPS (Sawah, Hutan, Sungai, Laut) & Konfeti
   ============================================================ */

function skyPaint(c,top,bot,hor){c.fillStyle=LG(c,0,0,0,hor,top,bot);c.fillRect(0,0,1920,hor);}
function sunDraw(c,x,y,t){CIRC(c,x,y,50,'#ffd76e');c.strokeStyle='rgba(255,215,110,.55)';c.lineWidth=6;
 for(let i=0;i<10;i++){const a=t/2400+i*Math.PI/5;c.beginPath();c.moveTo(x+Math.cos(a)*64,y+Math.sin(a)*64);c.lineTo(x+Math.cos(a)*(82+Math.sin(t/300+i)*7),y+Math.sin(a)*(82+Math.sin(t/300+i)*7));c.stroke();}}
function cloud(c,x,y,s){O(c,x,y,42*s,20*s,'rgba(255,255,255,.85)');O(c,x+34*s,y+6*s,30*s,15*s,'rgba(255,255,255,.85)');O(c,x-32*s,y+8*s,26*s,13*s,'rgba(255,255,255,.85)');}
function cloudsDraw(c,t){const off=(t/90)%2400-300;cloud(c,off,120,1.1);cloud(c,(off+900)%2400-300,210,.8);cloud(c,(off+1700)%2400-300,150,.95);}


function sceneSawah(c,t,S){
 c.fillStyle='#6a9e6e';c.fillRect(0,0,1920,1080);
 skyPaint(c,'#aee3f5','#eaf7df',360);sunDraw(c,1620,120,t);cloudsDraw(c,t);
 texRidge(c,[[0,360],[300,240],[640,360]],'#96b98d',11);
 texRidge(c,[[420,360],[820,200],[1240,360]],'#7fae7c',23);
 texRidge(c,[[200,360],[560,280],[980,360],[1500,300],[1920,360]],'#6a9e6e',37);
 c.fillStyle='rgba(255,255,255,.10)';c.fillRect(0,220,1920,150);
 F(c,[[0,1080],[380,420],[1560,420],[1920,1080]],mixc('#c9a86a','#4f9ab8',c01(S.water/75)));
 c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=5;
 for(let i=0;i<4;i++){c.beginPath();c.moveTo(300+i*40,540+i*130);c.quadraticCurveTo(960,580+i*130,1620-i*40,540+i*130);c.stroke();}
 texField(c,t);
 if(S.water<32){c.strokeStyle='rgba(70,50,30,.5)';c.lineWidth=3;
  for(let i=0;i<8;i++){const bx=180+((i*331)%1560),by=540+((i*197)%380);
   c.beginPath();c.moveTo(bx,by);c.lineTo(bx+40,by+16);c.lineTo(bx+70,by+8);c.lineTo(bx+110,by+26);c.stroke();}}
 const rows=[[540,1],[690,.82],[860,.62],[1050,.46]];
 rows.forEach((r,ri)=>{const n=Math.max(0,Math.round(S.prod/6));
  for(let i=0;i<n;i++){const x=120+(i+.5)*(1680/n)+(ri%2)*34;
   spRice(c,x,r[0],46*r[1]*(.8+pr(ri*40+i)*.4),'#3f9a4e',Math.sin(t/600+i)*2);}});
 const nm=Math.min(6,Math.round(S.herb/6));
 for(let i=0;i<nm;i++){const sp=pr(i*7+1)*.06+.04,x=((t*sp*10+i*430)%2200)-140;spMouse(c,x,470+pr(i*3)*420);}
 const ns=Math.min(4,Math.round(S.pred/2.2));
 for(let i=0;i<ns;i++)spSnake(c,300+pr(i*11)*1300,650+pr(i*5)*250,t);
 const nf=Math.min(4,Math.round(S.pred/2));
 for(let i=0;i<nf;i++)spFrog(c,220+pr(i*13)*1500,880+pr(i*17)*120,t);
 for(let i=0;i<3;i++)butterfly(c,300+pr(i*23)*1300+Math.sin(t/700+i*2)*60,320+pr(i*29)*160+Math.cos(t/900+i)*40,t);
 if(S.poison>15){c.fillStyle='rgba(96,60,130,'+(c01(S.poison/150)*.5).toFixed(3)+')';c.fillRect(0,360,1920,720);}}
function sceneHutan(c,t,S){
 c.fillStyle='#5e8f63';c.fillRect(0,0,1920,1080);
 skyPaint(c,'#aee3f5','#e8f4d8',380);sunDraw(c,300,130,t);cloudsDraw(c,t);
 texRidge(c,[[0,380],[340,250],[720,380]],'#8fb996',51);
 texRidge(c,[[520,380],[960,210],[1400,380]],'#79a87f',63);
 texRidge(c,[[0,380],[500,300],[1000,380],[1500,310],[1920,380]],'#5e8f63',77);
 c.fillStyle='rgba(255,255,255,.10)';c.fillRect(0,230,1920,150);
 F(c,[[0,1080],[300,470],[1650,470],[1920,1080]],'#4c7a50');
 const nB=Math.max(0,Math.round(S.prod/3));
 for(let i=0;i<nB;i++){const x=80+(i+.5)*(1760/nB);treeDraw(c,x,470+pr(i)*60,60+pr(i*3)*30,'#2e6b3a');}
 const nF=Math.max(0,Math.round(S.prod/5));
 for(let i=0;i<nF;i++){const x=140+(i+.5)*(1680/nF);treeDraw(c,x,640+pr(i*7)*260,110+pr(i*5)*60,'#3f8a4a');}
 const nd=Math.min(4,Math.round(S.herb/7));
 for(let i=0;i<nd;i++)spDeer(c,380+pr(i*19)*1200+Math.sin(t/1300+i*2)*60,760+pr(i*23)*180,t);
 const nt=S.pred>=6?2:S.pred>=3?1:0;
 for(let i=0;i<nt;i++)spTiger(c,700+i*600+Math.sin(t/2000+i*3)*40,800+pr(i*31)*100,t);
 if(S.trap>15){const nx=Math.min(6,Math.round(S.trap/12));c.strokeStyle='#c0392b';c.lineWidth=5;c.lineCap='round';
  for(let i=0;i<nx;i++){const x=180+((i*397)%1560),y=560+((i*211)%380);
   c.beginPath();c.moveTo(x-16,y-12);c.lineTo(x+16,y+12);c.moveTo(x+16,y-12);c.lineTo(x-16,y+12);c.stroke();}}
 if(S.trap>15){c.fillStyle='rgba(30,26,18,'+(c01(S.trap/160)*.45).toFixed(3)+')';c.fillRect(0,0,1920,1080);}}
function sceneSungai(c,t,S){
 skyPaint(c,'#b8e6f0','#eef8e2',340);sunDraw(c,1500,110,t);cloudsDraw(c,t);
 texRidge(c,[[0,340],[500,240],[1100,340],[1700,260],[1920,340]],'#6f9e68',91);
 c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,200,1920,120);
 c.fillStyle='#5d9455';c.fillRect(0,340,1920,130);
 c.fillStyle='#4c7a50';c.fillRect(0,810,1920,270);
 c.fillStyle=mixc('#3f8f7a','#79c6b0',c01(S.water/80));c.fillRect(0,470,1920,340);
 c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=4;c.setLineDash([46,34]);c.lineDashOffset=-t/12;
 for(let i=0;i<5;i++){c.beginPath();c.moveTo(0,515+i*62);c.lineTo(1920,515+i*62);c.stroke();}
 c.setLineDash([]);
 c.fillStyle='#fff';
 for(let i=0;i<10;i++){const x=(pr(i*13)*1920+t/14*(1+(i%3)*.3))%1920;
  c.globalAlpha=.18+.3*Math.abs(Math.sin(t/500+i*2));
  c.beginPath();c.arc(x,500+pr(i*7)*280,1.5+Math.abs(Math.sin(t/400+i))*2,0,7);c.fill();}
 c.globalAlpha=1;
 const nf=Math.min(7,Math.round(S.herb/4));
 for(let i=0;i<nf;i++){const dir=i%2?1:-1,sp=.05+pr(i)*.05;
  const x=dir>0?((t*sp*10+i*400)%2100)-90:2010-((t*sp*10+i*400)%2100);
  spFish(c,x,530+pr(i*3)*240,t,.8+pr(i)*.5,i%2?'#ffd24a':'#7ac0e8',dir);}
 spStork(c,1450,900,t);if(S.pred>=4)spStork(c,600,920,t);
 if(S.gulma>8){const ng=Math.min(7,Math.round(S.gulma/12));
  for(let i=0;i<ng;i++)gulmaPatch(c,200+pr(i*7)*1500,500+pr(i*3)*280,1+pr(i)*.6,t);}
 if(S.trash>10){const nt=Math.min(6,Math.round(S.trash/12));
  for(let i=0;i<nt;i++)spBag(c,150+pr(i*13)*1600+Math.sin(t/1500+i)*30,490+pr(i*5)*300,t);}
 if(S.poison>15){for(let i=0;i<12;i++){const x=(pr(i*11)*1920+t/20)%1920;
  CIRC(c,x,478+pr(i)*22,4+pr(i*3)*6,'rgba(250,252,255,'+(.4+c01(S.poison/160)*.5).toFixed(2)+')');}}}
function sceneLaut(c,t,S){
 c.fillStyle=mixc('#1f7fae','#66c7dd',c01(S.heat/100));c.fillRect(0,0,1920,1080);
 for(let i=0;i<4;i++){const x=300+i*440+Math.sin(t/2600+i)*60;
  F(c,[[x,0],[x+140,0],[x+320,1080],[x+40,1080]],'rgba(255,255,255,.07)');}
 c.fillStyle='#fff';
 for(let i=0;i<8;i++){const x=(pr(i*17)*1920+t/18)%1920;
  c.globalAlpha=.2+.25*Math.abs(Math.sin(t/450+i));
  c.beginPath();c.arc(x,60+pr(i*5)*200,1.5+Math.abs(Math.sin(t/450+i))*2.2,0,7);c.fill();}
 c.globalAlpha=1;
 F(c,[[0,1080],[0,950],[400,905],[900,940],[1400,900],[1920,945],[1920,1080]],'#c9b98a');
 F(c,[[0,1080],[0,990],[500,955],[1100,985],[1700,950],[1920,980],[1920,1080]],'#b8a678');
 c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=3;
 for(let i=0;i<3;i++){const x=300+i*500+Math.sin(t/2000+i)*40;
  c.beginPath();c.arc(x,880,60+i*25,Math.PI*1.15,Math.PI*1.85);c.stroke();}
 const nc=Math.min(9,Math.max(0,Math.round(S.prod/6))),bl=c01(S.heat/85);
 for(let i=0;i<nc;i++){const x=120+(i+.5)*(1720/nc)+pr(i)*40,y=940+pr(i*3)*60;
  const col=['#e07a5f','#c95f8a','#e8a13a','#8a6ab0'][i%4];
  if(pr(i*7)>.5)spCoral(c,x,y,.9+pr(i)*.5,col,i,bl);else spFan(c,x,y,.9+pr(i)*.5,col,bl);}
 const nf=Math.min(8,Math.round(S.herb/3));
 for(let i=0;i<nf;i++){const dir=i%2?1:-1,sp=.06+pr(i)*.05;
  const x=dir>0?((t*sp*10+i*380)%2100)-90:2010-((t*sp*10+i*380)%2100);
  spFish(c,x,300+pr(i*3)*500,t,.7+pr(i)*.5,['#ffd24a','#7ac0e8','#f2964a'][i%3],dir);}
 if(S.pred>=2)spShark(c,((t*.03*10)%2400)-200,480+Math.sin(t/1700)*40,t,1.1);
 if(S.pred>=3)spTurtle(c,1700-((t*.02*10)%2100),700+Math.sin(t/1300)*30,t);
 if(S.trash>10){const nt=Math.min(6,Math.round(S.trash/12));
  for(let i=0;i<nt;i++)spBag(c,150+pr(i*13)*1600+Math.sin(t/1400+i)*40,200+pr(i*5)*500,t);}
 if(S.bomb>35&&frac(t/2300)<.06){c.fillStyle='rgba(255,240,200,.3)';c.fillRect(0,0,1920,1080);}
 if(S.heat>55){c.fillStyle='rgba(255,160,90,'+(c01((S.heat-55)/120)*.28).toFixed(3)+')';c.fillRect(0,0,1920,1080);}}
const SCENE={sawah:sceneSawah,hutan:sceneHutan,sungai:sceneSungai,laut:sceneLaut};
const FAKE={sawah:{prod:52,water:70,herb:14,pred:6,poison:0},hutan:{prod:52,water:60,herb:14,pred:3,trap:0},
 sungai:{prod:36,water:66,herb:24,pred:3,gulma:10,poison:0,trash:0},laut:{prod:40,heat:20,herb:20,pred:3,trash:0,bomb:0}};

/* ================= KONFETI ================= */
const CONF_COLS=['#f5a30b','#38bdf8','#2ec98b','#ff5c4d','#fef08a','#c95f8a'];
function confettiBurst(){CONF=[];
 for(let i=0;i<170;i++)CONF.push({x:rnd(0,1920),y:rnd(-1080,0),w:rnd(8,16),h:rnd(10,20),c:pick(CONF_COLS),
  vy:rnd(2.2,5),vx:rnd(-.8,.8),r:rnd(0,6.28),vr:rnd(-.1,.1)});}
function renderConfetti(t){const c=CTX.conf;if(!c)return;c.clearRect(0,0,1920,1080);
 CONF.forEach(p=>{p.y+=p.vy;p.x+=p.vx+Math.sin(t/300+p.r)*.6;p.r+=p.vr;
  if(p.y>1120){p.y=-40;p.x=rnd(0,1920);}
  c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.restore();});}

/* ================= LOOP UTAMA ================= */
let loopN=0;
