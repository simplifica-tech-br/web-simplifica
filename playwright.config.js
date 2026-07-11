import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4173',
  },
  projects: [
    { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
    { name: 'Mobile Chrome Small', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 800 } } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
    { name: 'Tablet', use: { ...devices['iPad Mini'] } },
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
  ],
})
