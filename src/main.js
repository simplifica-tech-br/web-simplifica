function initStickyHeader() {
  const header = document.querySelector('.header')
  if (!header) return
  const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 10)
  window.addEventListener('scroll', onScroll, { passive: true })
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav__toggle')
  const nav = document.querySelector('.nav')
  if (!toggle || !nav) return

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!expanded))
    nav.classList.toggle('nav--open', !expanded)
  })

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false')
      nav.classList.remove('nav--open')
    })
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

function initFooterYear() {
  const el = document.getElementById('footer-year')
  if (el) el.textContent = new Date().getFullYear()
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader()
  initMobileMenu()
  initSmoothScroll()
  initFooterYear()
})
