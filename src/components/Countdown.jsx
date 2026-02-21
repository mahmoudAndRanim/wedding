import { useLang } from '../context/LanguageContext'
import { useCountdown } from '../hooks/useCountdown'
import SectionHeader from './SectionHeader'

export default function Countdown() {
  const { t } = useLang()
  const time = useCountdown()

  const cells = [
    { value: time.days, label: t.days },
    { value: time.hours, label: t.hours },
    { value: time.minutes, label: t.minutes },
    { value: time.seconds, label: t.seconds },
  ]

  return (
    <section className="section section-alt countdown-section" id="countdown">
      <div className="gold-line" />
      <SectionHeader title={t.countdown} />
      <div className="cd-grid">
        {cells.map((c, i) => (
          <div className="cd-cell" key={i}>
            <span className="cd-val">{c.value}</span>
            <span className="cd-lbl">{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
