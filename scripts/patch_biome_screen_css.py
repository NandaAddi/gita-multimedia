import re

with open('TES GITA BARU 1/css/game.css', 'r', encoding='utf-8') as f:
    css = f.read()

biome_css_replacement = """/* ============================================================
   BIOME SELECTION SCREEN (STAGE SHOWCASE CAROUSEL SLIDER)
   ============================================================ */

#biome-stage {
  position: absolute;
  left: 140px;
  right: 140px;
  top: 114px;
  height: 640px;
  padding: 34px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(6, 54, 42, 0.96) 0%, rgba(2, 34, 26, 0.98) 100%);
  border-radius: 36px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), inset 0 2px 0 rgba(255, 255, 255, 0.12);
  touch-action: pan-y;
  user-select: none;
}

/* SLIDING BIOME WRAPPER */
.biome-inner-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 46px;
  align-items: center;
  transition: opacity 0.25s ease;
}

.biome-inner-wrap.slide-from-right {
  animation: heroSlideRight 0.32s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
}

.biome-inner-wrap.slide-from-left {
  animation: heroSlideLeft 0.32s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
}

/* LEFT COLUMN: CINEMATIC DIORAMA PREVIEW */
.biome-left {
  width: 680px;
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.biome-preview-frame {
  position: relative;
  width: 680px;
  height: 440px;
  border-radius: 26px;
  overflow: hidden;
  background: #03211a;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.biome-preview-frame canvas {
  width: 680px;
  height: 440px;
  display: block;
}

.biome-star-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(2, 34, 26, 0.92);
  border-radius: 999px;
  padding: 8px 24px;
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 24px;
  color: #fef08a;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  z-index: 3;
}

.biome-name-plate {
  background: rgba(2, 44, 34, 0.95);
  padding: 10px 44px;
  border-radius: 999px;
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 38px;
  color: #fef08a;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.4);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  text-align: center;
  white-space: nowrap;
}

/* RIGHT COLUMN: ECOSYSTEM DOSSIER & TROPHIC CHAIN */
.biome-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.bio-motto {
  font-family: var(--font-fun);
  font-style: italic;
  font-size: 27px;
  color: #7fd4e8;
  line-height: 1.35;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.bio-dossier {
  background: rgba(2, 44, 34, 0.85);
  border-radius: 24px;
  padding: 22px 30px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.bio-doss-title {
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 28px;
  color: #fef08a;
  margin-bottom: 6px;
}

.bio-doss-desc {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 25px;
  line-height: 1.6;
  color: #e6fcf0;
}

/* HORIZONTAL TROPHIC CHAIN */
.bio-chain-box {
  background: rgba(2, 32, 24, 0.9);
  border-radius: 20px;
  padding: 16px 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.bio-chain-head {
  font-family: var(--font-fun);
  font-size: 24px;
  color: #7fd4e8;
  margin-bottom: 10px;
}

.bio-chain-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: nowrap;
}

.bio-chain-row .cp {
  background: rgba(14, 122, 90, 0.95);
  border-radius: 14px;
  padding: 10px 16px;
  font-family: var(--font-fun);
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.bio-chain-row .ca {
  color: #f5a30b;
  font-size: 26px;
  font-weight: 900;
  flex: none;
}

/* CTA BUTTON */
.bio-cta-wrap {
  margin-top: 4px;
}

.btn-biome-enter {
  height: 82px;
  width: 100%;
  border-radius: 22px;
  border: none;
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 27px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 60%, #d97706 100%);
  box-shadow: 0 6px 0 #92400e, 0 14px 28px rgba(245, 158, 11, 0.4);
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.08s, box-shadow 0.08s, filter 0.15s;
}

.btn-biome-enter:hover {
  background: linear-gradient(180deg, #fde047 0%, #fbbf24 60%, #d97706 100%);
  filter: brightness(1.05);
}

.btn-biome-enter:active {
  transform: translateY(5px);
  box-shadow: 0 1px 0 #92400e, 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn-biome-locked {
  height: 82px;
  width: 100%;
  border-radius: 22px;
  border: none;
  font-family: var(--font-fun);
  font-weight: 600;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: not-allowed;
}

/* BOTTOM CONTROL BAR 4 BIOMAS */
.biome-footer-bar {
  position: absolute;
  left: 140px;
  right: 140px;
  bottom: 22px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
}

.biome-dock-pod {
  display: flex;
  gap: 16px;
  width: 100%;
  background: rgba(2, 28, 20, 0.88);
  padding: 8px 14px;
  border-radius: 28px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.biome-tile {
  flex: 1;
  height: 82px;
  border-radius: 20px;
  background: rgba(6, 60, 48, 0.65);
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.16s cubic-bezier(0.2, 0.8, 0.25, 1), box-shadow 0.16s, background 0.2s;
}

.bt-header {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.bt-num {
  font-family: var(--font-fun);
  font-size: 24px;
  font-weight: 700;
  color: rgba(254, 240, 138, 0.8);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 999px;
  padding: 1px 8px;
  line-height: 1.1;
}

.bt-name {
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 24px;
  color: #e2f5ec;
  line-height: 1.15;
}

.bt-status {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 24px;
  color: #a7f3d0;
  line-height: 1.15;
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.biome-tile:hover {
  transform: translateY(-3px);
  background: rgba(10, 80, 62, 0.85);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
}

/* ZERO OUTLINE KAWAT — CHUNKY SOLID BEVEL */
.biome-tile.on {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.4), 0 16px 28px rgba(0, 0, 0, 0.55);
  border: none;
}

.biome-tile.tile-sawah.on {
  background: linear-gradient(180deg, #10b981 0%, #047857 100%);
}

.biome-tile.tile-hutan.on {
  background: linear-gradient(180deg, #15803d 0%, #14532d 100%);
}

.biome-tile.tile-sungai.on {
  background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
}

.biome-tile.tile-laut.on {
  background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
}

.biome-tile.on .bt-num {
  background: rgba(0, 0, 0, 0.35);
  color: #ffffff;
}

.biome-tile.on .bt-name {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.45);
}

.biome-tile.on .bt-status {
  color: #fef08a;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}

.biome-tile.locked {
  filter: grayscale(0.6) brightness(0.75);
}
"""

start_marker = "/* BIOME SELECTION SCREEN */"
end_marker = "/* MISSION MENU SCREEN */"

idx_start = css.find(start_marker)
idx_end = css.find(end_marker)

if idx_start != -1 and idx_end != -1:
    new_css = css[:idx_start] + biome_css_replacement + "\n" + css[idx_end:]
    with open('TES GITA BARU 1/css/game.css', 'w', encoding='utf-8') as f:
        f.write(new_css)
    print("Patched biome screen CSS successfully!")
else:
    print("Markers not found:", idx_start, idx_end)
