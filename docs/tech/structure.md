# Estrutura de Arquivos

```
web-simplifica/
│
├── index.html              ← página única com todas as seções
├── package.json            ← scripts e dependência do Vite
├── vite.config.js          ← configuração mínima do Vite
│
├── src/
│   ├── style.css           ← estilos globais e CSS Custom Properties
│   ├── main.js             ← comportamentos: menu mobile, scroll, floating button
│   │
│   └── assets/
│       ├── images/         ← imagens em formato WebP (lazy-loaded)
│       └── icons/          ← ícones SVG inline ou como arquivo .svg
│
└── docs/
    ├── product/
    │   └── PRD_Site_Institucional.md
    └── tech/
        ├── stack.md
        ├── structure.md    ← este arquivo
        ├── conventions.md
        └── deploy.md
```

---

## Responsabilidade de cada arquivo

### `index.html`
Arquivo central do projeto. Contém:
- `<head>` com meta tags, Open Graph, link para fonte (Inter via Google Fonts) e referência ao CSS
- `<header>` com logo, navegação por âncoras e botão CTA
- `<main>` com as seções: `#hero`, `#aplicativos`, `#automacoes`, `#sites`, `#contato`
- `<footer>` com logo, links rápidos e canais de contato
- Botão WhatsApp flutuante (`.floating-whatsapp`)
- `<script type="module" src="/src/main.js">` no final do body

### `src/style.css`
Estilos em um único arquivo organizado em blocos:
1. CSS Reset / base
2. CSS Custom Properties (`:root`)
3. Tipografia e elementos globais
4. Header e navegação
5. Seção Hero
6. Seção Aplicativos (cards)
7. Seção Automações (cards)
8. Seção Sites
9. Seção Contato
10. Footer
11. Botão flutuante
12. Media queries (mobile → tablet → desktop)

### `src/main.js`
Módulo JS com funções independentes:
- `initMobileMenu()` — toggle do menu hamburguer em mobile
- `initStickyHeader()` — adiciona classe `.scrolled` ao header ao rolar
- `initSmoothScroll()` — scroll suave ao clicar em links de âncora
- Chamada das funções no `DOMContentLoaded`

### `src/assets/images/`
Todas as imagens devem ser:
- Formato WebP
- Nomeadas com kebab-case descritivo (ex.: `mockup-loja-virtual.webp`)
- Referenciadas no HTML com `loading="lazy"` e `alt` descritivo

### `src/assets/icons/`
Ícones SVG para os cards de produto e automação. Preferir SVG inline no HTML para evitar requisições extras. Arquivos `.svg` separados apenas quando reutilizados em múltiplos lugares.

### `vite.config.js`
Configuração mínima — apenas o necessário:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
})
```

### `package.json`
Scripts e única dependência de desenvolvimento:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```
