import { test, expect } from '@playwright/test'

test.describe('Menu mobile (5.2 Responsividade)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('toggle de menu aparece apenas em viewports estreitos (< 768px)', async ({ page }) => {
    const toggle = page.locator('.nav__toggle')
    const viewportWidth = page.viewportSize().width

    if (viewportWidth < 768) {
      await expect(toggle).toBeVisible()
    } else {
      await expect(toggle).toBeHidden()
    }
  })

  test('toggle abre e fecha o menu de navegação', async ({ page }) => {
    const toggle = page.locator('.nav__toggle')
    if (!(await toggle.isVisible())) {
      test.skip(true, 'menu hamburguer não se aplica a este viewport')
    }

    const navList = page.locator('.nav__list')

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(navList).toBeVisible()

    await page.locator('.nav__link').first().click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
