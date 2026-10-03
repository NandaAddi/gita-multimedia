/* ============================================================
   ECO-EXPLORER — js/renderers/characters.js
   Vektor Gita SVG, Canvas Helpers, Sprites, & Maskot Tim
   ============================================================ */

/* ================= GITA ================= */
function gitaSVG(size,expr){expr=expr||'happy';
return '<svg class="gita '+expr+'" viewBox="0 0 230 250" width="'+size+'" height="'+Math.round(size*250/230)+'">'
+'<circle cx="115" cy="114" r="86" fill="#232b36" stroke="#151b23" stroke-width="5"/>'
+'<path d="M40 172 Q26 220 46 244 L184 244 Q204 220 190 172 Q152 196 115 196 Q78 196 40 172Z" fill="#232b36" stroke="#151b23" stroke-width="4"/>'
+'<circle cx="115" cy="122" r="55" fill="#f7cba4" stroke="#d9a276" stroke-width="3"/>'
+'<path d="M62 106 A 53 53 0 0 1 168 106 L168 118 A 53 34 0 0 0 62 118 Z" fill="#232b36" stroke="#151b23" stroke-width="3"/>'
+'<circle cx="168" cy="118" r="5" fill="#f5a30b" stroke="#b45309" stroke-width="2"/>'
+'<path class="brow b1" d="M80 101 Q92 94 103 99"/><path class="brow b2" d="M127 99 Q138 94 150 101"/>'
+'<g class="eye"><ellipse cx="91" cy="121" rx="8" ry="10" fill="#2a2320"/><circle cx="94" cy="117" r="2.6" fill="#fff"/></g>'
+'<g class="eye"><ellipse cx="139" cy="121" rx="8" ry="10" fill="#2a2320"/><circle cx="142" cy="117" r="2.6" fill="#fff"/></g>'
+'<path class="eh" d="M82 122 Q91 111 100 122"/><path class="eh" d="M130 122 Q139 111 148 122"/>'
+'<circle cx="74" cy="139" r="7" fill="#f0a08c" opacity=".55"/><circle cx="156" cy="139" r="7" fill="#f0a08c" opacity=".55"/>'
+'<path class="g-mouth" d="M96 149 Q115 165 134 149 Q115 157 96 149Z" fill="#9c3d56" stroke="#6e2a3e" stroke-width="2.5"/>'
+'<path d="M18 250 Q22 190 70 176 L160 176 Q208 190 212 250 Z" fill="#1e3a5f" stroke="#14263f" stroke-width="4"/>'
+'<path d="M115 176 L115 250" stroke="#f5a30b" stroke-width="4"/>'
+'<circle cx="182" cy="216" r="13" fill="#f5a30b" stroke="#b45309" stroke-width="3"/>'
+'<circle cx="179" cy="213" r="4" fill="#022c22"/><path d="M187 221l6 6" stroke="#022c22" stroke-width="3"/></svg>';}
function simExpr(e){const g=el('#sim-ui .gita');if(g){g.classList.remove('happy','talk','worried','cheer');g.classList.add(e);}}


/* ================= KANVAS: HELPER ================= */
function CIRC(c,x,y,r,col){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=col;c.fill();}
function O(c,x,y,rx,ry,col){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=col;c.fill();}
function F(c,pts,col){c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();c.fillStyle=col;c.fill();}
function LG(c,x0,y0,x1,y1,s0,s1){return gradMemo(c,'L'+gq(x0)+','+gq(y0)+','+gq(x1)+','+gq(y1)+'|'+s0+'|'+s1,
 ()=>{const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,s0);g.addColorStop(1,s1);return g;});}
function RG(c,x,y,r,s0,s1){return gradMemo(c,'R'+gq(x)+','+gq(y)+','+gq(r)+'|'+s0+'|'+s1,
 ()=>{const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,s0);g.addColorStop(1,s1);return g;});}
const GRADCACHE=new Map();
function gq(v){return Math.round(v*2)/2;}
function gradMemo(c,key,mk){let g=GRADCACHE.get(key);if(!g){if(GRADCACHE.size>240)GRADCACHE.clear();g=mk();GRADCACHE.set(key,g);}return g;}
function OG(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();}
function CG(c,x,y,r,fill){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=fill;c.fill();}
function SH(c,x,y,rx){c.beginPath();c.ellipse(x,y,rx,Math.max(2,rx*.26),0,0,7);c.fillStyle='rgba(15,35,25,.28)';c.fill();}
function EB(c,x,y,r,dx,dy){dx=dx||0;dy=dy||0;CIRC(c,x,y,r,'#fff');CIRC(c,x+dx,y+dy,r*.55,'#241c16');CIRC(c,x+dx+r*.22,y+dy-r*.22,r*.2,'#fff');}
function skyPaint(c,top,bot,hor){c.fillStyle=LG(c,0,0,0,hor,top,bot);c.fillRect(0,0,1920,hor);}
function sunDraw(c,x,y,t){CIRC(c,x,y,50,'#ffd76e');c.strokeStyle='rgba(255,215,110,.55)';c.lineWidth=6;
 for(let i=0;i<10;i++){const a=t/2400+i*Math.PI/5;c.beginPath();c.moveTo(x+Math.cos(a)*64,y+Math.sin(a)*64);c.lineTo(x+Math.cos(a)*(82+Math.sin(t/300+i)*7),y+Math.sin(a)*(82+Math.sin(t/300+i)*7));c.stroke();}}
