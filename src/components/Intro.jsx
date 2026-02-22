import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function Intro({ onOpen }) {
  const introRef = useRef(null)
  const flapRef  = useRef(null)
  const sealRef  = useRef(null)
  const cardRef  = useRef(null)
  const [opened, setOpened] = useState(false)

  const openEnvelope = useCallback(() => {
    if (opened) return
    setOpened(true)

    const intro = introRef.current
    const flap  = flapRef.current
    const seal  = sealRef.current
    const card  = cardRef.current

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    /* 1 — break seal */
    tl.to(seal, { scale: 1.4, opacity: 0, duration: 0.35, ease: 'back.in(2)' })
      /* 2 — swing flap open to the left */
      .to(flap, {
        rotateY: 180,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.05')
      /* 2b — slide card up */
      .to(card, {
        y: '-18%',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
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
        <div className="env-back" />

        {/* Invitation card inside */}
        <div className="env-card" ref={cardRef}>
          <span className="env-card-label">Invitation</span>
          <span className="env-card-label-ar">دعوة زفاف</span>
        </div>

        {/* Right-side decorative triangle */}
        <div className="env-right-tri" />

        {/* Left-side flap */}
        <div className="env-flap" ref={flapRef}>
          <div className="env-flap-outer" />
          <div className="env-flap-inner" />
        </div>

        {/* Wax seal */}
        <div className="env-seal" ref={sealRef}>
          <span className="env-seal-monogram">M<span>&amp;</span>R</span>
          <span className="env-seal-tap">Tap to open</span>
        </div>
      </div>
    </div>
  )
}
