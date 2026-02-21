import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function Intro({ onOpen }) {
  const introRef = useRef(null)
  const doorLeftRef = useRef(null)
  const doorRightRef = useRef(null)
  const seamRef = useRef(null)
  const handleRef = useRef(null)
  const [opened, setOpened] = useState(false)

  const openDoors = useCallback(() => {
    if (opened) return
    setOpened(true)

    const intro = introRef.current
    const handle = handleRef.current
    const seam = seamRef.current
    const dL = doorLeftRef.current
    const dR = doorRightRef.current
    const glow = intro.querySelector('.intro-glow')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(handle, { scale: 0.9, duration: 0.08, ease: 'power2.in' })
      .to(handle, { scale: 1, duration: 0.15, ease: 'elastic.out(1,0.5)' })
      .to(handle, { x: -4, duration: 0.03, ease: 'none' }, '+=0.06')
      .to(handle, { x: 4, duration: 0.03, ease: 'none' })
      .to(handle, { x: -5, duration: 0.03, ease: 'none' })
      .to(handle, { x: 5, duration: 0.03, ease: 'none' })
      .to(handle, { x: -3, duration: 0.03, ease: 'none' })
      .to(handle, { x: 0, duration: 0.03, ease: 'none' })
      .to(glow, {
        opacity: 1,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(196,163,82,.35) 0%, rgba(196,163,82,.1) 30%, transparent 60%)',
        duration: 0.6, ease: 'power2.out',
      }, '+=0.1')
      .to(handle, { opacity: 0, scale: 0.7, duration: 0.3 }, '<0.1')
      .to(seam, { opacity: 0, duration: 0.3 }, '<')
      .to(dL, { x: '-100%', duration: 1.8, ease: 'power4.inOut' }, '<0.15')
      .to(dR, { x: '100%', duration: 1.8, ease: 'power4.inOut' }, '<')
      .to(glow, { opacity: 0, duration: 1 }, '<0.5')
      .add(() => {
        intro.classList.add('done')
        intro.style.pointerEvents = 'none'
        onOpen()
      })
  }, [opened, onOpen])

  return (
    <div className="intro" ref={introRef} onClick={openDoors}>
      <div className="intro-glow" />
      <div id="introParticles" />

      <div className="door door-left" ref={doorLeftRef}>
        <div className="door-frame" />
        <div className="door-pattern" />
        <div className="door-arch" />
      </div>

      <div className="door door-right" ref={doorRightRef}>
        <div className="door-frame" />
        <div className="door-pattern" />
        <div className="door-arch" />
      </div>

      <div className="door-seam" ref={seamRef} />

      <div
        className="door-handle"
        ref={handleRef}
        onClick={e => { e.stopPropagation(); openDoors() }}
      >
        <div className="handle-ring">
          <div className="handle-inner">
            <span className="handle-monogram">
              M
              <span className="handle-monogram-amp">&amp;</span>
              R
            </span>
          </div>
        </div>
        <span className="handle-hint">TAP TO OPEN</span>
      </div>
    </div>
  )
}
