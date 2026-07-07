import { test, expect } from '@playwright/test'

const expectedColumnsByProject = {
  'Mobile Chrome': 1,
  'Mobile Safari': 1,
  'Tablet': 2,
  'Desktop Chrome': 4,
}

test.describe('Breakpoints de layout (5.2 Responsividade)', () => {
  test('grid de aplicativos usa o número de colunas esperado para o dispositivo', async ({ page }, testInfo) => {
    await page.goto('/#aplicativos')

    const grid = page.locator('#aplicativos .grid--4')
    const columnCount = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)

    expect(columnCount).toBe(expectedColumnsByProject[testInfo.project.name])
  })

  test('hero muda de coluna única (mobile) para lado a lado (desktop)', async ({ page }, testInfo) => {
    await page.goto('/')

    const heroInner = page.locator('.hero__inner')
    const flexDirection = await heroInner.evaluate(el => getComputedStyle(el).flexDirection)

    const isDesktop = testInfo.project.name === 'Desktop Chrome'
    expect(flexDirection).toBe(isDesktop ? 'row' : 'column')
  })
})
