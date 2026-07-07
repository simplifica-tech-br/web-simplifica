import { test, expect } from '@playwright/test'

test.describe('Contato (US-04/US-05)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contato')
  })

  test('oferece os três canais de contato com links corretos', async ({ page }) => {
    const cards = page.locator('.contact__grid .contact__card')
    await expect(cards).toHaveCount(3)

    await expect(cards.filter({ hasText: 'WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
    await expect(cards.filter({ hasText: 'Telefone' })).toHaveAttribute('href', /^tel:\+?\d+/)
    await expect(cards.filter({ hasText: 'E-mail' })).toHaveAttribute('href', /^mailto:/)
  })

  test('botão flutuante de WhatsApp usa link direto', async ({ page }) => {
    const floatingButton = page.locator('.floating-whatsapp')
    await expect(floatingButton).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
  })
})
