import { test, expect } from '@playwright/test'

const sections = ['#hero', '#automacoes', '#sites', '#aplicativos', '#contato']

test.describe('Sem overflow horizontal (regressão de responsividade)', () => {
  for (const section of sections) {
    test(`nenhum overflow horizontal ao visualizar ${section}`, async ({ page }) => {
      await page.goto('/')
      await page.locator(section).scrollIntoViewIfNeeded()

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  }
})
