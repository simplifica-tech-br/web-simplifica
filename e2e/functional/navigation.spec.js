import { test, expect } from '@playwright/test'

const sections = [
  { link: 'Automações com IA', id: 'automacoes' },
  { link: 'Sites', id: 'sites' },
  { link: 'Aplicativos', id: 'aplicativos' },
  { link: 'Contato', id: 'contato' },
]

test.describe('Navegação por âncoras', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  for (const { link, id } of sections) {
    test(`menu leva até a seção "${id}"`, async ({ page }) => {
      const toggle = page.locator('.nav__toggle')
      if (await toggle.isVisible()) {
        await toggle.click()
      }

      await page.locator('.nav__link', { hasText: link }).click()
      await expect(page.locator(`#${id}`)).toBeInViewport()
    })
  }
})
