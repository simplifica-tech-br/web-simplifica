import { test, expect } from '@playwright/test'

test.describe('Botão flutuante do WhatsApp (5.3 Navegação)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('permanece visível no topo e após rolar a página', async ({ page }) => {
    const floatingButton = page.locator('.floating-whatsapp')

    await expect(floatingButton).toBeVisible()

    await page.locator('#contato').scrollIntoViewIfNeeded()
    await expect(floatingButton).toBeVisible()

    await page.locator('footer.footer').scrollIntoViewIfNeeded()
    await expect(floatingButton).toBeVisible()
  })

  test('header fica sticky com sombra ao rolar', async ({ page }) => {
    const header = page.locator('.header')
    await expect(header).not.toHaveClass(/header--scrolled/)

    await page.locator('#automacoes').scrollIntoViewIfNeeded()
    await expect(header).toHaveClass(/header--scrolled/)
  })
})
