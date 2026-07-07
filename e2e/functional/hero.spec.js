import { test, expect } from '@playwright/test'

test.describe('Hero (US-01)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('exibe título, subtítulo e CTA principal do WhatsApp', async ({ page }) => {
    await expect(page.locator('#hero-title')).toBeVisible()
    await expect(page.locator('.hero__subtitle')).toBeVisible()

    const cta = page.locator('.hero__content a.btn--whatsapp')
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
    await expect(cta).toHaveAttribute('target', '_blank')
  })
})
