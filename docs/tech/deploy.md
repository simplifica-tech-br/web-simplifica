# Deploy e Fluxo de Desenvolvimento

## Comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala o Vite (única dependência) |
| `npm run dev` | Inicia dev server com HMR em `http://localhost:5173` |
| `npm run build` | Gera a build otimizada em `dist/` |
| `npm run preview` | Serve a build de `dist/` localmente para validação |

---

## Ambiente de desenvolvimento

1. Instalar Node.js 20 LTS
2. Clonar o repositório
3. `npm install`
4. `npm run dev`
5. Abrir `http://localhost:5173`

O Vite recarrega automaticamente o browser ao salvar qualquer arquivo.

---

## Build de produção

`npm run build` gera a pasta `dist/` com:
- `index.html` minificado
- CSS e JS minificados com hash no nome (`style.abc123.css`)
- Assets copiados de `src/assets/`

A pasta `dist/` é o artefato final — tudo que vai para o servidor.

---

## Hospedagem

O site é puramente estático — qualquer CDN ou plataforma de hosting estático funciona.

**Recomendado: Vercel**
- Deploy automático ao fazer push na branch `main`
- HTTPS automático e gratuito
- CDN global
- Configuração: conectar repositório GitHub no painel da Vercel — zero config adicional

**Alternativa: Netlify**
- Comportamento idêntico ao Vercel para sites estáticos

**Configuração do deploy (Vercel/Netlify):**

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 |

---

## Fluxo de trabalho

```
editar arquivos → npm run dev → testar no browser → npm run build → npm run preview → git push → deploy automático
```

Não há CI/CD separado — o push na `main` dispara o deploy automaticamente na Vercel/Netlify.

---

## Verificação de performance antes do deploy

Antes de fazer push de alterações significativas:

1. `npm run build && npm run preview`
2. Abrir `http://localhost:4173` no Chrome
3. DevTools → Lighthouse → Mobile → gerar relatório
4. Metas a atingir:
   - FCP < 1,5s
   - LCP < 2,5s
   - Performance score ≥ 85
   - Tamanho total da página < 1 MB
