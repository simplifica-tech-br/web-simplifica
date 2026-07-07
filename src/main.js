import { inject } from '@vercel/analytics'

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

function initAnalytics() {
  inject()
}

function initHeroCarousel() {
  const root = document.getElementById('hero-carousel')
  if (!root) return

  const slides = root.querySelectorAll('.hero-carousel__slide')
  const pipsContainer = document.getElementById('hero-carousel-pips')
  const prevBtn = document.getElementById('hero-carousel-prev')
  const nextBtn = document.getElementById('hero-carousel-next')
  const total = slides.length
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let current = 0
  let timer

  slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== 0)))

  slides.forEach((_, i) => {
    const pip = document.createElement('button')
    pip.type = 'button'
    pip.className = 'hero-carousel__pip' + (i === 0 ? ' is-on' : '')
    pip.setAttribute('aria-label', `Ir para o slide ${i + 1}`)
    pip.addEventListener('click', () => goToSlide(i))
    pipsContainer.appendChild(pip)
  })

  function goToSlide(index) {
    if (index === current) return
    const nextIndex = ((index % total) + total) % total

    slides[current].classList.add('is-exiting')
    slides[current].classList.remove('is-active')
    slides[current].setAttribute('aria-hidden', 'true')
    setTimeout(() => slides.forEach(s => s.classList.remove('is-exiting')), 600)

    current = nextIndex
    slides[current].classList.add('is-active')
    slides[current].setAttribute('aria-hidden', 'false')

    pipsContainer.querySelectorAll('.hero-carousel__pip').forEach((pip, i) => {
      pip.classList.toggle('is-on', i === current)
    })

    resetAutoplay()
  }

  function resetAutoplay() {
    clearInterval(timer)
    if (prefersReducedMotion) return
    timer = setInterval(() => goToSlide(current + 1), 4500)
  }

  prevBtn.addEventListener('click', () => goToSlide(current - 1))
  nextBtn.addEventListener('click', () => goToSlide(current + 1))
  root.addEventListener('mouseenter', () => clearInterval(timer))
  root.addEventListener('mouseleave', resetAutoplay)
  root.addEventListener('focusin', () => clearInterval(timer))
  root.addEventListener('focusout', resetAutoplay)

  resetAutoplay()
  initHeroCarouselChart()
}

function initHeroCarouselChart() {
  const chartEl = document.getElementById('hero-carousel-chart')
  if (!chartEl) return

  const values = [65, 45, 80, 70, 95, 55, 40]
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  values.forEach((height, i) => {
    const bar = document.createElement('div')
    bar.className = 'mockup-dash__bar' + (i === 4 ? ' is-hi' : ' is-lo')
    bar.style.height = height + '%'
    bar.innerHTML = `<span class="mockup-dash__bar-label">${days[i]}</span>`
    chartEl.appendChild(bar)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader()
  initMobileMenu()
  initSmoothScroll()
  initFooterYear()
  initAnalytics()
  initHeroCarousel()
})
