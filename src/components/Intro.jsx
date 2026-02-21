import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export default function Intro({ onOpen }) {
  const introRef = useRef(null)
  const flapRef = useRef(null)
  const handleRef = useRef(null)
  const [opened, setOpened] = useState(false)

  const openEnvelope = useCallback(() => {
    if (opened) return
    setOpened(true)

    const intro = introRef.current
    const handle = handleRef.current
    const flap = flapRef.current
    const glow = intro.querySelector('.intro-glow')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    /* tap feedback — press + shake */
    tl.to(handle, { scale: 0.9, duration: 0.08, ease: 'power2.in' })
      .to(handle, { scale: 1, duration: 0.15, ease: 'elastic.out(1,0.5)' })
      .to(handle, { x: -4, duration: 0.03, ease: 'none' }, '+=0.06')
      .to(handle, { x: 4, duration: 0.03, ease: 'none' })
      .to(handle, { x: -5, duration: 0.03, ease: 'none' })
      .to(handle, { x: 5, duration: 0.03, ease: 'none' })
      .to(handle, { x: -3, duration: 0.03, ease: 'none' })
      .to(handle, { x: 0, duration: 0.03, ease: 'none' })
      /* glow pulse */
      .to(glow, {
        opacity: 1,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(138,118,80,.35) 0%, rgba(138,118,80,.1) 30%, transparent 60%)',
        duration: 0.6, ease: 'power2.out',
      }, '+=0.1')
      /* fade handle */
      .to(handle, { opacity: 0, scale: 0.7, duration: 0.3 }, '<0.1')
      /* slide left half (flap side) out to the left */
      .to(flap, { x: '-100%', duration: 1.8, ease: 'power4.inOut' }, '<0.15')
      /* fade glow */
      .to(glow, { opacity: 0, duration: 1 }, '<0.5')
      .add(() => {
        intro.classList.add('done')
        intro.style.pointerEvents = 'none'
        onOpen()
      })
  }, [opened, onOpen])

  return (
    <div className="intro" ref={introRef} onClick={openEnvelope}>
      <div className="intro-glow" />
      <div id="introParticles" />

      {/* Full-screen envelope background (right side stays) */}
      <div className="envelope-bg" />

      {/* Left half — flap side — this slides away */}
      <div className="envelope-flap" ref={flapRef} />

      <div
        className="door-handle"
        ref={handleRef}
        onClick={e => { e.stopPropagation(); openEnvelope() }}
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
