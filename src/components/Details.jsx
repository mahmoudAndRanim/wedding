import { useLang } from '../context/LanguageContext'
import SectionHeader from './SectionHeader'

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export default function Details() {
  const { t } = useLang()

  const cards = [
    { icon: <CalendarIcon />, title: t.dateLabel, text: t.dateValue },
    { icon: <PinIcon />, title: t.venue, text: <>Trondheimsveien 48F<br />2007 Kjeller</> },
    { icon: <ClockIcon />, title: t.time, text: t.timeValue },
  ]

  return (
    <section className="section section-dark" id="details">
      <div className="gold-line" />
      <SectionHeader title={t.details} />
      <div className="details-grid">
        {cards.map((card, i) => (
          <div className="dt-card" key={i}>
            <div className="dt-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
