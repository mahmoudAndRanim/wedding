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

    /* fade handle */
    tl.to(handle, { opacity: 0, duration: 0.3 })
      /* 3D open: rotate flap around its fold line */
      .to(flap, {
        rotateY: -180,
        duration: 1.6,
        ease: 'power3.inOut',
      }, '<')
      /* fade out the whole intro overlay after flap is open */
      .to([flap, intro.querySelector('.envelope-bg')], {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, '-=0.3')
      /* fade glow */
      .to(glow, { opacity: 0, duration: 0.6 }, '<')
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
