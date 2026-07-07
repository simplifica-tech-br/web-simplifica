import { test, expect } from '@playwright/test'

test.describe('Seções de conteúdo (US-02/US-03)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('seção de aplicativos exibe os 4 exemplos de sistemas do PRD', async ({ page }) => {
    const section = page.locator('#aplicativos')
    await expect(section.locator('.card')).toHaveCount(4)
    for (const title of ['Loja Virtual', 'Sistema de Estoque', 'Catálogo Digital', 'Sistema de Pedidos']) {
      await expect(section.getByText(title, { exact: true })).toBeVisible()
    }

    const cta = section.locator('.section__cta a')
    await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
  })

  test('seção de automações exibe os 6 mini-cases de IA do PRD', async ({ page }) => {
    const section = page.locator('#automacoes')
    await expect(section.locator('.card')).toHaveCount(6)

    const cta = section.locator('.section__cta a')
    await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
  })

  test('seção de sites e presença digital exibe os 4 serviços do PRD', async ({ page }) => {
    const section = page.locator('#sites')
    await expect(section.locator('.card')).toHaveCount(4)

    const cta = section.locator('.section__cta a')
    await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+/)
  })
})
