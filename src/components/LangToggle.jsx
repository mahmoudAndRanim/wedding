import { useLang } from '../context/LanguageContext'

export default function LangToggle() {
  const { toggle, t } = useLang()

  return (
    <div className="lang-toggle" id="langToggle">
      <button className="lang-btn" onClick={toggle}>{t.langBtn}</button>
    </div>
  )
}
