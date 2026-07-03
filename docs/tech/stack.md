# Stack Técnica

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| HTML5 | — | Estrutura e semântica da página |
| CSS3 | — | Estilos, layout, responsividade, tema |
| JavaScript (ES Modules) | ES2020+ | Comportamentos interativos |
| Vite | 5.x | Dev server e build de produção |
| Node.js | 20 LTS | Runtime do Vite (apenas em desenvolvimento) |

---

## Justificativas

### HTML5
Um único `index.html` contém todas as seções com âncoras (`#hero`, `#aplicativos`, `#automacoes`, `#sites`, `#contato`). Sem templates, sem componentes — apenas HTML semântico com as tags corretas (`<header>`, `<section>`, `<footer>`, `<nav>`).

### CSS3 com Custom Properties
Nenhum framework ou pré-processador. O tema é controlado por CSS Custom Properties definidas no `:root`, o que permite manter consistência sem dependências externas.

```css
:root {
  --color-primary: #0047FF;
  --color-cta: #25D366;      /* WhatsApp green */
  --color-text: #1A1A1A;
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F5;
  --font-body: 'Inter', sans-serif;
  --radius: 8px;
  --max-width: 1200px;
}
```

### JavaScript Vanilla (ES Modules)
Sem bibliotecas externas. As interações necessárias são simples e cobertas com JS puro:
- Scroll suave entre seções (`scrollIntoView`)
- Menu mobile toggle (adicionar/remover classe CSS)
- Botão WhatsApp flutuante (sempre visível)
- Header sticky com sombra ao rolar (`scroll` event)

### Vite 5
Escolhido como único ponto de complexidade da stack. Responsável por:
- Dev server com HMR (hot module replacement) durante desenvolvimento
- Minificação de HTML, CSS e JS na build de produção
- Hash automático de assets para cache-busting
- Otimização de imagens com plugin `vite-plugin-imagemin` (opcional)

O código fonte permanece idêntico a HTML/CSS/JS puro — Vite não impõe abstrações.

---

## O que foi excluído e por quê

| Categoria | Excluído | Motivo |
|---|---|---|
| Framework UI | React, Vue, Svelte | Site estático sem estado de aplicação — overhead sem benefício |
| CSS Framework | Tailwind, Bootstrap | Adiciona peso e dependência por algo que CSS puro resolve |
| CSS Preprocessor | SASS, LESS | CSS Custom Properties cobrem theming; preprocessor seria gold-plating |
| Gerador estático | 11ty, Astro, Hugo | Overkill para one-page com conteúdo fixo |
| TypeScript | — | Projeto pequeno e simples; JS puro é suficiente e mais ágil |
| State management | — | Não há estado de aplicação neste site |
| Testing framework | — | Site estático; validação é visual + PageSpeed |
