import asyncio
import os
from playwright.async_api import async_playwright

artifact_dir = r"C:\Users\Nanda Addi\.gemini\antigravity-ide\brain\43314b97-0efc-4793-8049-b957cf735048"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        await page.goto("file:///D:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/index.html")
        await page.wait_for_timeout(1000)

        # 1. Team Screen
        await page.evaluate("() => { buildTeam(); go('team'); }")
        await page.wait_for_timeout(700)
        team_shot = os.path.join(artifact_dir, "borderless_team_screen.png")
        await page.screenshot(path=team_shot)
        print("Captured team screen:", team_shot)

        # 2. How Screen Step 1
        await page.evaluate("() => { buildHow(); go('how'); }")
        await page.wait_for_timeout(700)
        how1_shot = os.path.join(artifact_dir, "borderless_how_step1.png")
        await page.screenshot(path=how1_shot)
        print("Captured how step 1:", how1_shot)

        # 3. How Screen Step 4
        await page.evaluate("() => { howStep = 3; renderHowStep(); }")
        await page.wait_for_timeout(700)
        how4_shot = os.path.join(artifact_dir, "borderless_how_step4.png")
        await page.screenshot(path=how4_shot)
        print("Captured how step 4:", how4_shot)

        # 4. Teacher Screen Slide 1
        await page.evaluate("() => { buildTeacher(); go('teacher'); }")
        await page.wait_for_timeout(700)
        t1_shot = os.path.join(artifact_dir, "borderless_teacher_slide1.png")
        await page.screenshot(path=t1_shot)
        print("Captured teacher slide 1:", t1_shot)

        # 5. Teacher Assessment Modal
        await page.evaluate("() => { teacherStep = 2; renderTeacherStep(); openAssessmentModal(); }")
        await page.wait_for_timeout(700)
        modal_shot = os.path.join(artifact_dir, "borderless_teacher_modal.png")
        await page.screenshot(path=modal_shot)
        print("Captured teacher modal:", modal_shot)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
