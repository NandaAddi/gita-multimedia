/* ============================================================
   ECO-EXPLORER — js/data/missions.js
   Data Tim, 8 Misi, Peristiwa Acak, & Bridging Dialog
   ============================================================ */

/* ================= DATA: TIM ================= */
const TEAMS=[
{id:'padi',name:'Tim Padi',mascot:'padiBig',motto:'Kami tumbuh menjadi sumber energi untuk semua!',
 role:'Ahli Produsen',dossier:'Padi adalah produsen: ia membuat makanannya sendiri dengan sinar matahari, air, dan zat hara. Semua hewan sawah bergantung pada padi!',spec:'sawah-1',
 perk:{ids:['padi','pohon','tanam','karang'],label:'aksi menanam'}},
{id:'ular',name:'Tim Ular',mascot:'snake',motto:'Kami menjaga agar hama tidak berlebihan!',
 role:'Ahli Pemangsa Alami',dossier:'Ular adalah predator alami tikus. Dengan ular, jumlah hama tetap seimbang. Ular adalah sahabat petani!',spec:'sawah-2',
 perk:{ids:['ular','katak'],label:'melepas ular & katak'}},
{id:'jamur',name:'Tim Jamur',mascot:'mushroom',motto:'Kami mengubah sisa menjadi kehidupan baru!',
 role:'Ahli Pengurai',dossier:'Jamur adalah pengurai: ia mengubah sisa jerami dan daun menjadi pupuk alami yang menyuburkan tanah.',spec:'hutan-1',
 perk:{ids:['jamur','serasah'],label:'aksi penguraian'}},
{id:'elang',name:'Tim Elang',mascot:'eagle',motto:'Dari atas, kami menjaga keseimbangan hutan!',
 role:'Ahli Pemangsa Puncak',dossier:'Elang dan harimau adalah pemangsa puncak. Mereka menjaga jumlah pemakan tumbuhan agar habitat tidak rusak.',spec:'hutan-2',
 perk:{ids:['harimau','patroli'],label:'aksi satwa liar & patroli'}},
{id:'katak',name:'Tim Katak',mascot:'frog',motto:'Kulit kami peka! Kami penanda kebersihan air!',
 role:'Ahli Ekosistem Air',dossier:'Katak hidup di darat dan air. Kulitnya peka terhadap racun, sehingga katak adalah penanda apakah lingkungan sehat atau tercemar.',spec:'sungai-2',
 perk:{ids:['bersih','saring','sampah','plastik','gulma'],label:'aksi membersihkan air'}}];