function cloud(c,x,y,s){O(c,x,y,42*s,20*s,'rgba(255,255,255,.85)');O(c,x+34*s,y+6*s,30*s,15*s,'rgba(255,255,255,.85)');O(c,x-32*s,y+8*s,26*s,13*s,'rgba(255,255,255,.85)');}
function cloudsDraw(c,t){const off=(t/90)%2400-300;cloud(c,off,120,1.1);cloud(c,(off+900)%2400-300,210,.8);cloud(c,(off+1700)%2400-300,150,.95);}

/* ================= KANVAS: SATWA ================= */
function spRice(c,x,y,hgt,col,sw){c.strokeStyle=col;c.lineWidth=3;c.lineCap='round';
 for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+i*5+sw*.5,y-hgt*.55,x+i*8+sw,y-hgt);c.stroke();
  const g2=i%2?'#63c06a':col;
  for(let k=0;k<3;k++)O(c,x+i*8+sw,y-hgt+k*7+3,2.6,4.5,g2);}
 O(c,x-8+sw,y-hgt+2,1.4,2.4,'rgba(255,255,220,.55)');}
function spMouse(c,x,y){c.save();c.translate(x,y);
 SH(c,0,9,15);
 c.strokeStyle='#6e5238';c.lineWidth=2;c.lineCap='round';c.beginPath();c.moveTo(-13,2);c.quadraticCurveTo(-22,-5,-27,1);c.stroke();
 CG(c,-27,1,1.6,'#c9a07a');
 OG(c,0,0,14,9,RG(c,0,-2,15,'#b08a5e','#7a5a38'));
 O(c,-2,3,9,5,'rgba(232,205,170,.9)');
 O(c,10,-6,5,5,'#a5825e');O(c,8,-10,2.6,2.6,'#a5825e');O(c,8,-10,1.4,1.4,'#e8a0a8');
 EB(c,13,-7,2.2,.4,0);
 CIRC(c,15.5,-5,1.4,'#e88a8a');
 c.strokeStyle='rgba(60,40,25,.7)';c.lineWidth=1;c.beginPath();c.moveTo(14,-4);c.lineTo(20,-6);c.moveTo(14,-2);c.lineTo(20,-1);c.stroke();c.restore();}
function spSnake(c,x,y,t){c.save();c.translate(x,y);
 c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=9;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5+1;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='#4c8a3f';c.lineWidth=6.5;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='#8fd46a';c.lineWidth=2;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5-2;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='rgba(30,70,30,.6)';c.lineWidth=1.5;
 for(let i=2;i<22;i+=4){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5;
  c.beginPath();c.moveTo(X-3,Y+2);c.quadraticCurveTo(X,Y+5,X+3,Y+2);c.stroke();}
 const hy=Math.sin(6.28+t/350)*5;
 SH(c,40,hy+9,12);
 OG(c,44,hy,8,5.5,RG(c,44,hy-2,9,'#6fbf60','#3a7a30'));
 const fl=Math.sin(t/180)>0?6:2;
 c.strokeStyle='#d84f4f';c.lineWidth=2;c.beginPath();c.moveTo(51,hy);c.lineTo(51+7+fl,hy-2);c.moveTo(51+7+fl,hy-2);c.lineTo(51+5+fl,hy-4);c.moveTo(51+7+fl,hy-2);c.lineTo(51+5+fl,hy);c.stroke();
 EB(c,45,hy-2,2.4,.5,0);c.restore();}
