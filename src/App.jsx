import { useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { LanguageProvider } from './context/LanguageContext'
import Intro from './components/Intro'
import LangToggle from './components/LangToggle'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Details from './components/Details'
import Rsvp from './components/Rsvp'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  // Lenis setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // Particles setup
  useEffect(() => {
    let cancelled = false

    async function loadParticles() {
      try {
        const { tsParticles } = await import('@tsparticles/engine')
        const { loadSlim } = await import('@tsparticles/slim')
        if (cancelled) return
        await loadSlim(tsParticles)

        // Intro particles
        const introEl = document.getElementById('introParticles')
        if (introEl) {
          await tsParticles.load({
            id: 'introParticles',
            options: {
              fullScreen: false,
              particles: {
                number: { value: 35, density: { enable: true, area: 900 } },
                color: { value: ['#C4A352', '#D9C07C', '#B89848', '#F0E6D3', '#C9A88A'] },
                shape: { type: 'circle' },
                opacity: { value: { min: 0.02, max: 0.2 }, animation: { enable: true, speed: 0.2, minimumValue: 0.01 } },
                size: { value: { min: 0.5, max: 2.5 }, animation: { enable: true, speed: 0.6, minimumValue: 0.3 } },
                move: { enable: true, speed: { min: 0.05, max: 0.3 }, direction: 'top', outModes: { default: 'out' }, random: true },
                wobble: { enable: true, distance: 8, speed: 1.5 },
                tilt: { enable: true, value: { min: 0, max: 360 }, animation: { enable: true, speed: 4 } },
                life: { duration: { sync: false, value: { min: 5, max: 15 } }, count: 0 },
              },
              detectRetina: true,
            },
          })
        }

        // Hero particles
        const heroEl = document.getElementById('heroParticles')
        if (heroEl) {
          await tsParticles.load({
            id: 'heroParticles',
            options: {
              fullScreen: false,
              particles: {
                number: { value: 40, density: { enable: true, area: 1100 } },
                color: { value: ['#C4A352', '#D9C07C', '#9A8344'] },
                shape: { type: 'circle' },
                opacity: { value: { min: 0.01, max: 0.08 }, animation: { enable: true, speed: 0.12, minimumValue: 0.005 } },
                size: { value: { min: 0.6, max: 2 }, animation: { enable: true, speed: 0.35, minimumValue: 0.25 } },
                move: { enable: true, speed: { min: 0.03, max: 0.18 }, direction: 'none', outModes: { default: 'out' }, random: true, straight: false },
                wobble: { enable: true, distance: 12, speed: 1 },
              },
              detectRetina: true,
            },
          })
        }
      } catch (e) {
        console.warn('Particles failed to load:', e)
      }
    }

    loadParticles()
    return () => { cancelled = true }
  }, [])

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gold top lines
      gsap.utils.toArray('.gold-line').forEach(l => {
        gsap.from(l, {
          scrollTrigger: { trigger: l, start: 'top 96%', toggleActions: 'play none none none' },
          scaleX: 0, duration: 1.4, ease: 'power3.inOut',
        })
      })

      // Section headers
      gsap.utils.toArray('.sec-header').forEach(h => {
        gsap.from(h, {
          scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none none' },
          opacity: 0, y: 35, duration: 0.9, ease: 'power3.out',
        })
      })

      // Countdown
      gsap.from('.cd-grid', {
        scrollTrigger: { trigger: '.countdown-section', start: 'top 78%', toggleActions: 'play none none none' },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      })

      // Detail cards
      gsap.from('.dt-card', {
        scrollTrigger: { trigger: '.details-grid', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, y: 60, duration: 0.9, stagger: 0.18, ease: 'power3.out',
      })

      // RSVP
      gsap.from('.rsvp-card', {
        scrollTrigger: { trigger: '#rsvp', start: 'top 75%', toggleActions: 'play none none none' },
        opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
      })

      // Map
      gsap.from('.map-wrap', {
        scrollTrigger: { trigger: '#map', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
      })

      // Footer
      gsap.from('.footer-names', {
        scrollTrigger: { trigger: '.site-footer', start: 'top 88%', toggleActions: 'play none none none' },
        opacity: 0, y: 25, duration: 0.8, ease: 'power3.out',
      })

      // Dividers
      gsap.utils.toArray('.section .divider, .site-footer .divider').forEach(d => {
        gsap.from(d, {
          scrollTrigger: { trigger: d, start: 'top 90%', toggleActions: 'play none none none' },
          scaleX: 0, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // Font loading
  useEffect(() => {
    Promise.all([
      document.fonts.load('400 1rem "Aref Ruqaa"'),
      document.fonts.load('300 1rem "Cormorant Garamond"'),
      document.fonts.load('400 1rem "Playfair Display"'),
      document.fonts.load('400 1rem "Great Vibes"'),
    ])
      .then(() => document.body.classList.add('fonts-loaded'))
      .catch(() => document.body.classList.add('fonts-loaded'))

    const timer = setTimeout(() => document.body.classList.add('fonts-loaded'), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleIntroOpen = useCallback(() => {
    gsap.to('.lang-toggle', { opacity: 1, duration: 0.6, delay: 0.2 })

    const els = document.querySelectorAll('.hero [data-a]')
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    els.forEach((el, i) => {
      tl.fromTo(el,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
        i * 0.13
      )
    })
  }, [])

  return (
    <LanguageProvider>
      <Intro onOpen={handleIntroOpen} />
      <LangToggle />
      <Hero />
      <Countdown />
      <Details />
      <Rsvp />
      <MapSection />
      <Footer />
    </LanguageProvider>
  )
}
