import os

css_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "TES GITA BARU 1", "css", "game.css"))

how_teacher_css = """
/* ============================================================
   ECO-EXPLORER — FULL PAGE SCREENS: CARA BERMAIN & PANDUAN GURU
   Visual Bento Grid & Cockpit Dashboard (Standar IFP >= 24px)
   ============================================================ */

/* CARA BERMAIN (#scr-how) */
.how-screen-wrap {
  position: absolute;
  inset: 0;
  width: 1920px;
  height: 1080px;
  padding: 24px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at 50% 25%, #084c3b 0%, #032b21 65%, #011a14 100%);
  z-index: 5;
}

.how-header-bar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-radius: 24px;
  background: rgba(3, 44, 34, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  flex: none;
}

.how-back-btn {
  height: 58px;
  font-size: 26px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-fun);
  font-weight: 700;
  border-radius: 18px;
}

.how-header-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.how-title-text {
  font-family: var(--font-fun);
  font-size: 34px;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 1px;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.5);
}

.how-title-sub {
  font-size: 24px;
  color: #a7f3d0;
  font-family: var(--font-body);
}

.how-header-actions {
  display: flex;
  align-items: center;
}

#how-snd {
  width: 58px;
  height: 58px;
  border-radius: 18px;
}

.how-gita-banner {
  height: 116px;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 10px 28px;
  border-radius: 24px;
  background: rgba(2, 40, 30, 0.85);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  margin-top: 14px;
  flex: none;
}

.how-gita-avatar {
  flex: none;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
}

.how-gita-bubble {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.how-gita-name {
  display: inline-block;
  align-self: flex-start;
  background: #f5a30b;
  color: #2a1f05;
  font-family: var(--font-fun);
  font-size: 24px;
  font-weight: 800;
  padding: 3px 18px;
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.how-gita-msg {
  font-size: 25px;
  line-height: 1.45;
  color: #eafff3;
  font-family: var(--font-body);
}

.how-gita-msg b {
  color: #fef08a;
  font-weight: 800;
}

.how-bento-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 22px;
  margin: 18px 0;
  min-height: 570px;
}

.how-bento-card {
  border-radius: 24px;
  padding: 22px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(145deg, rgba(6, 68, 52, 0.92) 0%, rgba(2, 38, 29, 0.96) 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.18s, box-shadow 0.18s;
}

.bento-badge {
  display: inline-block;
  align-self: flex-start;
  background: rgba(245, 163, 11, 0.2);
  color: #fef08a;
  border-radius: 999px;
  font-family: var(--font-fun);
  font-size: 24px;
  font-weight: 700;
  padding: 4px 18px;
  margin-bottom: 6px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.bento-title {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-fun);
  font-size: 28px;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.bento-ic {
  color: #38bdf8;
  display: flex;
  align-items: center;
}

.bento-desc {
  font-size: 24px;
  line-height: 1.5;
  color: #e6f7ef;
  margin: 8px 0 12px;
  font-family: var(--font-body);
}

.bento-desc b {
  color: #fef08a;
}

.bento-chips-row,
.bento-zones-row,
.bento-strategy-bar,
.bento-stars-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: auto;
}

.bento-chip,
.zone-pill,
.strat-step,
.star-chip {
  font-size: 24px;
  font-family: var(--font-fun);
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.chip-padi { background: rgba(16, 185, 129, 0.25); color: #86efac; }
.chip-ular { background: rgba(239, 68, 68, 0.25); color: #fca5a5; }
.chip-jamur { background: rgba(245, 158, 11, 0.25); color: #fde68a; }
.chip-elang { background: rgba(59, 130, 246, 0.25); color: #93c5fd; }
.chip-katak { background: rgba(20, 184, 166, 0.25); color: #99f6e4; }

.zone-danger { background: rgba(239, 68, 68, 0.3); color: #fca5a5; }
.zone-warn { background: rgba(245, 158, 11, 0.3); color: #fde68a; }
.zone-healthy { background: rgba(16, 185, 129, 0.3); color: #86efac; }

.strat-step { background: rgba(56, 189, 248, 0.25); color: #bae6fd; }
.strat-ar { font-size: 26px; color: #f5a30b; font-weight: 900; }

.star-chip { background: rgba(245, 163, 11, 0.22); color: #fef08a; }

.how-footer-bar {
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin-top: 4px;
}

.how-cta-btn {
  min-width: 520px;
  height: 72px;
  font-size: 28px;
  font-family: var(--font-fun);
  font-weight: 800;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  box-shadow: 0 8px 0 #b45309, 0 16px 36px rgba(0, 0, 0, 0.5);
  transition: transform 0.12s, box-shadow 0.12s;
}

.how-cta-btn:active {
  transform: translateY(6px);
  box-shadow: 0 2px 0 #b45309, 0 8px 20px rgba(0, 0, 0, 0.4);
}


/* PANDUAN GURU (#scr-teacher) */
.teacher-screen-wrap {
  position: absolute;
  inset: 0;
  width: 1920px;
  height: 1080px;
  padding: 24px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at 50% 25%, #084c3b 0%, #032b21 65%, #011a14 100%);
  z-index: 5;
}

.teacher-header-bar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-radius: 24px;
  background: rgba(3, 44, 34, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  flex: none;
}

.teacher-back-btn {
  height: 58px;
  font-size: 26px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-fun);
  font-weight: 700;
  border-radius: 18px;
}

.teacher-header-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.teacher-title-text {
  font-family: var(--font-fun);
  font-size: 34px;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 1px;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.5);
}

.teacher-title-sub {
  font-size: 24px;
  color: #a7f3d0;
  font-family: var(--font-body);
}

.teacher-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.teacher-school-badge {
  height: 58px;
  padding: 0 22px;
  border-radius: 999px;
  background: rgba(245, 163, 11, 0.18);
  color: #fef08a;
  font-family: var(--font-fun);
  font-size: 24px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s, background 0.15s;
}

.teacher-school-badge:hover {
  background: rgba(245, 163, 11, 0.28);
  transform: scale(1.03);
}

.teacher-school-badge:active {
  transform: scale(0.97);
}

.badge-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

#teacher-snd {
  width: 58px;
  height: 58px;
  border-radius: 18px;
}

.teacher-cockpit-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 18px;
  min-height: 890px;
}

.teacher-col {
  border-radius: 28px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, rgba(6, 68, 52, 0.92) 0%, rgba(2, 38, 29, 0.96) 100%);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.tcol-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex: none;
}

.tcol-ic {
  color: #38bdf8;
  display: flex;
  align-items: center;
}

.tcol-title {
  font-family: var(--font-fun);
  font-size: 28px;
  font-weight: 800;
  color: #fef08a;
  flex: 1;
  letter-spacing: 0.5px;
}

.tcol-badge {
  font-family: var(--font-fun);
  font-size: 24px;
  font-weight: 700;
  padding: 4px 16px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.2);
  color: #bae6fd;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.tcol-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
}

.tcard {
  background: rgba(3, 34, 26, 0.85);
  border-radius: 20px;
  padding: 18px 22px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.tcard-h {
  font-family: var(--font-fun);
  font-size: 25px;
  font-weight: 800;
  color: #fef08a;
  margin-bottom: 8px;
}

.tcard-p {
  font-size: 24px;
  line-height: 1.5;
  color: #e6f7ef;
  font-family: var(--font-body);
}

.tcard-p b {
  color: #fef08a;
}

.t-stars-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.t-star-item {
  font-size: 24px;
  line-height: 1.45;
  color: #eafff3;
  font-family: var(--font-body);
}

.t-star-item b {
  color: #fde68a;
}

.t-reset-btn {
  width: 100%;
  height: 62px;
  font-size: 26px;
  font-family: var(--font-fun);
  font-weight: 800;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.t-start-btn {
  width: 100%;
  height: 70px;
  font-size: 28px;
  font-family: var(--font-fun);
  font-weight: 800;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 8px 0 #b45309, 0 14px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.12s, box-shadow 0.12s;
}

.t-start-btn:active {
  transform: translateY(6px);
  box-shadow: 0 2px 0 #b45309, 0 8px 20px rgba(0, 0, 0, 0.4);
}

/* MODAL RESET CONFIRMATION */
.t-modal-confirm {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
}

.t-modal-h {
  font-family: var(--font-fun);
  font-size: 32px;
  font-weight: 800;
  color: #fca5a5;
  display: flex;
  align-items: center;
  gap: 14px;
}

.t-modal-p {
  font-size: 26px;
  line-height: 1.5;
  color: #fef08a;
  font-family: var(--font-body);
}

.t-modal-sub {
  font-size: 24px;
  line-height: 1.45;
  color: #cbd5e1;
  font-family: var(--font-body);
}

.t-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 10px;
}

.t-modal-actions .btn {
  height: 60px;
  font-size: 26px;
  padding: 0 32px;
  border-radius: 18px;
  font-family: var(--font-fun);
  font-weight: 800;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    existing_css = f.read()

# Avoid duplicate append
if "CARA BERMAIN (#scr-how)" not in existing_css:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(how_teacher_css)
    print("CSS for Cara Bermain & Panduan Guru successfully appended!")
else:
    print("CSS already contains Cara Bermain & Panduan Guru.")