function spFrog(c,x,y,t){const j=Math.abs(Math.sin(t/320))*14;c.save();c.translate(x,y-j);
 SH(c,0,11,17);
 OG(c,0,0,16,11,RG(c,-3,-4,17,'#8fd46a','#3f8a36'));
 O(c,0,5,10,5.5,'rgba(220,240,190,.85)');
 CIRC(c,-9,2,2,'#2e6b2f');CIRC(c,9,-1,2,'#2e6b2f');CIRC(c,0,-5,1.6,'#2e6b2f');
 c.strokeStyle='#2e6b2f';c.lineWidth=3;c.lineCap='round';
 c.beginPath();c.moveTo(-14,6);c.quadraticCurveTo(-22,10,-20,12);c.stroke();
 c.beginPath();c.moveTo(14,6);c.quadraticCurveTo(22,10,20,12);c.stroke();
 CIRC(c,-7,-9,5.5,'#e8f4d8');CIRC(c,7,-9,5.5,'#e8f4d8');
 EB(c,-7,-9,3.4,.6,0);EB(c,7,-9,3.4,.6,0);
 c.strokeStyle='#241c16';c.lineWidth=2;c.beginPath();c.arc(0,-2,5,.1*Math.PI,.9*Math.PI);c.stroke();c.restore();}
function butterfly(c,x,y,t){const f=Math.sin(t/110);c.save();c.translate(x,y);
 c.save();c.scale(.55+.45*Math.abs(f),1);
 OG(c,-7,-3,7,6,LG(c,-14,0,0,0,'#f7d4e4','#e89ac0'));
 OG(c,7,-3,7,6,LG(c,0,0,14,0,'#e89ac0','#f7d4e4'));
 CIRC(c,-8,-4,2,'rgba(255,255,255,.9)');CIRC(c,8,-4,2,'rgba(255,255,255,.9)');
 CIRC(c,-5,0,1.2,'#a05a80');CIRC(c,5,0,1.2,'#a05a80');
 c.restore();
 c.strokeStyle='#3a2f3a';c.lineWidth=2.4;c.lineCap='round';c.beginPath();c.moveTo(0,-6);c.lineTo(0,6);c.stroke();
 c.lineWidth=1.2;c.beginPath();c.moveTo(-1,-6);c.quadraticCurveTo(-5,-11,-7,-12);c.moveTo(1,-6);c.quadraticCurveTo(5,-11,7,-12);c.stroke();
 CIRC(c,0,-1,1,'#fff');
 c.restore();}
function treeDraw(c,x,y,h,col){const dk=mixc(col,'#1e4028',.45),lt=mixc(col,'#cfe8a8',.3);
 c.fillStyle='#5a3d24';c.fillRect(x-h*.07,y-h*.5,h*.14,h*.5);
 c.fillStyle='#7a5636';c.fillRect(x-h*.07,y-h*.5,h*.045,h*.5);
 const w=h*.55;
 F(c,[[x-w,y-h*.45],[x+w,y-h*.45],[x,y-h*.95]],dk);
 F(c,[[x-w*.82,y-h*.5],[x+w*.18,y-h*.5],[x,y-h*.95]],col);
 F(c,[[x-w*.8,y-h*.7],[x+w*.8,y-h*.7],[x,y-h*1.1]],mixc(col,'#2e5b36',.25));
 F(c,[[x-w*.62,y-h*.74],[x+w*.1,y-h*.74],[x,y-h*1.08]],mixc(col,'#9ed07a',.25));
 CIRC(c,x-w*.3,y-h*.6,h*.03,lt);CIRC(c,x+w*.25,y-h*.8,h*.025,lt);}
function texRidge(c,pts,col,seed){F(c,pts,col);
 c.save();c.beginPath();c.moveTo(pts[0][0],pts[0][1]);
 for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);
 c.closePath();c.clip();
 let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;
 pts.forEach(p=>{mnx=Math.min(mnx,p[0]);mxx=Math.max(mxx,p[0]);mny=Math.min(mny,p[1]);mxy=Math.max(mxy,p[1]);});
 const dk=mixc(col,'#1e4028',.4),lt=mixc(col,'#ffffff',.35),veg=mixc(col,'#14301c',.35);
 c.strokeStyle=dk;c.lineCap='round';
 for(let k=0;k<5;k++){const px=mnx+(k+.5)*(mxx-mnx)/5+(pr(seed+k)-.5)*60;
  c.lineWidth=5+pr(seed+k*3)*7;c.beginPath();c.moveTo(px,mny+6);
  c.quadraticCurveTo(px+(pr(seed+k*7)-.5)*80,(mny+mxy)/2,px+(pr(seed+k*11)-.5)*140,mxy);c.stroke();}
 for(let k=0;k<10;k++){const tx=mnx+20+pr(seed+50+k)*(mxx-mnx-40),ty=mny+(mxy-mny)*(.3+.7*pr(seed+90+k));
  const s=2+pr(seed+130+k)*3.5;
  F(c,[[tx-s,ty],[tx+s,ty],[tx,ty-s*1.6]],k%3?veg:lt);}
 c.strokeStyle=lt;c.lineWidth=4;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);
 for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();
 c.restore();}
