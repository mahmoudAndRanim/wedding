import { useLang } from '../context/LanguageContext'
import Divider from './Divider'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="site-footer">
      <div className="gold-line" />
      <Divider style={{ marginBottom: '2.5rem' }} />
      <p className="footer-names">{t.footerNames}</p>
      <p className="footer-date">28 · 03 · 2026</p>
      <div className="footer-heart">♥</div>
    </footer>
  )
}