/* ================= DATA: 8 MISI ================= */
const hCtrl=(S,r,d)=>{r=r||.3;d=d||16;return c01(1-Math.max(0,S.herb-S.prod*r)/d);};
const MISSIONS=[
{id:'sawah-1',biome:'sawah',type:'alam',par:40,
 title:'Misi 1: Tanah Retak Kekeringan',headline:'Musim kemarau membuat saluran irigasi kering dan padi layu!',
 task:'Alirkan air irigasi dan tanam tunas padi!',
 story:'Detektif! Musim kemarau panjang membuat saluran irigasi kering. Tanah sawah retak-retak dan padi mulai layu. Jika padi mati, semua penghuni sawah akan kelaparan. Cepat, kita tolong sawah ini!',
 init:{prod:30,herb:15,pred:7,water:14},
 tick(S){S.water=cl(S.water-2.4,0,100);
  const g=S.water>55?3.2:S.water>30?.8:-3.4;
  S.prod=cl(S.prod+g-S.herb*.28);S.herb=cl(S.herb+(S.prod>22?1.5:-2.2)-S.pred*.85);
  S.pred=cl(S.pred+(S.herb>9?.35:-.45));},
 health(S){return Math.round(100*(0.3*c01(S.prod/60)+0.3*c01(S.water/70)+0.2*c01(S.pred/8)+0.2*hCtrl(S)))},
 actions:[
  {id:'air',label:'Alirkan Air Irigasi',role:'Air adalah kebutuhan hidup padi',ic:'drop',quota:6,fx:S=>S.water=cl(S.water+30,0,100)},
  {id:'padi',label:'Tanam Tunas Padi',role:'Padi: produsen sumber energi',ic:'sprout',quota:8,fx:S=>S.prod=cl(S.prod+12)},
  {id:'jamur',label:'Urai Sisa Jerami',role:'Jamur: pengurai jadi pupuk alami (+7 Padi)',ic:'mushroom',quota:5,fx:S=>S.prod=cl(S.prod+7)}],
 stats:[['water','Air Sawah','drop',1,'Padi butuh air untuk berfotosintesis. Tanpa air, padi layu dan tanah retak.'],
  ['prod','Padi','sprout',1,'Padi adalah produsen: sumber energi bagi seluruh penghuni sawah.'],
  ['herb','Tikus','paw',-1,'Tikus memakan bulir padi. Jumlahnya harus terkendali oleh pemangsa.'],
  ['pred','Pemangsa','snake',1,'Ular dan katak memangsa tikus dan wereng — sahabat petani!']],
 targets:[{l:'Air Sawah mencapai 60',c:S=>S.water>=60},{l:'Padi tumbuh subur (55)',c:S=>S.prod>=55},{l:'Kesehatan sawah 75%',c:S=>S.health>=75}],
 tips:['Lihat jumlah Air Sawah! Padi butuh air untuk membuat makanannya sendiri.','Tikus memakan padi. Siapa pemangsa alami tikus di sawah?','Jamur mengurai sisa jerami menjadi pupuk alami penyubur padi.'],
 quiz:{q:'Musim kemarau membuat padi kering. Mengapa elang dan ular ikut lapar?',
  opts:['Elang dan ular pindah ke kota karena takut kepanasan.','Tikus kehilangan makanan dan berkurang, sehingga mangsa pemangsa ikut habis.','Padi yang kering berubah menjadi beracun bagi ular.'],
  correct:1,explain:'Padi adalah produsen utama sumber energi di sawah. Jika padi mati akibat kekeringan, tikus sebagai makanan ular dan elang ikut berkurang, sehingga pemangsa menjadi kelaparan.'},
 chain:['Kemarau panjang','Air irigasi kering','Padi layu & mati','Pemangsa kehilangan mangsa']},
{id:'sawah-2',biome:'sawah',type:'manusia',par:40,
 title:'Misi 2: Bahaya Racun & Jerat Petani',headline:'Racun kimia disemprot berlebihan dan ular diburu, tikus merajalela!',
 task:'Kembalikan katak, lepas ular, bersihkan racun!',
 story:'Detektif, ini buruk! Petani menyemprot racun kimia terlalu banyak, dan ular sawah diburu orang. Sekarang tikus merajalela memakan bulir padi. Kembalikan keseimbangan sawah!',
 init:{prod:45,herb:28,pred:2,water:70,poison:62},
 tick(S){S.prod=cl(S.prod-S.herb*.3-.3);S.herb=cl(S.herb+2.2-S.pred*.9-(S.prod<14?2:0));
  S.pred=cl(S.pred+(S.herb>12?.4:-.55)-(S.poison>12?S.poison*.02:0));S.water=cl(S.water-.4,0,100);
  if(S.poison<20)S.prod=cl(S.prod+1.2);},
 health(S){return Math.round(100*(0.3*c01(S.prod/60)+0.28*c01(1-S.poison/65)+0.22*c01(S.pred/8)+0.2*hCtrl(S)))},
 actions:[
  {id:'bersih',label:'Bersihkan Racun',role:'Buang residu racun kimia',ic:'bottle',quota:3,fx:S=>S.poison=cl(S.poison-35,0,100)},
  {id:'ular',label:'Lepas Ular Sawah',role:'Ular: pemangsa alami tikus',ic:'snake',quota:3,fx:S=>S.pred=cl(S.pred+4)},
  {id:'katak',label:'Kembalikan Katak',role:'Katak: pemakan serangga sawah',ic:'frog',quota:3,fx:S=>{S.pred=cl(S.pred+3);S.poison=cl(S.poison-6,0,100);}}],
 stats:[['poison','Racun','bottle',-1,'Racun kimia membunuh ular, katak, dan ikan. Bersihkan lebih dulu!'],
  ['prod','Padi','sprout',1,'Padi adalah produsen sumber energi sawah.'],
  ['herb','Tikus','paw',-1,'Tanpa pemangsa, jumlah tikus meledak tak terkendali.'],
  ['pred','Pemangsa','snake',1,'Ular dan katak adalah sahabat petani.']],
 targets:[{l:'Racun turun sampai 20',c:S=>S.poison<=20},{l:'Pemangsa alami kembali (8)',c:S=>S.pred>=8},{l:'Kesehatan sawah 75%',c:S=>S.health>=75}],
 tips:['Racun membunuh ular dan katak. Bersihkan dulu, baru lepas pemangsanya!','Tanpa ular dan katak, jumlah tikus meledak tak terkendali.','Ular adalah sahabat petani, bukan musuh!'],
 quiz:{q:'Petani memburu semua ular sawah. Apa bahaya bagi panen padi?',
  opts:['Hama tikus melonjak banyak dan memakan habis bulir padi.','Ular yang hilang membuat padi tidak bisa berbunga.','Tanah sawah menjadi kering karena tanpa ular.'],
  correct:0,explain:'Ular adalah predator alami tikus. Tanpa ular, jumlah tikus meledak tak terkendali dan memakan habis padi. Pemangsa alami adalah sahabat petani!'},
 chain:['Ular sawah diburu','Tikus tak terkendali','Padi dimakan habis','Panen gagal total']},
{id:'hutan-1',biome:'hutan',type:'alam',par:42,
 title:'Misi 3: Kemarau & Pohon Kering',headline:'Panas terik mengeringkan mata air rimba dan rumput pakan rusa!',
 task:'Alirkan mata air dan reboisasi pohon!',
 story:'Detektif! Kemarau panjang membuat mata air rimba mengering. Rumput pakan rusa layu dan pohon-pohon mulai gugur daunnya. Hutan ini butuh pertolongan kita!',
 init:{prod:38,herb:16,pred:3,water:12},
 tick(S){S.water=cl(S.water-2.2,0,100);
  const g=S.water>45?1.8:S.water>30?.2:-2.6;
  S.prod=cl(S.prod+g-S.herb*.15);S.herb=cl(S.herb+(S.prod>24?1.2:-2)-S.pred*.65);
  S.pred=cl(S.pred+(S.herb>11?.28:-.4));},
 health(S){return Math.round(100*(0.3*c01(S.prod/55)+0.28*c01(S.water/70)+0.22*c01(S.pred/4)+0.2*hCtrl(S)))},
 actions:[
  {id:'air',label:'Alirkan Mata Air',role:'Air: kebutuhan hidup hutan',ic:'drop',quota:6,fx:S=>S.water=cl(S.water+30,0,100)},
  {id:'pohon',label:'Tanam Pohon Rimba',role:'Pohon: produsen & rumah satwa',ic:'tree',quota:8,fx:S=>S.prod=cl(S.prod+10)},
  {id:'serasah',label:'Urai Serasah Jadi Humus',role:'Pengurai: pembuat tanah subur (+4 Hutan)',ic:'mushroom',quota:5,fx:S=>S.prod=cl(S.prod+4)}],
 stats:[['water','Air Mata Air','drop',1,'Mata air menghidupi pohon dan rumput. Akar pohon menyimpan air hujan.'],
  ['prod','Pohon & Rumput','tree',1,'Pohon dan rumput adalah makanan rusa dan paru-paru bumi.'],
  ['herb','Rusa','paw',-1,'Rusa yang terlalu banyak memakan habis pohon muda.'],
  ['pred','Harimau','paw',1,'Harimau Sumatera menjaga jumlah rusa tetap seimbang.']],
 targets:[{l:'Air mata air mencapai 60',c:S=>S.water>=60},{l:'Hutan hijau kembali (50)',c:S=>S.prod>=50},{l:'Kesehatan hutan 75%',c:S=>S.health>=75}],
 tips:['Mata air kering membuat pohon dan rumput mati. Air dulu!','Rusa makan rumput, harimau makan rusa. Jika rumput habis, harimau turun ke desa.','Serasah yang terurai jamur menjadi humus penyubur pohon.'],
 quiz:{q:'Kemarau mengeringkan rumput rimba. Mengapa harimau turun ke desa?',
  opts:['Harimau ingin bersembunyi dari pemburu di desa.','Rusa kelaparan dan berkurang, sehingga harimau turun mencari mangsa.','Harimau suka berendam di kolam desa saat panas.'],
  correct:1,explain:'Saat produsen (rumput dan daun) layu, herbivora seperti rusa lapar dan berkurang. Pemangsa puncak seperti harimau kesulitan mencari makan sehingga mendekati pemukiman warga.'},
 chain:['Kemarau panjang','Rumput rimba kering','Rusa berkurang','Harimau turun ke desa']},
{id:'hutan-2',biome:'hutan',type:'manusia',par:45,
 title:'Misi 4: Penebangan Liar & Jerat Pemburu',headline:'Pembalakan liar dan jerat pemburu mengancam Harimau Sumatera!',
 task:'Sita jerat liar, rawat harimau, tanam pohon!',
 story:'Detektif, ada pembalakan liar di rimba ini! Pohon ditebang liar dan pemburu memasang jerat maut. Harimau Sumatera hampir tidak punya rumah lagi. Selamatkan hutan!',
 init:{prod:24,herb:22,pred:2,water:55,trap:55},
 tick(S){S.prod=cl(S.prod-1.6-S.herb*.12);S.trap=cl(S.trap+.8,0,100);
  S.herb=cl(S.herb+1.6-S.pred*.6-(S.prod<12?2:0));
  S.pred=cl(S.pred+(S.herb>12?.25:-.4)-S.trap*.028);
  if(S.trap<20)S.prod=cl(S.prod+1.2);},
 health(S){return Math.round(100*(0.3*c01(S.prod/55)+0.26*c01(1-S.trap/65)+0.22*c01(S.pred/4)+0.22*hCtrl(S)))},
 actions:[
  {id:'jerat',label:'Sita Jerat Liar',role:'Jerat melukai satwa hutan',ic:'net',quota:3,fx:S=>S.trap=cl(S.trap-35,0,100)},
  {id:'pohon',label:'Tanam Pohon Rimba',role:'Kembalikan rumah satwa',ic:'tree',quota:8,fx:S=>S.prod=cl(S.prod+10)},
  {id:'harimau',label:'Rawat & Lepas Harimau',role:'Harimau: pemangsa puncak hutan',ic:'paw',quota:3,fx:S=>{S.pred=cl(S.pred+3);S.trap=cl(S.trap-8,0,100);}}],
 stats:[['trap','Jerat Pemburu','net',-1,'Jerat kawat melukai harimau dan rusa. Sita lebih dulu!'],
  ['prod','Pohon Rimba','tree',1,'Pohon adalah rumah dan makanan penghuni hutan.'],
  ['herb','Rusa','paw',-1,'Rusa tanpa pemangsa memakan habis pohon muda.'],
  ['pred','Harimau','paw',1,'Harimau pemangsa puncak penjaga keseimbangan rimba.']],
 targets:[{l:'Jerat disita sampai 15',c:S=>S.trap<=15},{l:'Hutan hijau kembali (50)',c:S=>S.prod>=50},{l:'Kesehatan hutan 75%',c:S=>S.health>=75}],
 tips:['Jerat pemburu melukai harimau. Sita jeratnya lebih dulu!','Pohon adalah rumah dan makanan rusa. Tanam kembali pohon yang ditebang.','Tanpa harimau, rusa terlalu banyak dan pohon muda habis dimakan.'],
 quiz:{q:'Apa dampak buruk jika pohon rimba ditebang liar terus-menerus?',
  opts:['Kawanan rusa kehilangan rumah dan makanan, tanah menjadi longsor.','Harimau menjadi semakin banyak dan tidak terkendali.','Rumput rimba tumbuh lebih cepat tanpa pohon.'],
  correct:0,explain:'Pohon adalah habitat, sumber oksigen, dan makanan. Penebangan liar merusak fondasi hutan: satwa kehilangan rumah dan tanah tak lagi kuat menahan air sehingga terjadi erosi dan longsor.'},
 chain:['Pohon ditebang liar','Rusa kehilangan rumah','Harimau kehabisan mangsa','Hutan rusak & longsor']},
{id:'sungai-1',biome:'sungai',type:'alam',par:42,
 title:'Misi 5: Air Surut & Gulma Menutup',headline:'Aliran sungai surut dan eceng gondok menutup rapat permukaan!',
 task:'Buka pintu air hulu, angkat gulma liar!',
 story:'Detektif! Aliran sungai surut dan eceng gondok tumbuh lebat menutupi permukaan air. Sinar matahari tak bisa masuk dan ikan-ikan mulai lemas kekurangan oksigen!',
 init:{prod:28,herb:22,pred:3,water:32,gulma:55},
 tick(S){S.gulma=cl(S.gulma+1.6,0,100);S.water=cl(S.water-.7-S.gulma*.035,0,100);
  S.prod=cl(S.prod-S.gulma*.02+(S.water>55?1:0));
  S.herb=cl(S.herb+(S.water>45?1.2:-1.8)-S.pred*.55);
  S.pred=cl(S.pred+(S.herb>13?.3:-.4));},
 health(S){return Math.round(100*(0.28*c01(1-S.gulma/70)+0.3*c01(S.water/70)+0.22*c01(S.herb/32)+0.2*c01(S.pred/4)))},
 actions:[
  {id:'pintu',label:'Buka Pintu Air Hulu',role:'Alirkan kembali air sungai',ic:'drop',quota:6,fx:S=>{S.water=cl(S.water+25,0,100);S.gulma=cl(S.gulma-6,0,100);}},
  {id:'gulma',label:'Angkat Gulma Liar',role:'Bebaskan permukaan sungai',ic:'net',quota:4,fx:S=>S.gulma=cl(S.gulma-24,0,100)},
  {id:'tanam',label:'Tebar Tanaman Air',role:'Tanaman air penghasil oksigen',ic:'sprout',quota:4,fx:S=>{S.prod=cl(S.prod+10);S.water=cl(S.water+6,0,100);}}],
 stats:[['gulma','Eceng Gondok','sprout',-1,'Eceng gondok menutup permukaan: sinar dan udara tak bisa masuk.'],
  ['water','Oksigen Air','wave',1,'Ikan bernapas dengan oksigen yang larut di dalam air.'],
  ['herb','Ikan Kecil','fish',1,'Ikan kecil penghuni utama sungai dan makanan bangau.'],
  ['pred','Bangau','users',1,'Keberadaan bangau menandakan sungai yang sehat.']],
 targets:[{l:'Gulma diangkat sampai 18',c:S=>S.gulma<=18},{l:'Oksigen kembali (60)',c:S=>S.water>=60},{l:'Kesehatan sungai 75%',c:S=>S.health>=75}],
 tips:['Eceng gondok menutup permukaan: sinar dan udara tak bisa masuk!','Ikan bernapas dengan oksigen yang larut di air.','Buka pintu air agar sungai mengalir kembali dan terbersih.'],
 quiz:{q:'Permukaan air tertutup lebat eceng gondok. Mengapa ikan lemas dan mati?',
  opts:['Eceng gondok menghisap semua darah ikan.','Sinar dan udara tertutup rapat, air kekurangan oksigen.','Ikan tidak bisa melihat karena warnanya ungu.'],
  correct:1,explain:'Tumbuhan yang menutup rapat permukaan menghalangi sinar matahari dan pertukaran udara. Oksigen terlarut dalam air berkurang, sehingga ikan kehabisan napas.'},
 chain:['Eceng gondok menutup air','Sinar matahari terhalang','Oksigen air berkurang','Ikan lemas & mati']},
{id:'sungai-2',biome:'sungai',type:'manusia',par:42,
 title:'Misi 6: Racun Limbah & Sampah Plastik',headline:'Limbah detergen pabrik dan sampah mencemari ikan dan bangau!',
 task:'Saring limbah pabrik, tebar benih ikan!',
 story:'Detektif, pabrik membuang limbah detergen ke sungai! Air berbusa, ikan-ikan keracunan, dan sampah plastik mengambang di mana-mana. Bangau juga ikut menderita. Bersihkan sungai ini!',
 init:{prod:30,herb:18,pred:2,water:45,poison:58,trash:45},
 tick(S){S.poison=cl(S.poison+1.8,0,100);S.trash=cl(S.trash+.7,0,100);
  S.water=cl(S.water-S.poison*.012,0,100);
  S.herb=cl(S.herb-S.poison*.028+(S.water>40&&S.poison<18?1.1:0)-S.pred*.5);
  S.pred=cl(S.pred+(S.herb>13?.3:-.5));
  S.prod=cl(S.prod+(S.poison<15?1:-1));},
 health(S){return Math.round(100*(0.26*c01(1-S.poison/75)+0.22*c01(1-S.trash/65)+0.24*c01(S.herb/32)+0.18*c01(S.pred/4)+0.1*c01(S.prod/40)))},
 actions:[
  {id:'saring',label:'Saring Limbah Pabrik',role:'Hentikan racun detergen',ic:'bottle',quota:3,fx:S=>S.poison=cl(S.poison-30,0,100)},
  {id:'sampah',label:'Angkut Sampah Plastik',role:'Plastik membahayakan satwa',ic:'bin',quota:3,fx:S=>S.trash=cl(S.trash-28,0,100)},
  {id:'benih',label:'Tebar Benih Ikan',role:'Kembalikan ikan ke sungai',ic:'fish',quota:4,fx:S=>S.herb=cl(S.herb+8)}],
 stats:[['poison','Limbah Racun','bottle',-1,'Detergen membuat air berbusa dan beracun bagi ikan.'],
  ['trash','Sampah Plastik','bin',-1,'Plastik tidak membusuk bertahun-tahun dan melukai satwa.'],
  ['herb','Ikan','fish',1,'Racun terserap ikan kecil, lalu menumpuk di tubuh bangau.'],
  ['water','Oksigen','wave',1,'Limbah mengurangi oksigen terlarut di dalam air.']],
 targets:[{l:'Racun disaring sampai 15',c:S=>S.poison<=15},{l:'Sampah dibersihkan sampai 15',c:S=>S.trash<=15},{l:'Kesehatan sungai 75%',c:S=>S.health>=75}],
 tips:['Limbah detergen terus mengalir! Saring secepatnya.','Racun terserap ikan kecil, lalu menumpuk di tubuh bangau pemangsanya.','Sampah plastik tidak membusuk: angkat dari sungai.'],
 quiz:{q:'Bagaimana racun detergen pabrik membuat bangau pemangsa ikut mati?',
  opts:['Racun diserap ikan kecil, lalu ikan beracun dimakan bangau.','Bangau mandi di sungai lalu kulitnya mengelupas.','Racun membuat bangau lupa cara terbang.'],
  correct:0,explain:'Racun dari limbah terserap tubuh ikan kecil. Ketika bangau memakan banyak ikan beracun, racun menumpuk di tubuhnya. Inilah aliran racun di dalam rantai makanan.'},
 chain:['Limbah detergen dibuang','Racun diserap ikan kecil','Ikan beracun dimakan','Bangau pemangsa ikut mati']},
{id:'laut-1',biome:'laut',type:'alam',par:45,
 title:'Misi 7: Air Laut Panas & Karang Memutih',headline:'Suhu samudra memanas alami hingga karang memutih!',
 task:'Naungi karang, transplantasi karang, tebar ikan karang!',
 story:'Detektif! Suhu air laut naik akibat gelombang panas alami. Karang-karang mengeluarkan ganggang hidupnya dan berubah putih. Jika karang mati, ribuan ikan kehilangan rumah. Selamatkan terumbu karang!',
 init:{prod:22,herb:18,pred:3,heat:72},
 tick(S){S.heat=cl(S.heat+.55,0,100);
  S.prod=cl(S.prod+(S.heat<40?1.5:S.heat>60?-1.9:.2));
  S.herb=cl(S.herb+(S.prod>24?.9:-1.5)-S.pred*.45);
  S.pred=cl(S.pred+(S.herb>11?.25:-.35)-(S.heat>60?.2:0));},
 health(S){return Math.round(100*(0.32*c01(1-S.heat/80)+0.3*c01(S.prod/50)+0.18*c01(S.herb/25)+0.2*c01(S.pred/5)))},
 actions:[
  {id:'naungan',label:'Pasang Naungan Karang',role:'Naungan melindungi karang dari panas',ic:'sun',quota:4,fx:S=>S.heat=cl(S.heat-26,0,100)},
  {id:'karang',label:'Transplantasi Karang',role:'Menanam kembali karang sehat',ic:'coral',quota:8,fx:S=>S.prod=cl(S.prod+9)},
  {id:'ikan',label:'Tebar Ikan Karang',role:'Kembalikan penghuni terumbu',ic:'fish',quota:4,fx:S=>S.herb=cl(S.herb+8)}],
 stats:[['heat','Suhu Air','sun',-1,'Air terlalu panas membuat karang mengeluarkan ganggang dan memutih.'],
  ['prod','Karang','coral',1,'Karang adalah rumah ribuan ikan kecil di laut.'],
  ['herb','Ikan Karang','fish',1,'Ikan kecil berlindung di celah-celah terumbu karang.'],
  ['pred','Hiu & Penyu','paw',1,'Hiu dan penyu penjaga keseimbangan laut.']],
 targets:[{l:'Suhu air turun sampai 35',c:S=>S.heat<=35},{l:'Terumbu tumbuh (Karang 45)',c:S=>S.prod>=45},{l:'Kesehatan laut 75%',c:S=>S.health>=75}],
 tips:['Karang baru bisa pulih jika airnya sejuk. Naungi dahulu!','Karang yang memutih belum mati — dinginkan airnya agar warnanya kembali.','Ikan karang adalah makanan hiu dan penyu. Tebar kembali penghuninya!'],
 quiz:{q:'Air laut memanas dan karang menjadi putih. Mengapa ikan karang ikut berkurang?',
  opts:['Ikan takut warna putih pada karang.','Karang yang memutih mati, ikan kehilangan rumah dan tempat berlindung.','Ikan ikut memutih agar tidak terlihat hiu.'],
  correct:1,explain:'Ketika suhu terlalu panas, karang mengeluarkan ganggang hidup di tubuhnya dan memutih. Karang adalah rumah ribuan ikan kecil; jika karang mati, ikan kehilangan tempat berlindung dan mudah dimangsa.'},
 chain:['Air laut memanas','Karang memutih','Ikan kehilangan rumah','Hiu kehabisan mangsa']},
{id:'laut-2',biome:'laut',type:'manusia',par:45,
 title:'Misi 8: Bom Ikan & Sampah Laut',headline:'Bom ikan menghancurkan karang dan plastik memenuhi laut!',
 task:'Hentikan bom ikan, bersihkan plastik, tanam karang!',
 story:'Detektif, pemburu menggunakan bom ikan di terumbu karang ini! Karang hancur berkeping-keping dan sampah plastik berserakan. Penyu yang lapar hampir menelan kantong plastik. Selamatkan laut!',
 init:{prod:18,herb:14,pred:2,trash:58,bomb:62},
 tick(S){S.bomb=cl(S.bomb+1.0,0,100);S.trash=cl(S.trash+.7,0,100);
  S.prod=cl(S.prod-S.bomb*.02+(S.bomb<15?1.1:-.4));
  S.herb=cl(S.herb+(S.prod>18?.6:-1.4)-S.pred*.4);
  S.pred=cl(S.pred+(S.herb>10?.2:-.3)-S.trash*.012);},
 health(S){return Math.round(100*(0.3*c01(1-S.bomb/65)+0.27*c01(1-S.trash/55)+0.23*c01(S.prod/40)+0.2*c01(S.herb/20)))},
 actions:[
  {id:'patroli',label:'Patroli Anti Bom Ikan',role:'Hentikan pemburu pembom karang',ic:'net',quota:3,fx:S=>S.bomb=cl(S.bomb-30,0,100)},
  {id:'plastik',label:'Angkut Sampah Plastik',role:'Plastik membahayakan penyu',ic:'bin',quota:3,fx:S=>S.trash=cl(S.trash-26,0,100)},
  {id:'karang',label:'Transplantasi Karang',role:'Tumbuhkan karang pengganti',ic:'coral',quota:7,fx:S=>S.prod=cl(S.prod+9)}],
 stats:[['bomb','Bom Ikan','bomb',-1,'Bom ikan membunuh semua makhluk dan menghancurkan karang.'],
  ['trash','Sampah Plastik','bin',-1,'Kantong plastik mirip ubur-ubur dan bisa tertelan penyu.'],
  ['prod','Karang','coral',1,'Karang butuh puluhan tahun untuk tumbuh kembali.'],
  ['herb','Ikan','fish',1,'Ikan kecil lahir dan berlindung di terumbu karang.']],
 targets:[{l:'Bom ikan dihentikan sampai 15',c:S=>S.bomb<=15},{l:'Plastik dibersihkan sampai 15',c:S=>S.trash<=15},{l:'Kesehatan laut 75%',c:S=>S.health>=75}],
 tips:['Bom ikan terus terjadi! Kirim patroli lebih dulu sebelum menanam karang.','Karang hancur tak bisa pulih sendiri — lakukan transplantasi karang baru.','Penyu mengira plastik adalah ubur-ubur. Angkat plastiknya!'],
 quiz:{q:'Mengapa kantong plastik di laut sangat berbahaya bagi penyu?',
  opts:['Penyu mengira plastik adalah ubur-ubur dan menelannya.','Plastik membuat air laut menjadi asin.','Penyu menggunakan plastik untuk bersarang.'],
  correct:0,explain:'Kantong plastik yang mengambang mirip ubur-ubur, makanan kesukaan penyu. Penyu menelan plastik dan salurannya tersumbat. Plastik tidak membusuk bertahun-tahun di laut.'},
 chain:['Bom ikan meledak','Karang hancur','Ikan kehilangan rumah','Penyu menelan plastik']}];