function texField(c,t){
 c.strokeStyle='rgba(120,90,50,.35)';c.lineWidth=2.5;c.lineCap='round';
 for(let i=0;i<4;i++){const y=540+i*130;
  for(let k=0;k<7;k++){const x=350+k*220+((i*53+k*97)%60);
   c.beginPath();c.moveTo(x,y+14);c.quadraticCurveTo(x+8,y+26,x+20,y+30);c.stroke();}}
 c.fillStyle='rgba(90,60,30,.22)';
 for(let k=0;k<16;k++){c.beginPath();c.arc(200+pr(k*3.1)*1520,500+pr(k*7.7)*540,1.5+pr(k)*2,0,7);c.fill();}}
function spDeer(c,x,y,t){c.save();c.translate(x,y);const b=Math.sin(t/700)*1.5;
 SH(c,0,2,26);
 c.lineCap='round';
 c.strokeStyle='#6e4f30';c.lineWidth=4.5;
 [[-10,-16,-10,0],[10,-16,10,0],[-4,-16,-6,0],[4,-16,6,0]].forEach(l=>{c.beginPath();c.moveTo(l[0],l[1]+b);c.lineTo(l[2],l[3]);c.stroke();});
 c.strokeStyle='#3a2812';c.lineWidth=4.5;[[-10,0],[10,0],[-6,0],[6,0]].forEach(p=>{c.beginPath();c.moveTo(p[0]-2.4,p[1]-3);c.lineTo(p[0]+2.4,p[1]-3);c.stroke();});
 OG(c,0,-26,20,12,LG(c,0,-38,0,-14,'#d09a68','#8a5f36'));
 O(c,-8,-22,7,8,'rgba(240,220,190,.55)');
 CIRC(c,-12,-28,1.8,'rgba(255,250,235,.8)');CIRC(c,-4,-31,1.5,'rgba(255,250,235,.8)');CIRC(c,4,-27,1.8,'rgba(255,250,235,.8)');
 c.strokeStyle='#b98a5f';c.lineWidth=7;c.beginPath();c.moveTo(14,-32);c.quadraticCurveTo(22,-48,20,-58);c.stroke();
 c.strokeStyle='#8a5f36';c.lineWidth=2;c.beginPath();c.moveTo(15,-36);c.quadraticCurveTo(21,-48,20,-56);c.stroke();
 OG(c,20,-60,7.5,6,RG(c,20,-62,8,'#d09a68','#9a6a3e'));
 O(c,14,-60,3,4,'#e8c898');
 EB(c,22,-61,2.2,.6,0);
 CIRC(c,27,-58,1.6,'#3a2812');
 c.strokeStyle='#7a5a35';c.lineWidth=2.5;c.beginPath();c.moveTo(18,-66);c.lineTo(14,-76);c.moveTo(18,-66);c.lineTo(22,-78);c.moveTo(20,-70);c.lineTo(16,-80);c.stroke();c.restore();}
function spTiger(c,x,y,t){c.save();c.translate(x,y);const ts=Math.sin(t/900);
 SH(c,0,0,34);
 c.strokeStyle='#b45a15';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(-28,-16);c.quadraticCurveTo(-52,-26+ts*4,-58,-14+ts*6);c.stroke();
 c.strokeStyle='#5a3210';c.lineWidth=3;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-52+i*7,-24+ts*3);c.lineTo(-50+i*7,-17+ts*3);c.stroke();}
 OG(c,0,-18,30,17,LG(c,0,-35,0,-1,'#f2a93e','#c96a1a'));
 O(c,2,-10,22,9,'rgba(255,240,220,.85)');
 c.strokeStyle='#5a3210';c.lineWidth=4;
 for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*10,-31);c.quadraticCurveTo(i*10+3,-22,i*10-2,-13);c.stroke();}
 OG(c,30,-26,13,11,RG(c,30,-29,13,'#f2a93e','#d97a1f'));
 O(c,31,-19,7,5,'#fff');F(c,[[28,-21],[34,-21],[31,-16]],'#e88a8a');
 CIRC(c,24,-34,4.5,'#e6942a');CIRC(c,38,-34,4.5,'#e6942a');
 CIRC(c,24,-34,2,'#fff');CIRC(c,38,-34,2,'#fff');
 c.fillStyle='#7a4a1a';c.beginPath();c.moveTo(23,-38);c.lineTo(25,-38);c.lineTo(24,-35);c.closePath();c.fill();
 c.beginPath();c.moveTo(37,-38);c.lineTo(39,-38);c.lineTo(38,-35);c.closePath();c.fill();
 CIRC(c,27,-27,2.6,'#c97a1a');CIRC(c,27,-27,1.4,'#241c16');CIRC(c,27.8,-27.8,.7,'#fff');
 CIRC(c,35,-27,2.6,'#c97a1a');CIRC(c,35,-27,1.4,'#241c16');CIRC(c,35.8,-27.8,.7,'#fff');
 c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=1;c.beginPath();c.moveTo(38,-20);c.lineTo(46,-22);c.moveTo(38,-18);c.lineTo(46,-17);c.stroke();
 c.restore();}
