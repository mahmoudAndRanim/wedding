import { useLang } from '../context/LanguageContext'
import SectionHeader from './SectionHeader'

export default function MapSection() {
  const { t } = useLang()

  return (
    <section className="section section-dark" id="map">
      <div className="gold-line" />
      <SectionHeader title={t.location} />
      <div className="map-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1997.6!2d11.0481!3d59.9297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46417515a9b6c7d1%3A0x2!2sTrondheimsveien+48F%2C+2007+Kjeller!5e0!3m2!1sen!2sno!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding venue location"
        />
      </div>
    </section>
  )
}
