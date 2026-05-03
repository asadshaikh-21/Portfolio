// ============================================
// ASAD SHAIKH PORTFOLIO — script.js
// ============================================

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor')
const cursorDot = document.getElementById('cursorDot')

let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursorDot.style.left = mouseX + 'px'
  cursorDot.style.top = mouseY + 'px'
})

// Smooth cursor follow
const animateCursor = () => {
  cursorX += (mouseX - cursorX) * 0.12
  cursorY += (mouseY - cursorY) * 0.12
  cursor.style.left = cursorX + 'px'
  cursor.style.top = cursorY + 'px'
  requestAnimationFrame(animateCursor)
}
animateCursor()

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .cert-card, .skill-tags span').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'
    cursor.style.borderColor = 'rgba(245, 166, 35, 0.5)'
  })
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    cursor.style.borderColor = 'var(--accent)'
  })
})

// Make sure links inside cards are clickable
document.querySelectorAll('.project-links a').forEach(link => {
  link.style.pointerEvents = 'auto'
  link.style.position = 'relative'
  link.style.zIndex = '10'
})

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
})

function closeMobile() {
  mobileMenu.classList.remove('open')
}

// ===== TYPED TEXT EFFECT =====
const phrases = [
  'Full Stack Developer',
  'AI Integration Engineer',
  'MERN Stack Developer',
  'Problem Solver',
  'Open to Internships',
]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 80

const typedEl = document.getElementById('typedText')

function typeText() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 40
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 80
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingSpeed = 400
  }

  setTimeout(typeText, typingSpeed)
}

setTimeout(typeText, 1200)

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, i * 80)
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
)

// Add reveal class to elements
const revealSelectors = [
  '.section-label',
  '.section-title',
  '.about-text',
  '.about-links',
  '.skill-category',
  '.project-card',
  '.timeline-item',
  '.cert-card',
  '.contact-title',
  '.contact-desc',
  '.contact-btn',
  '.contact-links',
]

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal')
    revealObserver.observe(el)
  })
})

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.style.color = ''
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)'
    }
  })
})

// ===== SKILL TAG HOVER SOUND EFFECT (visual only) =====
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-2px)'
  })
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'translateY(0)'
  })
})

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)'
  })
})

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num')

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      const finalValue = target.textContent
      const isDecimal = finalValue.includes('.')
      const isPlus = finalValue.includes('+')
      const numValue = parseFloat(finalValue.replace('+', ''))

      let startValue = 0
      const duration = 1500
      const startTime = performance.now()

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * numValue

        if (isDecimal) {
          target.textContent = current.toFixed(1) + (isPlus ? '+' : '')
        } else {
          target.textContent = Math.floor(current) + (isPlus ? '+' : '')
        }

        if (progress < 1) requestAnimationFrame(animate)
        else target.textContent = finalValue
      }

      requestAnimationFrame(animate)
      countObserver.unobserve(target)
    }
  })
}, { threshold: 0.5 })

counters.forEach(counter => countObserver.observe(counter))

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0'
  document.body.style.transition = 'opacity 0.5s ease'
  setTimeout(() => {
    document.body.style.opacity = '1'
  }, 100)
})

console.log('%c Asad Shaikh Portfolio', 'font-size: 20px; font-weight: bold; color: #f5a623;')
console.log('%c Built with ❤️ | Full Stack + AI Engineer', 'font-size: 12px; color: #999;')
console.log('%c GitHub: https://github.com/asadshaikh-21', 'font-size: 12px; color: #666;')