function spStork(c,x,y,t){const dip=Math.max(0,Math.sin(t/2600));c.save();c.translate(x,y);
 O(c,1,27,12,3,'rgba(15,35,25,.25)');
 c.strokeStyle='#8a6a45';c.lineWidth=4;c.lineCap='round';
 c.beginPath();c.moveTo(-4,-14);c.lineTo(-4,26);c.moveTo(6,-14);c.lineTo(6,26);c.stroke();
 c.lineWidth=3;c.beginPath();c.moveTo(-4,26);c.lineTo(-9,28);c.moveTo(-4,26);c.lineTo(1,28);c.moveTo(6,26);c.lineTo(1,28);c.moveTo(6,26);c.lineTo(11,28);c.stroke();
 OG(c,0,-24,20,13,LG(c,0,-37,0,-11,'#ffffff','#cfc4ae'));
 O(c,-2,-20,12,8,'rgba(210,200,180,.5)');
 c.strokeStyle='rgba(140,125,105,.8)';c.lineWidth=2;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-14+i*7,-26);c.quadraticCurveTo(-10+i*7,-18,-4+i*7,-16);c.stroke();}
 O(c,-16,-20,8,7,'#e2dbcc');
 const hx=14-dip*2,hy=-58+dip*46;
 c.strokeStyle='#efe8da';c.lineWidth=9;c.beginPath();c.moveTo(12,-26);c.quadraticCurveTo(20,-46,hx,hy);c.stroke();
 c.strokeStyle='rgba(160,145,125,.6)';c.lineWidth=2;c.beginPath();c.moveTo(13,-30);c.quadraticCurveTo(19,-44,hx-1,hy-4);c.stroke();
 CG(c,hx,hy,8,LG(c,hx-8,hy-8,hx+8,hy+8,'#ffffff','#d8cdb8'));
 F(c,[[hx+6,hy-3],[hx+22,hy+2],[hx+6,hy+5]],'#e8a13a');
 F(c,[[hx+6,hy+2],[hx+18,hy+3],[hx+6,hy+5]],'#c97a2a');
 EB(c,hx+1,hy-2,2.2,.5,0);
 c.strokeStyle='#8a6a45';c.lineWidth=2;c.beginPath();c.moveTo(hx-6,hy-8);c.quadraticCurveTo(hx-12,hy-14,hx-16,hy-13);c.stroke();
 c.restore();}
function spFish(c,x,y,t,s,col,dir){c.save();c.translate(x,y);c.scale(dir*s,s);
 const w=Math.sin(t/130+x*.1)*4;
 F(c,[[-9,0],[-20,-7+w],[-20,7+w]],mixc(col,'#1a3a4a',.3));
 F(c,[[-10,-1],[-18,-6+w],[-18,5+w]],mixc(col,'#ffffff',.25));
 OG(c,0,0,12,7,LG(c,0,-7,0,7,mixc(col,'#ffffff',.15),mixc(col,'#0a2530',.45)));
 c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.2;
 for(let i=-1;i<=1;i++){c.beginPath();c.arc(-2+i*5,-1,4,.3*Math.PI,.85*Math.PI);c.stroke();}
 c.strokeStyle='rgba(10,40,55,.5)';c.lineWidth=1.5;c.beginPath();c.arc(3,0,5,-.6,.6);c.stroke();
 F(c,[[-2,-7],[2,-12],[5,-7]],mixc(col,'#1a3a4a',.25));
 EB(c,6,-2,2.4,.5,0);
 c.restore();}
