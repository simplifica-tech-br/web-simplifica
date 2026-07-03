# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Institutional website for a technology company serving small and medium businesses (PMEs). The site is a single-page or few-page site focused on lead generation and WhatsApp conversion. No framework has been chosen yet — this is a greenfield project.

The full product requirements are in `docs/product/PRD_Site_Institucional.md`.

## Site Architecture

One-page site with anchor navigation:

- **Hero** — tagline + primary CTA (WhatsApp button)
- **Aplicativos e Sistemas** — product cards showcasing example solutions (e-commerce, stock control, order management, digital catalog)
- **Automações com IA** — mini-cases for AI/n8n automations (WhatsApp bots, email responses, lead qualification, scheduling, reporting, integrations)
- **Sites e Presença Digital** — institutional sites, landing pages, digital catalogs
- **Contato** — WhatsApp link, phone (tel:), email (mailto:)
- **Floating WhatsApp button** — fixed, visible at all scroll positions

Header: sticky, logo + anchor nav + CTA button.
Footer: logo, quick links, contact channels, copyright.

## Design Constraints

- Mobile-first, fully responsive (mobile, tablet, desktop)
- Reference visual: [accenture.com/br-pt](https://www.accenture.com/br-pt) — generous whitespace, strong typography, clean sections
- Typography: sans-serif modern (Inter, Geist, or Sora)
- Images: WebP format with lazy loading; vector illustrations or clean mockups — no generic stock photos
- Animations: subtle only — nothing that causes lag or distraction
- Smooth scroll between sections

## Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total page weight | < 1 MB |
| Google PageSpeed (mobile) | ≥ 85 |

## Out of Scope

No blog, no auth/login, no e-commerce, no live chat, no background videos, no complex animations, Portuguese only.

## Accessibility & SEO

- WCAG AA contrast ratios
- Semantic HTML (H1, H2, section tags)
- Alt text on all images
- Keyboard navigation
- Meta title/description + Open Graph tags
