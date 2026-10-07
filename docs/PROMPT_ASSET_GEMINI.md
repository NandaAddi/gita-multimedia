# DOKUMENTASI PROMPT GENERATOR ASET VISUAL (GOOGLE GEMINI / IMAGEN 3)
## Game Edukasi: "Eco-Explorer: Penjaga Keseimbangan Sawah"
* **Pengembang / Peneliti:** Gito (Teknologi Pendidikan)
* **Gaya Seni:** 16-Bit Retro RPG Pixel Art (Vibrant, Clean Edges, High Contrast)
* **Format Target:** Sprite 1:1 (PNG Transparan) & Panorama 16:9 (1920 $\times$ 1080)
* **Perangkat Sasaran:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch)

---

## 📌 PANDUAN PENGGUNAAN PROMPT

1. **Bahasa Prompt:** Seluruh teks prompt disusun dalam **Bahasa Inggris** karena model *generative image* Google Gemini (Imagen 3) memiliki akurasi pemahaman *pixel art* dan pencocokan gaya retro tertinggi dalam bahasa Inggris.
2. **Latar Belakang Bersih (*Isolated Background*):** Seluruh sprite karakter dan organisme diinstruksikan dengan latar belakang `isolated on solid pure white background` agar Anda dapat menghapus latar belakangnya dengan cepat (misal via [remove.bg](https://www.remove.bg)) menjadi berkas PNG transparan.
3. **Format Rasio (*Aspect Ratio*):**
   * **Sprite Karakter, Organisme, & Ikon:** Gunakan rasio aspek **1:1 (Square)**.
   * **Background Panorama Sawah:** Gunakan rasio aspek **16:9 (Landscape/Widescreen)**.
4. **Penyimpanan Berkas:** Simpan aset yang sudah transparan ke folder proyek `d:\SKRIPSI GITO\WEBSITE\assets\` sesuai nama berkas baku yang tertera di bawah.

---

## 1. KARAKTER MASKOT: GITA SI DETEKTIF CILIK & SAHABAT SAWAH

> **Spesifikasi Desain Karakter (Berdasarkan Lembar Karakter Gita):**
> * **Karakter:** Anak perempuan SD usia 10 tahun, ceria, hangat, ramah, dan pintar memandu teman-temannya.
> * **Hijab:** Bergo / Jilbab hitam arang (`#2E2E2E`) dengan lengkungan lembut yang membingkai wajah bulat imut.
> * **Pakaian:** Jaket/Kardigan warna *Dark Navy Blue* (`#2E5A59` / `#1E3A5F`) di atas kaos dalam warna Merah cerah (`#DC2626`), celana panjang hitam gelap (`#2E2E2E`), dan sepatu hitam.
> * **Wajah:** Mata anime hitam besar berbinar, pipi merona merah muda (*blushing pink cheeks* `#E6A6A6`), kulit cerah hangat (`#F7E3C6`), dan senyum manis yang menenangkan.

---

### A. FORMAT 16-BIT RETRO PIXEL ART (UNTUK SPRITE GAME ENGINE PHASER 3)

#### 1.1 Gita Pose Berdiri / Siaga (`gita_idle.png`)
* **Lokasi Simpan:** `assets/characters/gita_idle.png`
* **Rasio:** 1:1 (Square)
* **Prompt Google Gemini:**
```text
16-bit retro RPG pixel art sprite of a cute 10-year-old Indonesian Muslim schoolgirl detective named Gita, chibi proportions, wearing a neat black hijab framing her cute round face, dark navy blue open jacket over a vibrant red inner shirt, dark charcoal pants and shoes, big expressive anime eyes with glossy highlights, sweet smiling expression with rosy pink blushing cheeks, standing pose with one hand gently waving, clean crisp pixel edges, vibrant colors, isolated on solid pure white background, retro video game character asset, centered, square 1:1 aspect ratio, no anti-aliasing blur.
```

#### 1.2 Gita Pose Bicara / Dialog Sawah (`gita_talk.png`)
* **Lokasi Simpan:** `assets/characters/gita_talk.png`
* **Rasio:** 1:1 (Square)
* **Prompt Google Gemini:**
```text
16-bit retro RPG pixel art character bust portrait of Gita the kid detective, cute chibi Muslim girl wearing a black hijab, dark navy blue jacket over a red inner shirt, enthusiastic talking expression with open mouth and bright happy smile, rosy pink blushing cheeks, big sparkling anime eyes, one hand raised gesturing excitedly as she explains nature balance, dialogue box avatar sprite, isolated on solid pure white background, clean pixel lines, square 1:1 aspect ratio.
```

#### 1.3 Gita Pose Berpikir / Analisis Kasus (`gita_think.png`)
* **Lokasi Simpan:** `assets/characters/gita_think.png`
* **Rasio:** 1:1 (Square)
* **Prompt Google Gemini:**
```text
16-bit retro RPG pixel art sprite of chibi Muslim girl detective Gita, wearing a black hijab, dark navy jacket and red shirt, thinking pose with one hand touching her chin and thoughtful clever expression, head tilted slightly, small sparkly lightbulb idea nearby, rosy blushing cheeks, isolated on solid pure white background, retro game asset, square 1:1 aspect ratio.
```

#### 1.4 Gita Pose Selebrasi Bintang / Hore (`gita_cheer.png`)
* **Lokasi Simpan:** `assets/characters/gita_cheer.png`
* **Rasio:** 1:1 (Square)
* **Prompt Google Gemini:**
```text
16-bit retro RPG pixel art sprite of chibi Muslim girl Gita celebrating victory, wearing a black hijab, dark navy jacket over red shirt, both hands raised high in the air in a cheerful victory pose, eyes closed with joyful smiling expression (^_^) and blushing rosy cheeks, joyful sparkles around her, isolated on solid pure white background, retro achievement sprite, square 1:1 aspect ratio.
```

#### 1.5 Gita Pose Jempol / Apresiasi (`gita_thumbsup.png`)
* **Lokasi Simpan:** `assets/characters/gita_thumbsup.png`
* **Rasio:** 1:1 (Square)
* **Prompt Google Gemini:**
```text
16-bit retro RPG pixel art sprite of cute chibi Muslim girl Gita, wearing a black hijab, navy jacket and red shirt, giving a cheerful thumbs-up gesture with a cute winking eye, radiant friendly smile, rosy cheeks, video game companion avatar, isolated on solid pure white background, clean pixel edges, square 1:1 aspect ratio.
```

---

### B. FORMAT 2D CHIBI VECTOR ART (PERSIS SEPERTI CHARACTER SHEET ASLI)
*(Digunakan untuk Sampul Skripsi, Lembar LKPD Siswa, Modul Ajar Guru, dan Banner Promosi)*

#### 1.6 Gita Full-Body Chibi Ilustrasi Standar
* **Prompt Google Gemini:**
```text
Clean 2D digital anime chibi illustration character design of Gita, a cheerful and caring 10-year-old Indonesian elementary school girl, wearing a neat black hijab softly framing her round friendly face, a dark navy blue cardigan jacket with cuffs over a vibrant red inner t-shirt, dark charcoal gray trousers and simple dark shoes. Big dark brown expressive manga eyes with glossy reflections, round soft rosy blushing cheeks, sweet warm smile, cute 2.5-head chibi proportions, soft clean outline, warm comfort pastel aesthetic, full body standing pose front view, isolated on solid pure white background, high resolution digital sticker style, no background.
```

#### 1.7 Lembar Variasi Ekspresi Gita (Character Expression Sheet)
* **Prompt Google Gemini:**
```text
Character expression sheet of a cute chibi Indonesian girl named Gita wearing a black hijab, navy blue jacket and red shirt, showing 6 distinct emotion avatars in a 3x2 neat grid: 1. Happy smiling, 2. Excited with starry eyes, 3. Calm and peaceful with closed eyes, 4. Surprised with open round mouth, 5. Thinking with finger on chin, 6. Cheerful winking with a thumbs up. All with rosy blushing cheeks and big expressive anime eyes, clean vector art style, flat pastel colors, isolated on solid pure white background.
```

---

### C. FORMAT AVATAR DIALOG BOX (2D PNG TRANSPARAN CLOSE-UP BUST PORTRAIT)
*(Digunakan untuk Avatar Dialog Box Misi Penyelidikan / Bridge Dialog di Layar Game)*

#### 1.8.1 Avatar Dialog: Pose Bicara / Penjelasan Misi (`gita_dialog_talk.png`)
* **Lokasi Simpan:** `assets/characters/gita_dialog_talk.png`
* **Gaya:** Clean 2D Chibi Vector Art, Soft Round Shapes, 2.5-Head Proportions
* **Palet:** Hijab `#282828`, Jaket `#2E5A59`, Kaos `#E04F5F`, Kulit `#F7E3C6`, Pipi `#E6A6A6`
* **Rasio:** 1:1 (Square)
* **Prompt Google Flow / ImageFX / Imagen:**
```text
Clean 2D digital anime chibi vector art illustration of a cute young Muslim girl character, head and shoulders bust portrait, wearing a neat smooth charcoal black hijab (#282828) framing her round friendly face, open dark navy blue cardigan jacket (#2E5A59) over a vibrant coral red inner shirt (#E04F5F). Big glossy dark cartoon eyes with white light reflections, soft rosy pink blushing oval cheeks (#E6A6A6) on warm peach skin (#F7E3C6), cheerful open-mouth talking expression (Excited expression from character sheet), friendly and supportive companion, simple clean bold outlines, soft gentle shading, minimal details for UI readability, centered dialogue avatar, isolated on solid pure white background, no text, square 1:1 aspect ratio.
```

#### 1.8.2 Avatar Dialog: Pose Khawatir / Tanggap Krisis (`gita_dialog_worried.png`)
* **Lokasi Simpan:** `assets/characters/gita_dialog_worried.png`
* **Konteks Game:** Langkah 1 Dialog "Krisis Air: Tanah Retak & Padi Layu / Waduh teman-teman!"
* **Gaya:** Clean 2D Chibi Vector Art, Soft Round Shapes, 2.5-Head Proportions
* **Palet:** Hijab `#282828`, Jaket `#2E5A59`, Kaos `#E04F5F`, Kulit `#F7E3C6`, Pipi `#E6A6A6`
* **Rasio:** 1:1 (Square)
* **Prompt Google Flow / ImageFX / Imagen:**
```text
Clean 2D digital anime chibi vector art illustration of a cute young Muslim girl character, head and shoulders bust portrait, wearing a smooth charcoal black hijab (#282828) neatly framing her round face, open dark navy blue cardigan jacket (#2E5A59) over a coral red inner shirt (#E04F5F). Worried and concerned expression matching character sheet, cute furrowed eyebrows, anxious small mouth ("Waduh teman-teman!"), caring empathetic glossy dark eyes, soft rosy pink blushing cheeks (#E6A6A6), warm peach skin tone (#F7E3C6), soft round shapes, clean clear outlines, game dialogue box avatar icon, centered, isolated on solid pure white background, high quality, square 1:1 aspect ratio.
```

#### 1.8.3 Avatar Dialog: Pose Ramah / Senyum Manis (`gita_dialog_happy.png`)
* **Lokasi Simpan:** `assets/characters/gita_dialog_happy.png`
* **Gaya:** Clean 2D Chibi Vector Art, Soft Round Shapes, 2.5-Head Proportions
* **Palet:** Hijab `#282828`, Jaket `#2E5A59`, Kaos `#E04F5F`, Kulit `#F7E3C6`, Pipi `#E6A6A6`
* **Rasio:** 1:1 (Square)
* **Prompt Google Flow / ImageFX / Imagen:**
```text
Clean 2D digital anime chibi vector art illustration of a cute young Muslim girl character, head and shoulders bust portrait, wearing a neat charcoal black hijab (#282828) framing her round cute face, open dark navy blue cardigan jacket (#2E5A59) over a coral red inner shirt (#E04F5F). Sweet gentle smiling expression (Happy expression from character sheet), big warm dark sparkling eyes, round rosy pink blushing cheeks (#E6A6A6), warm peach skin (#F7E3C6), simple clean vector lines, soft aesthetic, centered avatar sticker, isolated on solid pure white background, square 1:1 aspect ratio.
```

---

### D. FORMAT ANIMASI LOOPING IMAGE SEQUENCE (UNTUK PLAYER GitaSeq DI DIALOG BOX)
*(Dijalankan via engine `GitaSeq.play()`: 60 frame @12fps format WebP RGBA loop di dalam `#bridge-gita-box` — dioptimasi 94% dari 24.5 MB PNG ke ~1.47 MB WebP)*

#### 1.9.1 Prompt Motion Image-to-Video: Looping Bicara & Memandu (*Talking Loop*)
* **Input Image:** Avatar PNG statis Gita hasil prompt 1.8.1
* **Spesifikasi Produksi Aktif:** Folder `talking_loop/` berisi 60 frame WebP (`Comp 1_00000.webp` ... `Comp 1_00059.webp`), 300x300 RGBA, 12fps (durasi loop 5,0 detik, total ~650 KB). Cadangan PNG asli disimpan di `talking_loop_backup_png/`.
* **Prompt Google VideoFX / Veo / Runway / Kling:**
```text
Seamless looping 2D animated chibi illustration, stationary bust portrait of the character. The cute young girl is talking enthusiastically and explaining, gentle opening and closing mouth movements, friendly speech expressions, soft natural eye blinking twice, subtle rhythmic breathing motion of shoulders, slight cute head tilt and nodding. Locked camera, perfectly static solid white background, high consistency with source image, no camera movement, no perspective shift, zero morphing, perfectly seamless beginning and end frame loop.
```

#### 1.9.2 Prompt Motion Image-to-Video: Looping Khawatir / Krisis (*Worried Loop*)
* **Input Image:** Avatar PNG statis Gita hasil prompt 1.8.2
* **Konteks Game:** Dialog Langkah 1 Krisis Alam Sawah
* **Spesifikasi Produksi Aktif:** Folder `worried_loop/` berisi 60 frame WebP (`Comp 1_00000.webp` ... `Comp 1_00059.webp`), 300x300 RGBA, 12fps (durasi loop 5,0 detik, total ~886 KB). Cadangan PNG asli disimpan di `worried_loop_backup_png/`.
* **Prompt Google VideoFX / Veo / Runway / Kling:**
```text
Seamless looping 2D animated chibi illustration, stationary close-up bust portrait of the character. Mildly worried and caring expression, gentle subtle breathing motion, soft empathetic eye blinking, small anxious lip movement murmuring concerned words, gentle head sway with worried empathy, hands gesturing gently near upper chest. Locked static camera, pure solid white background, zero camera drift, no background warping, perfectly seamless loop from start to finish.
```

#### 1.9.3 Prompt Text-to-Video Looping (Tanpa Gambar Awal)
* **Prompt Google VideoFX / Veo:**
```text
Seamless looping 2D flat vector anime animation, cute 10-year-old Indonesian Muslim girl chibi character bust portrait, wearing charcoal black hijab (#282828) and open dark navy blue jacket (#2E5A59) over red shirt (#E04F5F). Gentle breathing idle motion, soft natural blinking, sweet smiling mouth gently speaking and pausing, locked static camera, completely static pure white background, perfectly seamless loopable 4-second video, high frame rate, crisp 2D line art, no 3D rendering.
```

---

## 2. ORGANISME & KOMPONEN RANTAI MAKANAN SAWAH

### 2.1 Tanaman Padi Subur (`padi_subur.png`)
* **Lokasi Simpan:** `assets/organisms/padi_subur.png`
* **Peran:** Produsen Pangan Sehat (Kondisi Air Cukup & Kaya Hara)
* **Prompt:**
```text
16-bit pixel art sprite of a healthy ripe rice paddy stalk (padi sawah), rich emerald green leaves with heavy golden-yellow grains bending gracefully, lush and vibrant agricultural crop, retro game asset style inspired by Stardew Valley, clean crisp pixel edges, isolated on solid pure white background, centered, full plant view, no soil box, square 1:1 aspect ratio.
```

### 2.2 Tanaman Padi Kering / Layu (`padi_kering.png`)
* **Lokasi Simpan:** `assets/organisms/padi_kering.png`
* **Peran:** Produsen Rusak (Kondisi Kemarau atau Diserang Hama)
* **Prompt:**
```text
16-bit pixel art sprite of a withered dying rice stalk in drought conditions, dried yellow-brown cracked leaves, drooping empty grains, fragile and arid appearance, retro RPG game asset, isolated on solid pure white background, clean silhouette, centered, square 1:1 aspect ratio.
```

### 2.3 Tikus Sawah / Hama Padi (`tikus.png`)
* **Lokasi Simpan:** `assets/organisms/tikus.png`
* **Peran:** Konsumen Primer / Hama Pemakan Padi
* **Prompt:**
```text
16-bit pixel art sprite of a small agile field mouse (tikus sawah), brownish-gray fur, cute pink nose and ears, long curved tail, side view in a scurrying or crouching pose, retro SNES RPG video game sprite, clean pixel lines, vibrant, isolated on solid pure white background, centered, square 1:1 aspect ratio.
```

### 2.4 Katak Sawah / Pemangsa Serangga (`katak.png`)
* **Lokasi Simpan:** `assets/organisms/katak.png`
* **Peran:** Konsumen Sekunder / Pemangsa Alami Hama Serangga
* **Prompt:**
```text
16-bit pixel art sprite of a friendly green tree frog (katak sawah), vibrant lime green skin with subtle yellow spots, big shiny black eyes, crouched in a ready-to-leap pose on small webbed feet, cute retro video game creature asset, isolated on solid pure white background, centered, crisp pixel art, square 1:1 aspect ratio.
```

### 2.5 Ular Sawah / Pengendali Tikus (`ular.png`)
* **Lokasi Simpan:** `assets/organisms/ular.png`
* **Peran:** Konsumen Sekunder / Sahabat Petani Pemangsa Tikus
* **Prompt:**
```text
16-bit retro RPG pixel art sprite of a harmless green garden snake (ular sawah), emerald green scales with a light yellow underside, friendly non-threatening design, coiled or gentle S-curve crawling pose, small cute face with tongue flicking out, video game asset, isolated on solid pure white background, clean pixel contour, square 1:1 aspect ratio.
```

### 2.6 Burung Elang / Pemangsa Puncak (`elang.png`)
* **Lokasi Simpan:** `assets/organisms/elang.png`
* **Peran:** Konsumen Tersier / Pemangsa Puncak Ekosistem
* **Prompt:**
```text
16-bit pixel art sprite of a majestic Javanese hawk-eagle (burung elang sawah), gliding in flight with wide wingspan, rich brown and white feathered wings, sharp yellow beak and keen eyes, top-down or slight angle view for top-scrolling RPG sky, retro 16-bit SNES game asset, clean outlines, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 2.7 Koloni Jamur Pengurai (`jamur.png`)
* **Lokasi Simpan:** `assets/organisms/jamur.png`
* **Peran:** Dekomposer Organik Penghasil Pupuk Hara Alami
* **Prompt:**
```text
16-bit pixel art sprite of a magical nature decomposer mushroom cluster (jamur pengurai tanah), 3-4 glowing mushrooms with purple and golden caps, tiny sparkling spores floating around them representing bio-fertilizer humus nutrients, cute retro fantasy RPG aesthetic, isolated on solid pure white background, centered, square 1:1 aspect ratio.
```

### 2.8 Sisa Jerami / Bahan Organik (`bangkai.png`)
* **Lokasi Simpan:** `assets/organisms/bangkai.png`
* **Peran:** Materi Organik yang Diurai Menjadi Pupuk Humus
* **Prompt:**
```text
16-bit pixel art sprite of a bundle of dry agricultural rice straw and decomposed organic foliage pile, earthy golden-tan and olive hues, agricultural compost pile ready to be recycled by mushrooms, retro RPG environment prop, clean pixel edges, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 2.9 Pohon Meranti Raksasa / Pohon Rimba Tropis (`pohon_rimba.png`)
* **Lokasi Simpan:** `assets/organisms/pohon_rimba.png`
* **Peran:** Produsen Utama & Habitat Satwa Hutan Hujan Tropis (Dipterocarpaceae)
* **Prompt:**
```text
High quality 2D game asset illustration of a majestic ancient Meranti rainforest canopy tree (Shorea Dipterocarpaceae) from Indonesian tropical rainforest, sturdy tall textured wooden bark trunk with prominent flared buttress roots (akar banir) at the ground, moss patches at root base, organic sprawling thick branches visible between lush layered cloud-shaped emerald canopy lobes, subtle hanging tropical lianas and vines, sunlit golden-green leaf highlights on upper crown, deep emerald green shade underneath, crisp transparent background PNG asset, isolated on pure white background, centered, full tree view from roots to emergent crown, square 1:1 aspect ratio.
```

---

## 3. LATAR BELAKANG SAWAH PANORAMA 16:9 (`background_sawah.png`)

* **Lokasi Simpan:** `assets/environment/background_sawah.png`
* **Format:** 16:9 Widescreen (1920 $\times$ 1080 Native)
* **Prompt:**
```text
16-bit pixel art panoramic background landscape of lush Indonesian terraced rice fields (sawah terasering in Malang), clear bright blue sky with fluffy pixel clouds, distant rolling green mountains, vibrant layered green paddy fields with narrow mud dykes (pematang sawah), a clean irrigation stream flowing through, warm sunny daylight, vibrant saturated nostalgic colors inspired by classic 16-bit JRPG like Chrono Trigger, 16:9 widescreen landscape wallpaper, seamless atmospheric retro video game scenery, high quality pixel art, no characters.
```

---

## 4. IKON KRISIS MISI & TANTANGAN SAWAH

### 4.1 Ikon Misi 1: Serbuan Hama Tikus (`icon_perburuan.png`)
* **Lokasi Simpan:** `assets/ui/icon_perburuan.png`
* **Prompt:**
```text
16-bit pixel art circular icon badge representing rodent infestation crisis in agriculture, featuring a menacing rat silhouette behind a red warning caution triangle, golden circular border, retro game UI icon, vibrant contrast, isolated on solid pure black background, square 1:1 aspect ratio.
```

### 4.2 Ikon Misi 2: Bahaya Racun Kimia Semprotan (`icon_pestisida.png`)
* **Lokasi Simpan:** `assets/ui/icon_pestisida.png`
* **Prompt:**
```text
16-bit pixel art circular icon badge representing toxic chemical pesticide danger, featuring an agricultural spray bottle with purple skull vapor fumes and a wilting leaf, hazardous alert colors, retro game UI emblem, golden border, isolated on solid pure black background, square 1:1 aspect ratio.
```

### 4.3 Ikon Misi 3: Sawah Kekeringan Retak (`icon_kemarau.png`)
* **Lokasi Simpan:** `assets/ui/icon_kemarau.png`
* **Prompt:**
```text
16-bit pixel art circular icon badge representing severe agricultural drought, featuring cracked dry earth with a scorching bright orange sun and a vanishing dried water droplet, retro game UI badge, golden frame, isolated on solid pure black background, square 1:1 aspect ratio.
```

### 4.4 Ikon Misi 4: Sahabat Pengurai Jamur Spora (`icon_jamur_spora.png`)
* **Lokasi Simpan:** `assets/ui/icon_jamur_spora.png`
* **Prompt:**
```text
16-bit pixel art circular icon badge representing soil restoration and decomposers, featuring a glowing mushroom emitting sparkling green fertilizer particles and healthy soil, golden circular frame, retro RPG emblem, isolated on solid pure black background, square 1:1 aspect ratio.
```

---

## 5. LENCANA 5 KELOMPOK SISWA KELAS 5A

### 5.1 Lencana Tim Elang (`badge_elang.png`)
* **Lokasi Simpan:** `assets/ui/badges/badge_elang.png`
* **Prompt:**
```text
16-bit pixel art heroic shield crest badge for 'Eagle Team', vibrant ruby red heraldic shield with golden filigree border, fierce eagle head profile emblem in the center, polished retro video game achievement medal, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 5.2 Lencana Tim Ular (`badge_ular.png`)
* **Lokasi Simpan:** `assets/ui/badges/badge_ular.png`
* **Prompt:**
```text
16-bit pixel art heroic shield crest badge for 'Snake Team', deep teal and emerald green shield with silver and golden border, sleek coiled snake emblem in the center, retro video game medal, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 5.3 Lencana Tim Katak (`badge_katak.png`)
* **Lokasi Simpan:** `assets/ui/badges/badge_katak.png`
* **Prompt:**
```text
16-bit pixel art heroic shield crest badge for 'Frog Team', bright vibrant forest green shield with golden decorative trim, leaping frog emblem in the center, friendly nature guardian medal, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 5.4 Lencana Tim Padi (`badge_padi.png`)
* **Lokasi Simpan:** `assets/ui/badges/badge_padi.png`
* **Prompt:**
```text
16-bit pixel art heroic shield crest badge for 'Rice Paddy Team', warm golden amber shield with ornate wheat grain border, golden ripe rice stalk emblem in the center, fertile harvest emblem, isolated on solid pure white background, square 1:1 aspect ratio.
```

### 5.5 Lencana Tim Jamur (`badge_jamur.png`)
* **Lokasi Simpan:** `assets/ui/badges/badge_jamur.png`
* **Prompt:**
```text
16-bit pixel art heroic shield crest badge for 'Mushroom Decomposer Team', royal amethyst purple shield with glowing golden trim, glowing magical mushroom cap emblem with sparkles in the center, isolated on solid pure white background, square 1:1 aspect ratio.
```

---

## 6. ELEMEN ANTARMUKA UI RETRO

### 6.1 Kotak Dialog Gita (`dialog_box.png`)
* **Lokasi Simpan:** `assets/ui/dialog_box.png`
* **Prompt:**
```text
16-bit pixel art retro video game dialogue box frame, 9-slice UI panel, dark translucent emerald green container background with an ornate double-lined golden wooden carved border, subtle corner filigree ornaments, clean pixel edges, empty interior ready for text overlay, rectangular 4:1 aspect ratio, isolated on solid pure black background.
```

### 6.2 Plakat Papan Judul Utama Emas & Daun (`title_billboard.png`)
* **Lokasi Simpan:** `assets/ui/title_billboard.png`
* **Format:** 16:9 Transparent PNG (1295 $\times$ 641 px)
* **Prompt:**
```text
High quality 2D game UI title banner graphic, isolated on solid pure magenta #FF00FF background. A horizontal dark forest green rounded rectangular plaque with a shiny polished golden metallic border, decorated with lush green leaves on the corners and edges. Inside at the top is a small rounded pill with text "MULTIMEDIA SIMULASI SAINS IPAS - LAYAR SENTUH IFP KELAS V". In the center is a pixel art golden rice stalk (padi) icon next to large bold 3D golden yellow pixel block text "ECO-EXPLORER" with warm orange bevel. Below the title is a carved wooden plank banner with green leaves reading "PENJAGA KESEIMBANGAN SAWAH" in bold white capital letters. Crisp vector game asset, perfectly centered.
```

### 6.3 Tiga Kartu Aksi Interaktif Homescreen (`card_mulai_bermain.png`, `card_cara_bermain.png`, `card_tentang_panduan.png`)
* **Lokasi Simpan:** `assets/ui/card_*.png`
* **Format:** 3 Kartu Rounded Berkilau (401 $\times$ 526 px per kartu)
* **Prompt:**
```text
High quality 2D game UI set of three interactive menu cards, arranged side by side horizontally in a row, isolated on solid pure magenta #FF00FF background. Card 1 (Left): Dark emerald green rounded rectangular card with bright green border. Inside top is a green circle with white border containing a white play triangle. Text below says "MULAI BERMAIN" in bold white font, then "Pilih Kelompok & Jalankan Misi Sawah" in light green, and ">>>" green arrow at bottom. Card 2 (Center): Deep navy blue rounded rectangular card with bright blue border. Inside top is an illustrated open book icon with pages. Text below says "CARA BERMAIN" in bold white font, then "Pelajari Peran Tim & Aturan Sawah" in light blue, and ">>>" blue arrow at bottom. Card 3 (Right): Deep royal purple rounded rectangular card with bright purple border. Inside top is a purple circle with white border containing white lowercase "i" info icon. Text below says "TENTANG & PANDUAN" in bold white font, then "Profil Skripsi, Kurikulum, & Petunjuk Guru" in light purple, and ">>>" purple arrow at bottom.
```

---

## 🚀 LANGKAH PENYEMATAN ASET KE DALAM GAME

Setelah Anda mengunduh dan menghapus latar belakang berkas-berkas di atas:

1. Letakkan berkas PNG ke dalam folder yang sesuai di:
   `d:\SKRIPSI GITO\WEBSITE\assets\`
2. Jalankan skrip penyemat otomatis Python:
   ```bash
   python embed_assets.py
   ```
3. Skrip akan secara otomatis mengonversi seluruh gambar menjadi berkas `js/assets-data.js` (Base64 Data URIs).
4. Hasilnya, game Anda akan **100% bebas dari galat CORS**, dapat dibuka langsung lewat peramban bawaan IFP sekolah tanpa server internet, dan memuat aset secara instan!