function spShark(c,x,y,t,s){c.save();c.translate(x,y+Math.sin(t/1100)*8);c.scale(s,s);
 O(c,0,20,44,5,'rgba(10,30,40,.25)');
 F(c,[[-46,0],[-74,-18],[-70,0],[-74,18]],'#47616f');
 F(c,[[-48,-1],[-70,-14],[-68,-1]],'#7a99a8');
 OG(c,0,0,50,18,LG(c,0,-18,0,18,'#7a99a8','#cfdde2'));
 O(c,6,8,34,7,'rgba(230,240,243,.8)');
 F(c,[[-6,-16],[10,-34],[22,-14]],'#47616f');
 F(c,[[-2,-17],[10,-30],[20,-15]],'#7a99a8');
 c.strokeStyle='rgba(30,50,60,.6)';c.lineWidth=2;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-2-i*7,-8);c.quadraticCurveTo(-4-i*7,0,-2-i*7,7);c.stroke();}
 OG(c,34,-4,12,7,LG(c,34,-11,34,3,'#8aa5b2','#d7e4e9'));
 c.strokeStyle='#47616f';c.lineWidth=1.5;c.beginPath();c.moveTo(28,1);c.quadraticCurveTo(36,3,44,0);c.stroke();
 F(c,[[30,1],[33,5],[36,1],[39,5],[42,1]],'#fff');
 EB(c,40,-6,2.6,.6,0);
 F(c,[[-14,10],[6,26],[18,12]],'#47616f');c.restore();}
function spTurtle(c,x,y,t){c.save();c.translate(x,y);const p=Math.sin(t/500)*.5;
 O(c,0,15,28,5,'rgba(15,35,25,.25)');
 OG(c,-20,-10+p*4,8,4,LG(c,-20,-14,-20,-6,'#8fc47a','#4c8a5a'));
 OG(c,-20,10-p*4,8,4,LG(c,-20,6,-20,14,'#8fc47a','#4c8a5a'));
 OG(c,14,12,7,4,LG(c,14,8,14,16,'#8fc47a','#4c8a5a'));
 OG(c,0,0,26,16,RG(c,-4,-5,28,'#6faf62','#2e5a3a'));
 c.strokeStyle='#24482e';c.lineWidth=2.5;c.beginPath();c.ellipse(0,0,26,16,0,0,7);c.stroke();
 c.lineWidth=2;c.beginPath();c.ellipse(0,0,16,9.5,0,0,7);c.stroke();
 c.beginPath();c.moveTo(0,-9.5);c.lineTo(0,9.5);c.moveTo(-16,0);c.lineTo(16,0);c.stroke();
 CIRC(c,-8,-4,1.5,'rgba(220,240,200,.7)');CIRC(c,9,3,1.5,'rgba(220,240,200,.7)');
 OG(c,26,-4,8,6,LG(c,26,-10,26,2,'#8fc47a','#558f60'));
 EB(c,29,-6,2.2,.5,0);
 c.strokeStyle='#24482e';c.lineWidth=1.5;c.beginPath();c.arc(30,-2,3.5,.15*Math.PI,.85*Math.PI);c.stroke();
 c.restore();}
function spCoral(c,x,y,s,col,seed,bl){const col2=mixc(col,'#e8e4d8',bl);
 c.strokeStyle=col2;c.lineCap='round';const arms=3+Math.floor(pr(seed)*3);
 for(let i=0;i<arms;i++){const a=-Math.PI/2+(i-(arms-1)/2)*.5,ln=(30+pr(seed+i)*26)*s;
  c.lineWidth=9*s;c.strokeStyle=mixc(col2,'#5a3a2a',.25);c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.cos(a)*ln*.5,y+Math.sin(a)*ln*.8,x+Math.cos(a)*ln,y+Math.sin(a)*ln);c.stroke();
  c.lineWidth=6*s;c.strokeStyle=col2;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.cos(a)*ln*.5,y+Math.sin(a)*ln*.8,x+Math.cos(a)*ln,y+Math.sin(a)*ln);c.stroke();
  CIRC(c,x+Math.cos(a)*ln,y+Math.sin(a)*ln,6.5*s,col2);
  CIRC(c,x+Math.cos(a)*ln-2*s,y+Math.sin(a)*ln-2*s,2.4*s,mixc(col,'#ffffff',.5*(1-bl)));}
 O(c,x,y+3,10*s,5*s,mixc('#b06a4a','#d8d4c8',bl));
 CIRC(c,x-3*s,y+1,2.5*s,'rgba(255,255,255,.35)');}
function spFan(c,x,y,s,col,bl){const col2=mixc(col,'#e8e4d8',bl);c.strokeStyle=col2;c.lineWidth=4*s;
 for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.32;c.beginPath();c.moveTo(x,y);
  c.quadraticCurveTo(x+Math.cos(a)*20*s,y+Math.sin(a)*20*s,x+Math.cos(a)*34*s,y+Math.sin(a)*34*s);c.stroke();}
 c.lineWidth=3*s;c.strokeStyle=mixc(col2,'#ffffff',.3);c.beginPath();c.arc(x,y,30*s,-Math.PI*.95,-Math.PI*.05);c.stroke();
 c.strokeStyle=col2;c.lineWidth=4*s;c.beginPath();c.arc(x,y,30*s,-Math.PI*.9,-Math.PI*.1);c.stroke();
 for(let i=0;i<5;i++){const a=-Math.PI*(.9-i*.2);CIRC(c,x+Math.cos(a)*30*s,y+Math.sin(a)*30*s,2.6*s,mixc(col,'#ffffff',.4));}}
