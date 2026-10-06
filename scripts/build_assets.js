const fs = require('fs');
const path = require('path');

// Helper to wrap SVG in data URI
function toDataUri(svg) {
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

const assets = {
  // === BIOME BADGES ===
  badge_sawah: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" fill="#065f46" stroke="#fbbf24" stroke-width="4"/>
    <circle cx="60" cy="60" r="46" fill="#047857"/>
    <!-- Rice sheaf -->
    <path d="M60 92 Q60 50 42 35 Q55 45 60 70 Q65 45 78 35 Q60 50 60 92 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <ellipse cx="44" cy="38" rx="7" ry="12" transform="rotate(-30 44 38)" fill="#fef08a"/>
    <ellipse cx="76" cy="38" rx="7" ry="12" transform="rotate(30 76 38)" fill="#fef08a"/>
    <ellipse cx="38" cy="54" rx="7" ry="12" transform="rotate(-45 38 54)" fill="#fde047"/>
    <ellipse cx="82" cy="54" rx="7" ry="12" transform="rotate(45 82 54)" fill="#fde047"/>
    <text x="60" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#fef08a">SAWAH</text>
  </svg>`,

  badge_laut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" fill="#0c4a6e" stroke="#38bdf8" stroke-width="4"/>
    <circle cx="60" cy="60" r="46" fill="#0284c7"/>
    <!-- Ocean Waves & Coral -->
    <path d="M22 68 Q40 55 60 68 T98 68 L98 96 Q60 102 22 96 Z" fill="#0369a1"/>
    <path d="M26 78 Q42 66 60 78 T94 78" stroke="#bae6fd" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Cute clownfish -->
    <ellipse cx="60" cy="50" rx="16" ry="11" fill="#f97316"/>
    <path d="M72 50 L84 42 L82 58 Z" fill="#ea580c"/>
    <path d="M58 40 C58 40 54 48 58 60 C61 60 63 54 63 40 Z" fill="#ffffff"/>
    <circle cx="50" cy="48" r="3" fill="#ffffff"/>
    <circle cx="49" cy="48" r="1.5" fill="#0f172a"/>
    <text x="60" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#bae6fd">LAUT</text>
  </svg>`,

  badge_hutan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" fill="#14532d" stroke="#4ade80" stroke-width="4"/>
    <circle cx="60" cy="60" r="46" fill="#15803d"/>
    <!-- Lush Forest Tree -->
    <rect x="54" y="62" width="12" height="30" rx="4" fill="#78350f"/>
    <circle cx="60" cy="46" r="24" fill="#22c55e"/>
    <circle cx="44" cy="54" r="16" fill="#16a34a"/>
    <circle cx="76" cy="54" r="16" fill="#16a34a"/>
    <circle cx="60" cy="36" r="16" fill="#86efac"/>
    <text x="60" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#bbf7d0">HUTAN</text>
  </svg>`,

  badge_danau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" fill="#164e63" stroke="#22d3ee" stroke-width="4"/>
    <circle cx="60" cy="60" r="46" fill="#0891b2"/>
    <!-- Lake Mountain & Lotus -->
    <path d="M22 66 L42 42 L62 66 L78 48 L98 68 L98 94 L22 94 Z" fill="#0e7490"/>
    <ellipse cx="60" cy="74" rx="28" ry="12" fill="#06b6d4"/>
    <path d="M60 62 C52 70 54 82 60 84 C66 82 68 70 60 62 Z" fill="#ec4899"/>
    <ellipse cx="50" cy="74" rx="8" ry="5" fill="#f472b6"/>
    <ellipse cx="70" cy="74" rx="8" ry="5" fill="#f472b6"/>
    <text x="60" y="106" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#cffafe">DANAU</text>
  </svg>`,

  // === ORGANISME LAUT ===
  karang: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 10)">
      <!-- Main vibrant coral reef -->
      <path d="M60 110 C40 110 30 90 35 70 C38 55 48 50 48 40 C48 30 38 25 40 15 C42 8 52 8 55 16 C58 26 52 35 60 42 C68 35 62 20 68 12 C72 6 82 8 82 16 C82 28 72 35 76 46 C80 55 92 60 90 75 C88 95 78 110 60 110 Z" fill="#ec4899" stroke="#9d174d" stroke-width="3"/>
      <path d="M25 105 C15 95 18 80 25 72 C32 64 42 75 48 85 Z" fill="#f43f5e" stroke="#881337" stroke-width="2.5"/>
      <path d="M92 105 C102 95 98 78 92 70 C85 62 76 74 72 85 Z" fill="#a855f7" stroke="#581c87" stroke-width="2.5"/>
      <!-- Bioluminescent dots -->
      <circle cx="58" cy="28" r="3" fill="#fbcfe8"/>
      <circle cx="74" cy="24" r="3" fill="#fbcfe8"/>
      <circle cx="60" cy="62" r="4" fill="#fdf2f8"/>
      <circle cx="45" cy="85" r="3" fill="#fce7f3"/>
      <circle cx="75" cy="82" r="3" fill="#f3e8ff"/>
      <!-- Sea anemone tentacles -->
      <path d="M15 110 Q20 90 30 110 Q40 92 50 110" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M70 110 Q80 92 90 110 Q100 90 105 110" stroke="#10b981" stroke-width="4" stroke-linecap="round" fill="none"/>
    </g>
  </svg>`,

  karang_rusak: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 10)">
      <!-- Bleached grey dead coral -->
      <path d="M60 110 C40 110 30 90 35 70 C38 55 48 50 48 40 C48 30 38 25 40 15 C42 8 52 8 55 16 C58 26 52 35 60 42 C68 35 62 20 68 12 C72 6 82 8 82 16 C82 28 72 35 76 46 C80 55 92 60 90 75 C88 95 78 110 60 110 Z" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
      <path d="M25 105 C15 95 18 80 25 72 C32 64 42 75 48 85 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2.5"/>
      <path d="M92 105 C102 95 98 78 92 70 C85 62 76 74 72 85 Z" fill="#64748b" stroke="#334155" stroke-width="2.5"/>
      <!-- Cracks -->
      <path d="M55 45 L62 55 L58 68 L66 80" stroke="#334155" stroke-width="2" fill="none"/>
    </g>
  </svg>`,

  ikan_kecil: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 20)">
      <!-- Clownfish body -->
      <ellipse cx="60" cy="50" rx="36" ry="24" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
      <!-- Tail fin -->
      <path d="M92 50 L114 32 Q110 50 114 68 Z" fill="#ea580c" stroke="#c2410c" stroke-width="2.5"/>
      <!-- White stripes -->
      <path d="M48 28 C48 28 42 42 48 72 C53 72 55 60 55 28 Z" fill="#ffffff" stroke="#c2410c" stroke-width="1.5"/>
      <path d="M70 30 C70 30 65 42 70 70 C74 70 76 60 76 30 Z" fill="#ffffff" stroke="#c2410c" stroke-width="1.5"/>
      <!-- Fins -->
      <path d="M50 27 Q65 14 75 27 Z" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
      <path d="M52 73 Q62 82 72 73 Z" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
      <path d="M44 55 Q56 50 52 64 Z" fill="#fdba74" stroke="#ea580c" stroke-width="2"/>
      <!-- Big Cute Cartoon Eye -->
      <circle cx="34" cy="44" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="32" cy="44" r="4.5" fill="#0f172a"/>
      <circle cx="30" cy="42" r="2" fill="#ffffff"/>
      <!-- Smiling mouth -->
      <path d="M22 52 Q28 58 32 53" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,

  penyu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
    <g transform="translate(10, 10)">
      <!-- Flippers -->
      <path d="M40 35 Q10 20 18 55 Q35 50 45 46 Z" fill="#10b981" stroke="#047857" stroke-width="3"/>
      <path d="M90 35 Q120 20 112 55 Q95 50 85 46 Z" fill="#10b981" stroke="#047857" stroke-width="3"/>
      <path d="M45 95 Q25 118 42 118 Q55 108 55 98 Z" fill="#10b981" stroke="#047857" stroke-width="2.5"/>
      <path d="M85 95 Q105 118 88 118 Q75 108 75 98 Z" fill="#10b981" stroke="#047857" stroke-width="2.5"/>
      <!-- Turtle Shell -->
      <ellipse cx="65" cy="70" rx="34" ry="38" fill="#059669" stroke="#064e3b" stroke-width="3.5"/>
      <!-- Shell Patterns -->
      <polygon points="65,48 78,58 78,74 65,84 52,74 52,58" fill="#34d399" stroke="#064e3b" stroke-width="2"/>
      <line x1="65" y1="48" x2="65" y2="34" stroke="#064e3b" stroke-width="2"/>
      <line x1="78" y1="58" x2="94" y2="52" stroke="#064e3b" stroke-width="2"/>
      <line x1="78" y1="74" x2="96" y2="82" stroke="#064e3b" stroke-width="2"/>
      <line x1="65" y1="84" x2="65" y2="106" stroke="#064e3b" stroke-width="2"/>
      <line x1="52" y1="74" x2="34" y2="82" stroke="#064e3b" stroke-width="2"/>
      <line x1="52" y1="58" x2="36" y2="52" stroke="#064e3b" stroke-width="2"/>
      <!-- Head -->
      <ellipse cx="65" cy="24" rx="14" ry="16" fill="#10b981" stroke="#047857" stroke-width="3"/>
      <circle cx="59" cy="20" r="3.5" fill="#0f172a"/>
      <circle cx="58" cy="19" r="1.5" fill="#ffffff"/>
      <circle cx="71" cy="20" r="3.5" fill="#0f172a"/>
      <circle cx="70" cy="19" r="1.5" fill="#ffffff"/>
      <path d="M62 30 Q65 33 68 30" stroke="#064e3b" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,

  hiu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140">
    <g transform="translate(10, 15)">
      <!-- Dorsal Fin -->
      <path d="M65 42 Q75 10 92 18 Q82 38 78 44 Z" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <!-- Body -->
      <path d="M15 62 Q35 38 75 42 Q115 46 135 62 Q110 82 65 80 Q35 78 15 62 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3.5"/>
      <!-- Underbelly -->
      <path d="M18 64 Q45 80 85 78 Q118 76 130 65 Q95 72 45 68 Z" fill="#f0f9ff"/>
      <!-- Tail -->
      <path d="M130 60 L148 35 Q140 60 148 85 L130 64 Z" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <!-- Side Fin -->
      <path d="M48 68 Q58 92 72 88 Q65 72 58 68 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
      <!-- Gills -->
      <path d="M48 55 Q46 62 48 66 M54 55 Q52 62 54 66 M60 55 Q58 62 60 66" stroke="#0369a1" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Cartoon Eye -->
      <circle cx="30" cy="54" r="5" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="28" cy="54" r="3" fill="#0f172a"/>
      <circle cx="27" cy="53" r="1.2" fill="#ffffff"/>
      <!-- Mouth & Sharp Teeth -->
      <path d="M22 66 Q30 72 38 66" stroke="#0f172a" stroke-width="2.5" fill="none"/>
      <polygon points="26,67 29,71 32,67" fill="#ffffff"/>
      <polygon points="32,67 35,71 38,67" fill="#ffffff"/>
    </g>
  </svg>`,

  sampah_plastik: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <g transform="translate(15, 15)">
      <!-- Plastic Bag -->
      <path d="M25 40 C20 20 40 18 45 32 C50 18 70 20 65 40 C75 50 80 80 65 92 C50 96 35 96 25 90 C15 80 18 50 25 40 Z" fill="#e2e8f0" opacity="0.85" stroke="#94a3b8" stroke-width="3"/>
      <!-- Plastic Bottle -->
      <g transform="rotate(25 65 65)">
        <rect x="52" y="32" width="22" height="48" rx="5" fill="#67e8f9" opacity="0.75" stroke="#0891b2" stroke-width="2.5"/>
        <rect x="58" y="24" width="10" height="8" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <line x1="53" y1="46" x2="73" y2="46" stroke="#0891b2" stroke-width="1.5"/>
        <line x1="53" y1="58" x2="73" y2="58" stroke="#0891b2" stroke-width="1.5"/>
      </g>
      <!-- Warning Skull / Pollution Mark -->
      <circle cx="45" cy="62" r="9" fill="#ef4444"/>
      <text x="45" y="66" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">!</text>
    </g>
  </svg>`,

  pengurai_laut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <g transform="translate(10, 15)">
      <!-- Cute Red Scavenger Crab -->
      <!-- Legs -->
      <path d="M25 55 Q10 45 8 65 M25 65 Q8 65 8 80 M25 75 Q12 85 15 95" stroke="#dc2626" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M85 55 Q100 45 102 65 M85 65 Q102 65 102 80 M85 75 Q98 85 95 95" stroke="#dc2626" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Big Claws -->
      <path d="M30 45 Q15 25 22 15 Q32 25 38 35 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5"/>
      <path d="M80 45 Q95 25 88 15 Q78 25 72 35 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5"/>
      <!-- Body -->
      <ellipse cx="55" cy="65" rx="30" ry="22" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <!-- Stalk Eyes -->
      <rect x="42" y="38" width="6" height="12" fill="#ef4444"/>
      <circle cx="45" cy="38" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="45" cy="38" r="3" fill="#0f172a"/>
      <rect x="62" y="38" width="6" height="12" fill="#ef4444"/>
      <circle cx="65" cy="38" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="65" cy="38" r="3" fill="#0f172a"/>
      <!-- Smile -->
      <path d="M47 70 Q55 76 63 70" stroke="#7f1d1d" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,

  bangkai_laut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g transform="translate(10, 15)">
      <!-- Fish Skeleton -->
      <path d="M20 45 L90 45" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <!-- Head Bone -->
      <polygon points="20,45 35,30 35,60" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="28" cy="42" r="3" fill="#0f172a"/>
      <!-- Ribs -->
      <line x1="45" y1="28" x2="45" y2="62" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      <line x1="58" y1="30" x2="58" y2="60" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      <line x1="71" y1="32" x2="71" y2="58" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      <!-- Tail Bone -->
      <polygon points="90,45 102,32 98,45 102,58" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2.5"/>
    </g>
  </svg>`,

  // === ORGANISME HUTAN TROPIS ===
  pohon_hutan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 160">
    <g transform="translate(10, 10)">
      <!-- Tree Trunk with buttress roots -->
      <path d="M55 90 L50 140 Q40 145 30 148 L100 148 Q90 145 80 140 L75 90 Z" fill="#78350f" stroke="#451a03" stroke-width="3.5"/>
      <!-- Giant Tiered Canopy -->
      <ellipse cx="65" cy="88" rx="46" ry="24" fill="#15803d" stroke="#14532d" stroke-width="3"/>
      <ellipse cx="65" cy="62" rx="40" ry="22" fill="#16a34a" stroke="#14532d" stroke-width="3"/>
      <ellipse cx="65" cy="38" rx="32" ry="20" fill="#22c55e" stroke="#15803d" stroke-width="3"/>
      <!-- Vine / Liana -->
      <path d="M45 40 Q35 75 55 95 Q65 115 55 140" stroke="#84cc16" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Tropical Red Berries -->
      <circle cx="50" cy="55" r="4.5" fill="#ef4444"/>
      <circle cx="78" cy="48" r="4.5" fill="#ef4444"/>
      <circle cx="85" cy="75" r="4.5" fill="#ef4444"/>
      <circle cx="42" cy="80" r="4.5" fill="#ef4444"/>
    </g>
  </svg>`,

  pohon_tumbang: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 140">
    <g transform="translate(10, 20)">
      <!-- Tree stump with chainsaw marks -->
      <path d="M45 70 L40 110 L90 110 L85 70 Z" fill="#78350f" stroke="#451a03" stroke-width="3"/>
      <ellipse cx="65" cy="70" rx="20" ry="8" fill="#d97706" stroke="#451a03" stroke-width="2"/>
      <ellipse cx="65" cy="70" rx="14" ry="5" fill="#fef3c7"/>
      <!-- Fallen log -->
      <g transform="rotate(15 80 85)">
        <rect x="65" y="75" width="65" height="24" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2.5"/>
        <ellipse cx="130" cy="87" rx="6" ry="12" fill="#d97706" stroke="#451a03" stroke-width="2"/>
      </g>
      <!-- Smoke/Deforestation sign -->
      <circle cx="105" cy="42" r="12" fill="#ef4444"/>
      <text x="105" y="48" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#ffffff">🪓</text>
    </g>
  </svg>`,

  rusa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
    <g transform="translate(10, 10)">
      <!-- Legs -->
      <line x1="45" y1="90" x2="40" y2="135" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
      <line x1="58" y1="90" x2="55" y2="135" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
      <line x1="85" y1="88" x2="88" y2="135" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
      <line x1="98" y1="88" x2="102" y2="135" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
      <!-- Body -->
      <ellipse cx="72" cy="78" rx="34" ry="22" fill="#b45309" stroke="#78350f" stroke-width="3"/>
      <!-- White Spots on Deer -->
      <circle cx="65" cy="70" r="3" fill="#fef3c7"/>
      <circle cx="78" cy="72" r="3" fill="#fef3c7"/>
      <circle cx="88" cy="76" r="3" fill="#fef3c7"/>
      <circle cx="70" cy="82" r="3" fill="#fef3c7"/>
      <!-- Neck & Head -->
      <path d="M42 75 L30 45 Q36 30 50 35 L54 65 Z" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
      <ellipse cx="32" cy="38" rx="14" ry="10" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
      <!-- Cute Big Eye -->
      <circle cx="28" cy="36" r="4.5" fill="#0f172a"/>
      <circle cx="26" cy="34" r="1.5" fill="#ffffff"/>
      <!-- Antlers -->
      <path d="M38 28 L42 12 M40 18 L48 16" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <!-- Cute Ears -->
      <ellipse cx="46" cy="32" rx="8" ry="4" transform="rotate(30 46 32)" fill="#d97706"/>
    </g>
  </svg>`,

  macan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140">
    <g transform="translate(10, 15)">
      <!-- Tail -->
      <path d="M125 70 Q145 65 142 45" stroke="#d97706" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="45" y1="80" x2="42" y2="115" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
      <line x1="60" y1="80" x2="58" y2="115" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
      <line x1="95" y1="78" x2="96" y2="115" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
      <line x1="110" y1="78" x2="114" y2="115" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
      <!-- Body -->
      <ellipse cx="80" cy="72" rx="38" ry="20" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <!-- Spots -->
      <circle cx="68" cy="65" r="4" fill="#78350f"/>
      <circle cx="82" cy="68" r="4" fill="#78350f"/>
      <circle cx="95" cy="64" r="4" fill="#78350f"/>
      <circle cx="75" cy="78" r="4" fill="#78350f"/>
      <circle cx="90" cy="76" r="4" fill="#78350f"/>
      <!-- Head -->
      <circle cx="40" cy="52" r="18" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <!-- Ears -->
      <polygon points="28,38 34,26 40,36" fill="#b45309"/>
      <polygon points="42,36 48,26 54,38" fill="#b45309"/>
      <!-- Sharp Fierce Eyes -->
      <ellipse cx="32" cy="50" rx="3" ry="4" fill="#fef08a"/>
      <circle cx="32" cy="50" r="2" fill="#0f172a"/>
      <ellipse cx="44" cy="50" rx="3" ry="4" fill="#fef08a"/>
      <circle cx="44" cy="50" r="2" fill="#0f172a"/>
      <!-- Muzzle -->
      <ellipse cx="38" cy="60" rx="8" ry="5" fill="#fef3c7"/>
      <polygon points="36,58 40,58 38,61" fill="#78350f"/>
    </g>
  </svg>`,

  harimau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 150">
    <g transform="translate(10, 10)">
      <!-- Sumatran Tiger Apex Predator -->
      <!-- Tail -->
      <path d="M125 78 Q152 75 146 48" stroke="#ea580c" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M125 78 Q152 75 146 48" stroke="#1c1917" stroke-width="7" stroke-dasharray="8 8" fill="none" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="48" y1="88" x2="45" y2="128" stroke="#ea580c" stroke-width="7" stroke-linecap="round"/>
      <line x1="64" y1="88" x2="62" y2="128" stroke="#ea580c" stroke-width="7" stroke-linecap="round"/>
      <line x1="98" y1="86" x2="100" y2="128" stroke="#ea580c" stroke-width="7" stroke-linecap="round"/>
      <line x1="114" y1="86" x2="118" y2="128" stroke="#ea580c" stroke-width="7" stroke-linecap="round"/>
      <!-- Body -->
      <ellipse cx="85" cy="78" rx="42" ry="24" fill="#ea580c" stroke="#9a3412" stroke-width="3.5"/>
      <!-- Stripes on Body -->
      <path d="M72 60 L75 75 M85 58 L88 76 M98 60 L100 75 M78 82 L80 96 M92 82 L94 96" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Underbelly -->
      <ellipse cx="85" cy="94" rx="30" ry="8" fill="#fef3c7"/>
      <!-- Head -->
      <circle cx="42" cy="54" r="22" fill="#ea580c" stroke="#9a3412" stroke-width="3.5"/>
      <!-- Tiger Ears -->
      <circle cx="26" cy="36" r="7" fill="#ea580c" stroke="#1c1917" stroke-width="2.5"/>
      <circle cx="26" cy="36" r="3.5" fill="#fef3c7"/>
      <circle cx="58" cy="36" r="7" fill="#ea580c" stroke="#1c1917" stroke-width="2.5"/>
      <circle cx="58" cy="36" r="3.5" fill="#fef3c7"/>
      <!-- Head Stripes -->
      <path d="M42 34 L42 44 M34 40 L38 46 M50 40 L46 46" stroke="#1c1917" stroke-width="3" stroke-linecap="round"/>
      <!-- Muzzle -->
      <ellipse cx="42" cy="64" rx="11" ry="8" fill="#ffffff" stroke="#1c1917" stroke-width="1.5"/>
      <polygon points="39,60 45,60 42,64" fill="#1c1917"/>
      <path d="M37 66 Q42 70 47 66" stroke="#1c1917" stroke-width="2" fill="none"/>
      <!-- Glowing Eyes -->
      <circle cx="34" cy="50" r="4.5" fill="#fde047" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="34" cy="50" r="2" fill="#0f172a"/>
      <circle cx="50" cy="50" r="4.5" fill="#fde047" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="2" fill="#0f172a"/>
    </g>
  </svg>`,

  jamur_hutan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <g transform="translate(10, 15)">
      <!-- Stem -->
      <path d="M48 55 L45 105 Q55 108 65 105 L62 55 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>
      <!-- Red Mushroom Cap -->
      <path d="M20 58 Q55 15 90 58 Q55 68 20 58 Z" fill="#ef4444" stroke="#991b1b" stroke-width="3.5"/>
      <!-- White Spots -->
      <circle cx="40" cy="42" r="5" fill="#ffffff"/>
      <circle cx="55" cy="32" r="6" fill="#ffffff"/>
      <circle cx="70" cy="42" r="5" fill="#ffffff"/>
      <circle cx="55" cy="52" r="4" fill="#ffffff"/>
      <circle cx="30" cy="52" r="3.5" fill="#ffffff"/>
      <circle cx="80" cy="52" r="3.5" fill="#ffffff"/>
      <!-- Spores Sparkle -->
      <text x="88" y="28" font-size="18">✨</text>
    </g>
  </svg>`,

  kayu_tebang: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 120">
    <g transform="translate(15, 15)">
      <!-- Stack of cut logs -->
      <rect x="10" y="55" width="80" height="22" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2.5"/>
      <ellipse cx="90" cy="66" rx="6" ry="11" fill="#d97706" stroke="#451a03" stroke-width="2"/>
      <rect x="15" y="32" width="75" height="22" rx="4" fill="#92400e" stroke="#451a03" stroke-width="2.5"/>
      <ellipse cx="90" cy="43" rx="6" ry="11" fill="#f59e0b" stroke="#451a03" stroke-width="2"/>
      <!-- Warning Badge -->
      <circle cx="30" cy="45" r="10" fill="#ef4444"/>
      <text x="30" y="50" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#ffffff">⚠️</text>
    </g>
  </svg>`,

  bangkai_hutan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g transform="translate(10, 15)">
      <circle cx="50" cy="50" r="20" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/>
      <circle cx="43" cy="48" r="4" fill="#0f172a"/>
      <circle cx="57" cy="48" r="4" fill="#0f172a"/>
      <!-- Crossed Bones -->
      <line x1="25" y1="25" x2="75" y2="75" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
      <line x1="75" y1="25" x2="25" y2="75" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
      <!-- Fallen Autumn Leaves -->
      <ellipse cx="78" cy="68" rx="8" ry="4" transform="rotate(25 78 68)" fill="#d97706"/>
    </g>
  </svg>`,

  // === ORGANISME DANAU ===
  teratai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 15)">
      <!-- Giant Lily Pad -->
      <ellipse cx="60" cy="78" rx="48" ry="24" fill="#15803d" stroke="#14532d" stroke-width="3"/>
      <!-- Lily pad notch -->
      <polygon points="60,78 95,65 105,85" fill="#0284c7"/>
      <!-- Pink Lotus Petals -->
      <path d="M60 40 C45 55 48 72 60 76 C72 72 75 55 60 40 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
      <path d="M42 50 C32 60 38 72 50 75 C56 68 52 56 42 50 Z" fill="#f472b6" stroke="#be185d" stroke-width="2"/>
      <path d="M78 50 C88 60 82 72 70 75 C64 68 68 56 78 50 Z" fill="#f472b6" stroke="#be185d" stroke-width="2"/>
      <!-- Lotus Center -->
      <circle cx="60" cy="68" r="6" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
    </g>
  </svg>`,

  teratai_layu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 15)">
      <ellipse cx="60" cy="78" rx="48" ry="24" fill="#713f12" stroke="#451a03" stroke-width="3"/>
      <path d="M60 40 C45 55 48 72 60 76 C72 72 75 55 60 40 Z" fill="#a16207" stroke="#451a03" stroke-width="2"/>
      <circle cx="60" cy="68" r="6" fill="#854d0e"/>
      <path d="M35 70 L45 85 M75 72 L85 82" stroke="#451a03" stroke-width="2"/>
    </g>
  </svg>`,

  keong: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <g transform="translate(10, 15)">
      <!-- Foot / Body -->
      <path d="M25 80 Q65 72 95 80 Q105 85 95 90 Q45 92 20 86 Q15 82 25 80 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
      <!-- Eyestalks -->
      <line x1="24" y1="80" x2="16" y2="65" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="16" cy="64" r="3.5" fill="#0f172a"/>
      <circle cx="15" cy="63" r="1.2" fill="#ffffff"/>
      <line x1="30" y1="80" x2="26" y2="65" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="26" cy="64" r="3.5" fill="#0f172a"/>
      <circle cx="25" cy="63" r="1.2" fill="#ffffff"/>
      <!-- Golden Spiral Shell -->
      <circle cx="62" cy="58" r="28" fill="#d97706" stroke="#78350f" stroke-width="3"/>
      <circle cx="64" cy="58" r="18" fill="#f59e0b" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="66" cy="58" r="9" fill="#fef08a" stroke="#78350f" stroke-width="2"/>
    </g>
  </svg>`,

  ikan_gabus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 130">
    <g transform="translate(10, 15)">
      <!-- Torpedo body -->
      <path d="M20 50 Q60 32 105 45 Q125 50 130 52 L140 38 Q136 52 140 66 L130 54 Q105 68 60 65 Q35 62 20 50 Z" fill="#3f6212" stroke="#1a2e05" stroke-width="3"/>
      <!-- Yellow fins -->
      <path d="M55 35 Q75 28 95 38 Z" fill="#eab308" stroke="#854d0e" stroke-width="2"/>
      <path d="M60 66 Q80 72 95 65 Z" fill="#eab308" stroke="#854d0e" stroke-width="2"/>
      <!-- Scales pattern -->
      <circle cx="65" cy="48" r="3" fill="#65a30d"/>
      <circle cx="80" cy="50" r="3" fill="#65a30d"/>
      <circle cx="95" cy="52" r="3" fill="#65a30d"/>
      <!-- Eye -->
      <circle cx="32" cy="46" r="5" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="30" cy="46" r="3" fill="#0f172a"/>
      <circle cx="29" cy="45" r="1" fill="#ffffff"/>
    </g>
  </svg>`,

  bangau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 160">
    <g transform="translate(10, 10)">
      <!-- Long Stilt Legs -->
      <line x1="68" y1="95" x2="65" y2="145" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      <line x1="82" y1="95" x2="84" y2="145" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      <!-- White Feather Body -->
      <ellipse cx="75" cy="78" rx="28" ry="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
      <!-- Black wingtips -->
      <path d="M85 75 Q105 80 108 92 Q95 90 85 85 Z" fill="#1e293b"/>
      <!-- S-Shaped Graceful Neck -->
      <path d="M55 75 Q42 55 48 35 Q52 24 62 25" stroke="#ffffff" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M55 75 Q42 55 48 35 Q52 24 62 25" stroke="#cbd5e1" stroke-width="2" fill="none"/>
      <!-- Head & Long Yellow Bill -->
      <circle cx="62" cy="25" r="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="68,23 105,28 68,31" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
      <circle cx="60" cy="24" r="2.5" fill="#0f172a"/>
    </g>
  </svg>`,

  eceng_gondok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
    <g transform="translate(10, 15)">
      <!-- Swollen Bulbous Stems -->
      <ellipse cx="60" cy="85" rx="36" ry="18" fill="#15803d" stroke="#14532d" stroke-width="3"/>
      <circle cx="40" cy="78" r="14" fill="#16a34a" stroke="#14532d" stroke-width="2.5"/>
      <circle cx="80" cy="78" r="14" fill="#16a34a" stroke="#14532d" stroke-width="2.5"/>
      <!-- Round Glossy Leaves -->
      <ellipse cx="32" cy="60" rx="16" ry="12" fill="#22c55e" stroke="#15803d" stroke-width="2.5"/>
      <ellipse cx="88" cy="60" rx="16" ry="12" fill="#22c55e" stroke="#15803d" stroke-width="2.5"/>
      <!-- Purple-Blue Flower Spike -->
      <path d="M60 62 L60 30" stroke="#15803d" stroke-width="4"/>
      <ellipse cx="60" cy="32" rx="12" ry="16" fill="#a855f7" stroke="#6b21a8" stroke-width="2"/>
      <circle cx="60" cy="32" r="4" fill="#fde047"/>
    </g>
  </svg>`,

  pengurai_danau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g transform="translate(10, 15)">
      <!-- Aquatic worm & decomposer microbes -->
      <path d="M25 75 Q45 55 60 75 T95 65" stroke="#f43f5e" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="28" cy="74" r="2" fill="#0f172a"/>
      <!-- Microbial Bubbles -->
      <circle cx="45" cy="45" r="8" fill="#38bdf8" opacity="0.6"/>
      <circle cx="65" cy="35" r="12" fill="#38bdf8" opacity="0.6"/>
      <circle cx="85" cy="42" r="7" fill="#38bdf8" opacity="0.6"/>
      <text x="65" y="40" text-anchor="middle" font-size="14">✨</text>
    </g>
  </svg>`,

  bangkai_danau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g transform="translate(10, 15)">
      <path d="M25 50 L85 50" stroke="#64748b" stroke-width="4"/>
      <polygon points="25,50 38,38 38,62" fill="#94a3b8"/>
      <line x1="48" y1="36" x2="48" y2="64" stroke="#64748b" stroke-width="3"/>
      <line x1="62" y1="36" x2="62" y2="64" stroke="#64748b" stroke-width="3"/>
      <polygon points="85,50 96,38 96,62" fill="#94a3b8"/>
    </g>
  </svg>`,

  // === UI ICONS KRISIS & AKSI ===
  icon_bom_laut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#450a0a" stroke="#ef4444" stroke-width="3"/>
    <rect x="36" y="32" width="28" height="42" rx="4" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
    <text x="50" y="58" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#fef08a">TNT</text>
    <path d="M50 32 Q54 18 64 22" stroke="#f59e0b" stroke-width="3" fill="none"/>
    <text x="66" y="24" font-size="16">💥</text>
  </svg>`,

  icon_plastik_laut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#082f49" stroke="#38bdf8" stroke-width="3"/>
    <rect x="38" y="34" width="24" height="40" rx="4" fill="#67e8f9" stroke="#0284c7" stroke-width="2" opacity="0.8"/>
    <text x="50" y="58" text-anchor="middle" font-size="22">🚯</text>
  </svg>`,

  icon_deforestasi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#3b0764" stroke="#c084fc" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="44">🪓</text>
  </svg>`,

  icon_perburuan_hutan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#422006" stroke="#f59e0b" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="42">🎯</text>
  </svg>`,

  icon_limbah_danau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#818cf8" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="42">🧪</text>
  </svg>`,

  icon_eutrofikasi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#064e3b" stroke="#34d399" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="42">🌿</text>
  </svg>`,

  icon_reboisasi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#064e3b" stroke="#10b981" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="42">🌱</text>
  </svg>`,

  icon_pembersihan_danau: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#0e7490" stroke="#22d3ee" stroke-width="3"/>
    <text x="50" y="62" text-anchor="middle" font-size="42">🧹</text>
  </svg>`
};

console.log('Writing vector files and updating assets...');

// 1. Write individual SVG files for fallback
const orgDir = path.join(__dirname, '..', 'WEBSITE', 'assets', 'organisms');
const uiDir = path.join(__dirname, '..', 'WEBSITE', 'assets', 'ui');
const badgeDir = path.join(__dirname, '..', 'WEBSITE', 'assets', 'ui', 'badges');

if (!fs.existsSync(orgDir)) fs.mkdirSync(orgDir, { recursive: true });
if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });
if (!fs.existsSync(badgeDir)) fs.mkdirSync(badgeDir, { recursive: true });

for (const [key, svg] of Object.entries(assets)) {
  let targetPath;
  if (key.startsWith('badge_')) {
    targetPath = path.join(badgeDir, `${key}.png`); // Phaser can treat SVG data or fallback
    fs.writeFileSync(path.join(badgeDir, `${key}.svg`), svg);
  } else if (key.startsWith('icon_')) {
    targetPath = path.join(uiDir, `${key}.png`);
    fs.writeFileSync(path.join(uiDir, `${key}.svg`), svg);
  } else {
    targetPath = path.join(orgDir, `${key}.png`);
    fs.writeFileSync(path.join(orgDir, `${key}.svg`), svg);
  }
}

// 2. Append/Inject into assets-data.js so that window.ASSETS_DATA contains all
const assetsDataPath = path.join(__dirname, '..', 'WEBSITE', 'js', 'assets-data.js');
let code = fs.readFileSync(assetsDataPath, 'utf8');

// Build data uri entries
const newEntries = [];
for (const [key, svg] of Object.entries(assets)) {
  newEntries.push(`  "${key}": "${toDataUri(svg)}"`);
}

// Insert before closing bracket of window.ASSETS_DATA = { ... };
const lastBraceIdx = code.lastIndexOf('};');
if (lastBraceIdx !== -1) {
  const prefix = code.slice(0, lastBraceIdx).trimEnd();
  const comma = prefix.endsWith(',') ? '' : ',';
  const updated = `${prefix}${comma}\n${newEntries.join(',\n')}\n};`;
  fs.writeFileSync(assetsDataPath, updated, 'utf8');
  console.log(`Successfully updated assets-data.js with ${Object.keys(assets).length} new assets!`);
} else {
  console.error('Could not find closing brace in assets-data.js');
}
