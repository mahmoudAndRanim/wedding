import { createContext, useContext, useState, useCallback } from 'react'

const LanguageContext = createContext()

const translations = {
  ar: {
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    invite: 'بكل فرحٍ وسرور، نتشرّف بدعوتكم لمشاركتنا أجمل لحظات حياتنا',
    name1: 'محمود',
    and: 'و',
    name2: 'رنيم',
    date: '28 · مارس · 2026',
    adultsOnly: 'جنّة الأطفال منازلهم',
    adultsSub: 'نرجو عدم اصطحاب الأطفال',
    scroll: 'اكتشف المزيد',
    countdown: 'العد التنازلي',
    days: 'يوم',
    hours: 'ساعة',
    minutes: 'دقيقة',
    seconds: 'ثانية',
    details: 'تفاصيل الحفل',
    dateLabel: 'التاريخ',
    dateValue: 'السبت، 28 مارس 2026',
    venue: 'المكان',
    time: 'الموعد',
    timeValue: 'الحفل الساعة 17:00',
    rsvp: 'تأكيد الحضور',
    namePlaceholder: 'الاسم الكامل',
    confirm: 'تأكيد الحضور',
    thankYou: 'شكراً لكم!',
    received: 'لقد تلقينا ردكم ونتطلع لرؤيتكم!',
    location: 'الموقع',
    footerNames: 'محمود و رنيم',
    langBtn: 'English',
    title: 'محمود و رنيم – دعوة زفاف',
  },
  en: {
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    invite: 'With great joy and honour, you are cordially invited to celebrate the union of',
    name1: 'Mahmoud',
    and: '&',
    name2: 'Ranim',
    date: '28 · March · 2026',
    adultsOnly: 'Adults Only Event',
    adultsSub: 'We kindly request no children attend',
    scroll: 'Scroll',
    countdown: 'Counting Down',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    details: 'Wedding Details',
    dateLabel: 'Date',
    dateValue: 'Saturday, March 28, 2026',
    venue: 'Venue',
    time: 'Time',
    timeValue: 'Ceremony at 17:00',
    rsvp: 'RSVP',
    namePlaceholder: 'Your full name',
    confirm: 'Confirm Attendance',
    thankYou: 'Thank You!',
    received: 'We have received your response and look forward to seeing you!',
    location: 'Location',
    footerNames: 'Mahmoud & Ranim',
    langBtn: 'العربية',
    title: 'Mahmoud & Ranim – Wedding Invitation',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar')

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'ar' ? 'en' : 'ar'
      const html = document.documentElement
      const body = document.body
      if (next === 'en') {
        html.lang = 'en'; html.dir = 'ltr'; body.dir = 'ltr'
      } else {
        html.lang = 'ar'; html.dir = 'rtl'; body.dir = 'rtl'
      }
      document.title = translations[next].title
      return next
    })
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