function spBag(c,x,y,t){c.save();c.translate(x,y+Math.sin(t/800+x)*4);
 c.fillStyle='rgba(235,235,235,.85)';c.beginPath();c.moveTo(-10,-8);c.quadraticCurveTo(-14,4,-8,8);
 c.quadraticCurveTo(0,12,8,8);c.quadraticCurveTo(14,4,10,-8);c.quadraticCurveTo(6,-14,3,-8);
 c.quadraticCurveTo(0,-12,-3,-8);c.quadraticCurveTo(-6,-14,-10,-8);c.fill();c.restore();}
function gulmaPatch(c,x,y,s,t){c.save();c.translate(x+Math.sin(t/1700+x)*6,y);
 for(let i=0;i<5;i++){O(c,(i-2)*16*s,(pr(i+x)*14-7)*s,15*s,9*s,i%2?'#3f8a4a':'#57a54a');
  c.strokeStyle='rgba(20,60,25,.5)';c.lineWidth=1.5*s;c.beginPath();c.moveTo((i-2)*16*s-10*s,(pr(i+x)*14-7)*s);c.lineTo((i-2)*16*s+10*s,(pr(i+x)*14-7)*s);c.stroke();}
 CIRC(c,10*s,-6*s,3.5*s,'#c95f8a');CIRC(c,9*s,-7*s,1.2*s,'#f7d4e4');CIRC(c,12*s,-4*s,2*s,'#e89ac0');
 c.restore();}

/* ================= KANVAS: ADEGAN ================= */

/* ================= MASKOT TIM ================= */
function fc(c,x,y,r){CIRC(c,x,y,r,'#241c16');CIRC(c,x+r*.28,y-r*.28,r*.32,'#fff');CIRC(c,x-r*.2,y+r*.3,r*.14,'rgba(255,255,255,.5)');}
function sm(c,x,y,w){c.strokeStyle='#241c16';c.lineWidth=3.5;c.lineCap='round';c.beginPath();c.arc(x,y,w,Math.PI*.12,Math.PI*.88);c.stroke();}
function mPadi(c){c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=10;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46,26,-54,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46,26,54,-12);c.stroke();
 c.strokeStyle='#3f8f4a';c.lineWidth=7;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46,26,-54,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46,26,54,-12);c.stroke();
 c.strokeStyle='#2e6b2f';c.lineWidth=1.5;
 c.beginPath();c.moveTo(-30,40);c.lineTo(-44,34);c.moveTo(30,40);c.lineTo(44,34);c.stroke();
 c.strokeStyle='#e0b73f';c.lineWidth=6;
 for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*5,68);c.quadraticCurveTo(i*15,-6,i*21,-56);c.stroke();
  for(let k=0;k<4;k++)O(c,i*21+(k%2)*4,-56+k*10,4.5,7,k%2?'#f7dc7e':'#e8bd45');}
 CIRC(c,-8,-30,2,'rgba(255,250,220,.9)');CIRC(c,30,-10,2,'rgba(255,250,220,.9)');
 fc(c,-12,8,8);fc(c,12,8,8);sm(c,0,26,10);
 c.globalAlpha=.5;CIRC(c,-24,28,7,'#f0a08c');CIRC(c,24,28,7,'#f0a08c');c.globalAlpha=1;}
function mSnake(c){c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=27;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-58,20,-20,-6);c.quadraticCurveTo(20,26,44,-4);c.stroke();
 c.strokeStyle='#57a54a';c.lineWidth=22;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-58,20,-20,-6);c.quadraticCurveTo(20,26,44,-4);c.stroke();
 c.strokeStyle='#8fd46a';c.lineWidth=7;
 c.beginPath();c.moveTo(-30,52);c.quadraticCurveTo(-58,12,-20,-14);c.quadraticCurveTo(20,18,44,-12);c.stroke();
 c.strokeStyle='#2e6b2f';c.lineWidth=5;
 [[-38,40],[-6,8],[28,8]].forEach(p=>{c.beginPath();c.moveTo(p[0]-6,p[1]-10);c.lineTo(p[0]+6,p[1]+10);c.stroke();});
 O(c,56,-16,20,15,'#63c25c');O(c,52,-20,12,8,'rgba(220,245,200,.6)');fc(c,50,-20,6);fc(c,64,-20,6);sm(c,57,-8,7);
 c.strokeStyle='#d84f4f';c.lineWidth=3;c.beginPath();c.moveTo(70,-8);c.lineTo(84,-2);c.moveTo(84,-2);c.lineTo(90,-6);c.moveTo(84,-2);c.lineTo(90,2);c.stroke();}
