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

  test('não sobrepõe o último card de contato em telas móveis', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'Desktop Chrome' || testInfo.project.name === 'Tablet',
      'Botão flutuante não fica próximo aos cards de contato em telas maiores')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const buttonBox = await page.locator('.floating-whatsapp').boundingBox()
    const lastCardBox = await page.locator('.contact__card').last().boundingBox()

    expect(buttonBox).not.toBeNull()
    expect(lastCardBox).not.toBeNull()

    const overlaps = !(
      buttonBox.x + buttonBox.width <= lastCardBox.x ||
      lastCardBox.x + lastCardBox.width <= buttonBox.x ||
      buttonBox.y + buttonBox.height <= lastCardBox.y ||
      lastCardBox.y + lastCardBox.height <= buttonBox.y
    )

    expect(overlaps).toBe(false)
  })
})
