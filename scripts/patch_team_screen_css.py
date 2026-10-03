import re

with open('TES GITA BARU 1/css/game.css', 'r', encoding='utf-8') as f:
    css = f.read()

team_css_replacement = """/* ============================================================
   TEAM SELECTION SCREEN (ARCADE 3D HERO PODIUM & SMOOTH CAROUSEL)
   ============================================================ */

.stage {
  position: absolute;
  left: 140px;
  right: 140px;
  top: 114px;
  height: 640px;
  padding: 36px 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(6, 54, 42, 0.96) 0%, rgba(2, 34, 26, 0.98) 100%);
  border-radius: 36px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), inset 0 2px 0 rgba(255, 255, 255, 0.12);
  touch-action: pan-y;
  user-select: none;
}

/* ARCADE 3D NAV BUTTONS */
.arcade-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 78px;
  height: 114px;
  border-radius: 24px;
  background: #f5a30b;
  border: none;
  color: #3a2c07;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 8px 0 #b45309, 0 16px 28px rgba(0, 0, 0, 0.45);
  transition: transform 0.08s, box-shadow 0.08s, background 0.15s;
}

.arcade-arrow:hover {
  background: #fbbf24;
}

.arcade-arrow:active {
  transform: translateY(-50%) translateY(6px);
  box-shadow: 0 2px 0 #b45309, 0 6px 14px rgba(0, 0, 0, 0.35);
}

.arcade-arrow.prev {
  left: -39px;
}

.arcade-arrow.next {
  right: -39px;
}

/* SLIDING HERO WRAPPER */
.hero-inner-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 52px;
  align-items: center;
  transition: opacity 0.25s ease;
}

.hero-inner-wrap.slide-from-right {
  animation: heroSlideRight 0.32s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
}

.hero-inner-wrap.slide-from-left {
  animation: heroSlideLeft 0.32s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
}

@keyframes heroSlideRight {
  from {
    opacity: 0;
    transform: translateX(64px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes heroSlideLeft {
  from {
    opacity: 0;
    transform: translateX(-64px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* HERO LEFT (PODIUM & MASCOT) */
.hero-left {
  width: 460px;
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.pedestal-stage {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.podium-aura {
  position: absolute;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  filter: blur(34px);
  opacity: 0.65;
  transition: background 0.4s ease;
  animation: auraPulse 3.5s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes auraPulse {
  0% { transform: scale(0.92); opacity: 0.5; }
  100% { transform: scale(1.08); opacity: 0.75; }
}

.pedestal-stage canvas {
  position: relative;
  z-index: 2;
  animation: heroBob 3.6s ease-in-out infinite;
}

@keyframes heroBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-name-plate {
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

/* HERO RIGHT (DOSSIER & PERKS) */
.hero-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.hero-motto {
  font-family: var(--font-fun);
  font-style: italic;
  font-size: 27px;
  color: #7fd4e8;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  line-height: 1.35;
}

.hero-dossier {
  background: rgba(2, 44, 34, 0.85);
  border-radius: 24px;
  padding: 24px 32px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.doss-role {
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 30px;
  color: #fef08a;
  margin-bottom: 8px;
}

.doss-desc {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 25px;
  line-height: 1.6;
  color: #e6fcf0;
}

.hero-spec {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(58, 44, 7, 0.92);
  border-radius: 20px;
  padding: 14px 28px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(245, 163, 11, 0.3);
  animation: specBreathe 2.4s infinite ease-in-out;
}

@keyframes specBreathe {
  0%, 100% { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(245, 163, 11, 0.3); }
  50% { box-shadow: 0 8px 24px rgba(245, 163, 11, 0.4), inset 0 1px 0 rgba(245, 163, 11, 0.5); }
}

.spec-ic {
  color: #f5a30b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.spec-txt {
  font-family: var(--font-fun);
  font-weight: 600;
  font-size: 25px;
  color: #fef08a;
  line-height: 1.4;
}

/* DYNAMIC TEAM AURA THEMES */
#team-stage.theme-padi .podium-aura {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.55) 0%, rgba(16, 185, 129, 0) 70%);
}
#team-stage.theme-ular .podium-aura {
  background: radial-gradient(circle, rgba(244, 63, 94, 0.55) 0%, rgba(244, 63, 94, 0) 70%);
}
#team-stage.theme-jamur .podium-aura {
  background: radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, rgba(245, 158, 11, 0) 70%);
}
#team-stage.theme-elang .podium-aura {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.55) 0%, rgba(59, 130, 246, 0) 70%);
}
#team-stage.theme-katak .podium-aura {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.55) 0%, rgba(6, 182, 212, 0) 70%);
}

/* BOTTOM CONTROL BAR */
.team-footer-bar {
  position: absolute;
  left: 140px;
  right: 140px;
  bottom: 24px;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  z-index: 8;
}

.dock-row {
  display: flex;
  gap: 16px;
  flex: 1;
}

.dock-tile {
  flex: 1;
  height: 86px;
  border-radius: 22px;
  background: rgba(2, 44, 34, 0.95);
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.14s, background 0.2s;
}

.dock-tile .dt-name {
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 24px;
  color: #cfe9dd;
  line-height: 1.15;
  text-align: center;
}

.dock-tile .dt-role {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 24px;
  color: rgba(207, 233, 221, 0.8);
  line-height: 1.15;
  margin-top: 3px;
  text-align: center;
}

.dock-tile:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.45);
}

.dock-tile.on {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55), 0 0 0 3px #f5a30b;
  background: #064e3b;
}

.dock-tile.on .dt-name {
  color: #fef08a;
}

.dock-tile.on .dt-role {
  color: #ffffff;
}

.btn-hero-pick {
  height: 86px;
  padding: 0 42px;
  font-family: var(--font-fun);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.5px;
  border-radius: 22px;
  flex: none;
  box-shadow: 0 6px 0 #b45309, 0 14px 28px rgba(245, 163, 11, 0.4);
  animation: pickPulse 2.4s infinite ease-in-out;
}

@keyframes pickPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 6px 0 #b45309, 0 14px 28px rgba(245, 163, 11, 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 6px 0 #b45309, 0 18px 36px rgba(245, 163, 11, 0.6);
  }
}
"""

# Find start of /* TEAM SELECTION SCREEN */ to /* BIOME SELECTION SCREEN */
start_marker = "/* TEAM SELECTION SCREEN */"
end_marker = "/* BIOME SELECTION SCREEN */"

idx_start = css.find(start_marker)
idx_end = css.find(end_marker)

if idx_start != -1 and idx_end != -1:
    new_css = css[:idx_start] + team_css_replacement + "\n" + css[idx_end:]
    with open('TES GITA BARU 1/css/game.css', 'w', encoding='utf-8') as f:
        f.write(new_css)
    print("Patched team screen CSS successfully!")
else:
    print("Markers not found:", idx_start, idx_end)
