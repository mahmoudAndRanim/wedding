import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'
import SectionHeader from './SectionHeader'

const GF_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3q3PcP8I3dX_DaBHd4pGOfPryzw6CFwyfXe7CY8aRafeg2Q/formResponse'
const ENTRY_NAME = 'entry.1614466646'
const ENTRY_ATTENDING = 'entry.609990609'

export default function Rsvp() {
  const { t } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const formRef = useRef(null)
  const okRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    // Submit via hidden iframe
    const iframe = document.createElement('iframe')
    iframe.name = 'hidden_iframe_rsvp'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = GF_URL
    form.target = 'hidden_iframe_rsvp'

    const addField = (n, v) => {
      const input = document.createElement('input')
      input.type = 'hidden'; input.name = n; input.value = v
      form.appendChild(input)
    }
    addField(ENTRY_NAME, name)
    addField(ENTRY_ATTENDING, 'Yes')

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    setTimeout(() => {
      try { document.body.removeChild(iframe) } catch (_) {}
    }, 3000)

    // Animate transition
    gsap.to(formRef.current, {
      opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
      onComplete: () => {
        setSubmitted(true)
        if (okRef.current) {
          gsap.fromTo(okRef.current,
            { opacity: 0, y: 25, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
          )
        }
      },
    })
  }

  return (
    <section className="section section-alt" id="rsvp">
      <div className="gold-line" />
      <SectionHeader title={t.rsvp} />
      <div className="rsvp-card">
        {!submitted ? (
          <form className="rsvp-form" ref={formRef} onSubmit={handleSubmit}>
            <input
              className="rsvp-input"
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <button type="submit" className="rsvp-submit">
              <span>{t.confirm}</span>
            </button>
          </form>
        ) : (
          <div className="rsvp-ok show" ref={okRef}>
            <h3>{t.thankYou}</h3>
            <p>{t.received}</p>
          </div>
        )}
      </div>
    </section>
  )
}
