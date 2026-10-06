import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

artifact_dir = r"C:\Users\Nanda Addi\.gemini\antigravity-ide\brain\43314b97-0efc-4793-8049-b957cf735048"
os.makedirs(artifact_dir, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        
        # Load local standalone app
        await page.goto("file:///D:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/index.html")
        await page.wait_for_timeout(1000)

        # 1. Team Screen - Detektif Sawah (Group 1)
        await page.evaluate("() => { buildTeam(); go('team'); teamIdx = 0; renderTeam('init'); }")
        await page.wait_for_timeout(800)
        shot1 = os.path.join(artifact_dir, "team_screen_4_groups.png")
        await page.screenshot(path=shot1)
        print("Captured Team Screen (Group 1):", shot1)

        # 2. Team Screen - Detektif Laut (Group 4)
        await page.evaluate("() => { teamIdx = 3; renderTeam('init'); }")
        await page.wait_for_timeout(800)
        shot2 = os.path.join(artifact_dir, "team_screen_group4_laut.png")
        await page.screenshot(path=shot2)
        print("Captured Team Screen (Group 4):", shot2)

        # 3. Mission Menu - Sawah 2x2 Grid
        await page.evaluate("() => { NAV.biome = 'sawah'; G.team = 'sawah'; buildMissionMenu(); go('mission'); }")
        await page.wait_for_timeout(800)
        shot3 = os.path.join(artifact_dir, "mission_menu_sawah_2x2.png")
        await page.screenshot(path=shot3)
        print("Captured Mission Menu (Sawah 2x2):", shot3)

        # 4. Mission Menu - Hutan 2x2 Grid
        await page.evaluate("() => { NAV.biome = 'hutan'; G.team = 'hutan'; buildMissionMenu(); go('mission'); }")
        await page.wait_for_timeout(800)
        shot4 = os.path.join(artifact_dir, "mission_menu_hutan_2x2.png")
        await page.screenshot(path=shot4)
        print("Captured Mission Menu (Hutan 2x2):", shot4)

        # 5. Mission Menu - Sungai 2x2 Grid
        await page.evaluate("() => { NAV.biome = 'sungai'; G.team = 'sungai'; buildMissionMenu(); go('mission'); }")
        await page.wait_for_timeout(800)
        shot5 = os.path.join(artifact_dir, "mission_menu_sungai_2x2.png")
        await page.screenshot(path=shot5)
        print("Captured Mission Menu (Sungai 2x2):", shot5)

        # 6. Mission Menu - Laut 2x2 Grid
        await page.evaluate("() => { NAV.biome = 'laut'; G.team = 'laut'; buildMissionMenu(); go('mission'); }")
        await page.wait_for_timeout(800)
        shot6 = os.path.join(artifact_dir, "mission_menu_laut_2x2.png")
        await page.screenshot(path=shot6)
        print("Captured Mission Menu (Laut 2x2):", shot6)

        # 7. Briefing Modal - Sawah Misi 1
        await page.evaluate("() => { openMission(MISSIONS.find(m => m.id === 'sawah-1')); }")
        await page.wait_for_timeout(800)
        shot_brief = os.path.join(artifact_dir, "mission_briefing_modal.png")
        await page.screenshot(path=shot_brief)
        print("Captured Mission Briefing Modal:", shot_brief)

        # 8. Live Simulation Launch Test - Sawah Misi 1
        await page.evaluate("() => { closeModal(); startSim(MISSIONS.find(m => m.id === 'sawah-1')); }")
        await page.wait_for_timeout(1000)
        shot7 = os.path.join(artifact_dir, "simulation_live_sawah_m1.png")
        await page.screenshot(path=shot7)
        print("Captured Live Simulation (Sawah M1):", shot7)

        # 9. Live Simulation Launch Test - Hutan Misi 1
        await page.evaluate("() => { startSim(MISSIONS.find(m => m.id === 'hutan-1')); }")
        await page.wait_for_timeout(1000)
        shot8 = os.path.join(artifact_dir, "simulation_live_hutan_m1.png")
        await page.screenshot(path=shot8)
        print("Captured Live Simulation (Hutan M1):", shot8)

        await browser.close()
        print("ALL SCREENSHOTS CAPTURED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
