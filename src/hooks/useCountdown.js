import { useState, useEffect } from 'react'

const WEDDING_DATE = new Date('2026-03-28T17:00:00').getTime()

export function useCountdown() {
  const [time, setTime] = useState(calc())

  function calc() {
    const d = WEDDING_DATE - Date.now()
    if (d <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return {
      days: String(Math.floor(d / 864e5)).padStart(2, '0'),
      hours: String(Math.floor((d % 864e5) / 36e5)).padStart(2, '0'),
      minutes: String(Math.floor((d % 36e5) / 6e4)).padStart(2, '0'),
      seconds: String(Math.floor((d % 6e4) / 1e3)).padStart(2, '0'),
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
