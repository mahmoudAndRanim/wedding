import Divider from './Divider'

export default function SectionHeader({ title }) {
  return (
    <div className="sec-header">
      <Divider style={{ marginBottom: '1.5rem' }} />
      <h2>{title}</h2>
    </div>
  )
}
