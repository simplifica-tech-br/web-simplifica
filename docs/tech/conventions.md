# Convenções de Código

## HTML

- Tags semânticas obrigatórias: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- Cada seção tem `id` correspondente ao item de menu: `id="hero"`, `id="aplicativos"`, `id="automacoes"`, `id="sites"`, `id="contato"`
- Hierarquia de headings: um único `<h1>` na hero, `<h2>` em cada seção, `<h3>` nos cards
- Toda imagem tem `alt` descritivo e `loading="lazy"` (exceto imagem acima do fold no hero)
- Atributo `lang="pt-BR"` no `<html>`

## CSS

### Nomenclatura de classes — BEM simplificado

```
.section           → container da seção
.section__title    → título da seção
.section__subtitle → subtítulo
.card              → card genérico
.card__icon        → ícone dentro do card
.card__title       → título do card
.card__text        → texto descritivo do card
.btn               → botão genérico
.btn--primary      → variante primária (cor da marca)
.btn--whatsapp     → variante WhatsApp (verde)
.header            → cabeçalho fixo
.header--scrolled  → estado após rolagem (JS adiciona esta classe)
.nav__link         → link de navegação
.floating-whatsapp → botão flutuante fixo
```

### CSS Custom Properties

Definidas no `:root`, obrigatórias para qualquer valor de tema. Nunca usar valores literais de cor, tipografia ou espaçamento fora do `:root`.

```css
:root {
  /* Cores */
  --color-primary: #0047FF;
  --color-primary-dark: #003ACC;
  --color-cta: #25D366;
  --color-cta-dark: #1DA851;
  --color-text: #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-bg: #FFFFFF;
  --color-surface: #F7F7F7;
  --color-border: #E5E5E5;

  /* Tipografia */
  --font-body: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.75rem;
  --line-height: 1.6;

  /* Espaçamentos */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;

  /* Layout */
  --max-width: 1200px;
  --radius: 8px;
  --radius-lg: 16px;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
}
```

### Mobile-first

Media queries sempre no sentido mobile → desktop:

```css
/* mobile: estilos base, sem media query */
.card { padding: var(--space-sm); }

/* tablet */
@media (min-width: 768px) { ... }

/* desktop */
@media (min-width: 1024px) { ... }
```

## JavaScript

- Sem classes ES6, sem this — apenas funções simples
- Sem dependências externas — apenas Web APIs nativas
- Uma função por comportamento, nomeada com verbo: `initMobileMenu`, `initStickyHeader`
- Sem inline event handlers no HTML — tudo via `addEventListener` no JS
- Sem `var` — usar `const` por padrão, `let` apenas quando necessário reatribuir

Exemplo de padrão correto:

```js
function initStickyHeader() {
  const header = document.querySelector('.header')
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()
  initStickyHeader()
  initSmoothScroll()
})
```

## Imagens

- Formato: WebP exclusivamente
- Nomenclatura: `kebab-case` descritivo — `mockup-sistema-estoque.webp`
- Hero image: sem `loading="lazy"` (above the fold)
- Demais imagens: `loading="lazy"` obrigatório
- Sempre com `width` e `height` no HTML para evitar layout shift (CLS)