/* Peristiwa acak — hanya menyentuh variabel yang ADA di semua misi bioma itu */
const EVENTS={
sawah:[{t:'Hujan gerimis turun! Air sawah bertambah.',fx:S=>S.water=cl(S.water+8,0,100)},
 {t:'Kawanan tikus datang dari sawah sebelah!',fx:S=>S.herb=cl(S.herb+4)},
 {t:'Matahari cerah! Padi berfotosintesis lebih cepat.',fx:S=>S.prod=cl(S.prod+3)}],
hutan:[{t:'Hujan rimbas menyegarkan hutan!',fx:S=>S.water=cl(S.water+8,0,100)},
 {t:'Kawanan rusa liar masuk ke rimba!',fx:S=>S.herb=cl(S.herb+4)},
 {t:'Serasah menumpuk dan menjadi humus subur.',fx:S=>S.prod=cl(S.prod+3)}],
sungai:[{t:'Hujan di hulu membuat sungai mengalir deras!',fx:S=>S.water=cl(S.water+8,0,100)},
 {t:'Warga tebar benih ikan ke sungai!',fx:S=>S.herb=cl(S.herb+4)},
 {t:'Tanaman air tumbuh lebat di tepian.',fx:S=>S.prod=cl(S.prod+3)}],
laut:[{t:'Arus sejuk naik dari laut dalam!',fx:S=>S.prod=cl(S.prod+3)},
 {t:'Kawanan ikan baru datang ke terumbu!',fx:S=>S.herb=cl(S.herb+4)},
  {t:'Sampah plastik terbawa arus dari kapal!',fx:S=>{if(S.trash===undefined)S.herb=cl(S.herb-2);else S.trash=cl(S.trash+6,0,100);}}]};
const STATMAX={prod:70,herb:35,pred:10,water:100,poison:100,trash:100,gulma:100,trap:100,heat:100,bomb:100};



/* ================= DATA: BRIDGING DIALOG 8 MISI ================= */
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