function mMushroom(c){O(c,0,44,34,26,'#f2e3c8');
 O(c,0,48,24,16,'rgba(210,180,140,.6)');
 c.fillStyle=LG(c,-58,0,58,0,'#e88a4a','#c85a25');c.beginPath();c.moveTo(-58,-6);c.arc(0,-6,58,Math.PI,0);c.quadraticCurveTo(30,20,0,22);c.quadraticCurveTo(-30,20,-58,-6);c.fill();
 c.strokeStyle='#a34a22';c.lineWidth=4;c.stroke();
 c.strokeStyle='rgba(120,60,25,.5)';c.lineWidth=2.5;c.beginPath();c.moveTo(-52,-2);c.quadraticCurveTo(0,26,52,-2);c.stroke();
 CIRC(c,-30,-30,5,'#f7ecd8');CIRC(c,-24,-22,3,'#f7ecd8');CIRC(c,22,-42,4,'#f7ecd8');CIRC(c,44,-18,3.4,'#f7ecd8');CIRC(c,36,-8,2.2,'#f7ecd8');
 O(c,-26,-48,20,9,'rgba(255,255,255,.45)');
 fc(c,-11,36,6);fc(c,11,36,6);sm(c,0,48,7);
 c.globalAlpha=.5;CIRC(c,-20,52,5,'#f0a08c');CIRC(c,20,52,5,'#f0a08c');c.globalAlpha=1;}
function mEagle(c){O(c,0,14,44,40,'#8a6a4a');O(c,-8,8,26,30,'rgba(190,160,125,.6)');O(c,0,-6,30,22,'#9a7a56');
 F(c,[[-6,-6],[-64,30],[-70,52],[-10,34]],'#7a5a3a');
 c.strokeStyle='rgba(60,40,20,.5)';c.lineWidth=2.5;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-20-i*14,8+i*10);c.quadraticCurveTo(-34-i*14,18+i*10,-44-i*12,30+i*8);c.stroke();}
 O(c,0,16,22,20,'rgba(240,225,195,.55)');
 O(c,0,-44,22,18,'#f2ede2');O(c,-6,-48,12,10,'rgba(200,185,165,.5)');F(c,[[14,-50],[34,-44],[14,-38]],'#e8a13a');F(c,[[16,-48],[30,-44],[16,-40]],'#f7c95a');
 fc(c,-8,-48,6);fc(c,8,-48,6);
 c.strokeStyle='#4a3a2a';c.lineWidth=3;c.beginPath();c.moveTo(-14,-56);c.lineTo(-2,-52);c.moveTo(14,-56);c.lineTo(2,-52);c.stroke();
 F(c,[[-8,48],[0,70],[8,48]],'#f2ede2');
 c.strokeStyle='#e8a13a';c.lineWidth=5;c.beginPath();c.moveTo(-14,52);c.lineTo(-18,64);c.moveTo(14,52);c.lineTo(18,64);c.stroke();}
function mFrog(c){O(c,0,10,58,40,'#63b34a');O(c,-10,2,34,26,'rgba(160,220,130,.55)');O(c,0,26,38,22,'#8fd46a');
 CIRC(c,-30,6,4,'#3f8a36');CIRC(c,28,-2,3.4,'#3f8a36');CIRC(c,10,2,2.6,'#3f8a36');CIRC(c,-6,16,2.2,'#3f8a36');
 CIRC(c,-24,-32,16,'#e8f4d8');CIRC(c,24,-32,16,'#e8f4d8');
 EB(c,-24,-32,8,.8,0);EB(c,24,-32,8,.8,0);
 c.strokeStyle='#241c16';c.lineWidth=4;c.beginPath();c.arc(0,-6,14,.15*Math.PI,.85*Math.PI);c.stroke();
 c.globalAlpha=.5;CIRC(c,-40,-6,9,'#f0a08c');CIRC(c,40,-6,9,'#f0a08c');c.globalAlpha=1;
 c.strokeStyle='#4a8f3a';c.lineWidth=10;c.lineCap='round';
 c.beginPath();c.moveTo(-40,38);c.lineTo(-58,52);c.moveTo(40,38);c.lineTo(58,52);c.stroke();
 CIRC(c,-58,52,5,'#63b34a');CIRC(c,58,52,5,'#63b34a');}
const MASC={padiBig:mPadi,snake:mSnake,mushroom:mMushroom,eagle:mEagle,frog:mFrog};

