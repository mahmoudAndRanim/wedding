import { useLang } from '../context/LanguageContext'
import Divider from './Divider'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div id="heroParticles" />
      <HeroInner />
      <ScrollCue />
    </section>
  )
}

function HeroInner() {
  const { t } = useLang()

  return (
    <div className="hero-inner">
      <p className="bismillah" data-a="">{t.bismillah}</p>

      <p className="verse" data-a="">
        ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾
        <br />
        <span className="verse-ref">[ الروم: 21 ]</span>
      </p>

      <Divider />

      <p className="invite" data-a="">{t.invite}</p>

      <h1 className="names" data-a="">
        <span className="names-ar">محمود و رنيم</span>
        <span className="names-en">Mahmoud & Ranim</span>
      </h1>

      <p className="hero-date" data-a="">{t.date}</p>

      <div className="adults" data-a="">
        <span>{t.adultsOnly}</span>
        <span className="adults-sub">{t.adultsSub}</span>
      </div>
    </div>
  )
}

function ScrollCue() {
  const { t } = useLang()

  return (
    <div className="scroll-cue" data-a="">
      <span>{t.scroll}</span>
      <div className="scroll-cue-bar" />
    </div>
  )
}
