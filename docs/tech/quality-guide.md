# Guia de Qualidade e Testes

Este documento define as diretrizes de teste para garantir que os requisitos funcionais e não funcionais descritos em [PRD_Site_Institucional.md](../product/PRD_Site_Institucional.md) sejam atendidos, com foco especial em **responsividade mobile**.

## Objetivo

Garantir a qualidade do site sem contrariar a filosofia de simplicidade do projeto (ver [stack.md](./stack.md)): a estratégia de testes deve ser leve, focada nos pontos que a validação visual + Lighthouse não cobre, e sem infraestrutura desnecessária (sem CI/CD, sem frameworks pesados).

---

## Divisão de responsabilidade

| Ferramenta | Cobre | Onde está documentado |
|---|---|---|
| **Lighthouse** | Performance (FCP, LCP, peso da página), SEO básico, acessibilidade (contraste, alt text, WCAG AA) | [deploy.md](./deploy.md#verificação-de-performance-antes-do-deploy) |
| **Playwright** | Comportamento funcional (CTAs, navegação), responsividade real entre dispositivos | Este documento |

O Playwright é **complementar** ao Lighthouse — não reimplementa checagens de performance ou SEO que o Lighthouse já garante.

---

## Mapeamento requisito → teste

| Requisito do PRD | Tipo de teste | Ferramenta |
|---|---|---|
| US-01 a US-05 (seção 4 — Histórias de Usuário) | Specs funcionais E2E | Playwright |
| 5.1 Performance (FCP, LCP, peso, PageSpeed ≥ 85) | Auditoria de performance | Lighthouse |
| 5.2 Responsividade (mobile, tablet, desktop) | Specs com múltiplos viewports/devices | Playwright |
| 5.3 Navegação (smooth scroll, sticky header, botão flutuante sempre visível) | Specs de interação | Playwright |
| 5.4 Acessibilidade (WCAG AA, navegação por teclado) | Auditoria de acessibilidade | Lighthouse |
| 5.5 SEO básico (meta tags, Open Graph) | Auditoria de SEO | Lighthouse |

---

## Setup do Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

Configuração em `playwright.config.js` (raiz do projeto), usando os devices nativos do Playwright para cobrir o requisito mobile-first do PRD:

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4173',
  },
  projects: [
    { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
    { name: 'Tablet', use: { ...devices['iPad Mini'] } },
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
  ],
})
```

Rodar os testes contra a build de produção (`npm run preview`), não o dev server, para validar o comportamento real que vai para produção.

---

## Organização dos testes

```
e2e/
├── functional/
│   ├── hero.spec.js            (US-01: hero visível, CTA WhatsApp)
│   ├── contact.spec.js         (US-04/US-05: links wa.me, tel:, mailto:)
│   ├── navigation.spec.js      (menu âncora leva à seção correta)
│   └── sections.spec.js        (US-02/US-03: cards de aplicativos e automações renderizam)
└── responsive/
    ├── mobile-menu.spec.js     (toggle do menu hamburguer só aparece <768px)
    ├── floating-button.spec.js (botão WhatsApp sempre visível em qualquer scroll/viewport)
    └── layout.spec.js          (validação visual dos breakpoints mobile/tablet/desktop)
```

## Convenções de teste

- Usar seletores baseados nas classes BEM já definidas em [conventions.md](./conventions.md) (`.header`, `.card`, `.btn--whatsapp`, `.floating-whatsapp`) ou os locators semânticos do Playwright (`getByRole`, `getByText`).
- Evitar adicionar `data-testid` a menos que estritamente necessário — a estrutura semântica e as classes BEM já existentes devem ser suficientes.
- Cada spec de responsividade deve rodar nos 4 `projects` configurados (mobile, mobile alt, tablet, desktop) para garantir cobertura real de dispositivos.

---

## Como rodar localmente

Sem CI/CD — os testes são um gate manual do desenvolvedor antes do push, seguindo o mesmo espírito do fluxo já documentado em [deploy.md](./deploy.md):

```bash
npm run build && npm run preview
npm run test:e2e
```

Para depuração interativa:

```bash
npm run test:e2e:ui
```

## Checklist de pré-push

Antes de qualquer push com mudança visual ou funcional relevante:

1. `npm run test:e2e` — valida funcional + responsividade
2. Lighthouse (Mobile) via DevTools — valida performance + SEO + acessibilidade (ver [deploy.md](./deploy.md#verificação-de-performance-antes-do-deploy))

**Sem GitHub Actions/CI**: decisão consciente de manter o projeto sem infraestrutura de CI. Os testes existem para dar confiança ao desenvolvedor antes do push, não para bloquear automaticamente um pipeline.
