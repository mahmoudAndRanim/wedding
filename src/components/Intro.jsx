import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function Intro({ onOpen }) {
  const introRef = useRef(null)
  const flapRef  = useRef(null)
  const sealRef  = useRef(null)
  const [opened, setOpened] = useState(false)

  const openEnvelope = useCallback(() => {
    if (opened) return
    setOpened(true)

    const intro = introRef.current
    const flap  = flapRef.current
    const seal  = sealRef.current

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    /* 1 — break seal */
    tl.to(seal, { scale: 1.4, opacity: 0, duration: 0.35, ease: 'back.in(2)' })
      /* 2 — swing flap open to the left */
      .to(flap, {
        rotateY: 180,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.05')
      /* 3 — fade out entire overlay */
      .to(intro, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      }, '-=0.2')
      .add(() => {
        intro.classList.add('done')
        intro.style.pointerEvents = 'none'
        onOpen()
      })
  }, [opened, onOpen])

  return (
    <div className="intro" ref={introRef}>
      <div className="intro-glow" />
      <div id="introParticles" />

      <div className="env" onClick={openEnvelope}>
        {/* Envelope body */}
        <div className="env-back">
          {/* Paper texture grain */}
          <div className="env-texture" />
          {/* Center crease shadow */}
          <div className="env-crease" />
          {/* Top fold shadow */}
          <div className="env-fold-shadow env-fold-shadow-top" />
          {/* Bottom fold shadow */}
          <div className="env-fold-shadow env-fold-shadow-bottom" />
          {/* Corner floral decorations */}
          <div className="env-floral env-floral-tl" />
          <div className="env-floral env-floral-tr" />
          <div className="env-floral env-floral-bl" />
          <div className="env-floral env-floral-br" />
          {/* Corner bracket ornaments */}
          <div className="env-corner env-corner-tl" />
          <div className="env-corner env-corner-tr" />
          <div className="env-corner env-corner-bl" />
          <div className="env-corner env-corner-br" />
          {/* Center ornament */}
          <div className="env-ornament" />
          {/* Extra border lines */}
          <div className="env-border2" />
          <div className="env-border3" />
        </div>

        {/* Right-side decorative triangle (not a flap, just lines) */}
        <div className="env-right-tri">
          <div className="env-right-tri-fill" />
        </div>

        {/* Left-side flap */}
        <div className="env-flap" ref={flapRef}>
          <div className="env-flap-outer">
            <div className="env-flap-inner-deco" />
          </div>
          <div className="env-flap-inner" />
        </div>

        {/* Wax seal */}
        <div className="env-seal" ref={sealRef}>
          <div className="env-seal-ring3" />
          <div className="env-seal-ring4" />
          <span className="env-seal-monogram">M<span>&amp;</span>R</span>
          <span className="env-seal-tap">Tap to open</span>
        </div>
      </div>
    </div>
  )
}
