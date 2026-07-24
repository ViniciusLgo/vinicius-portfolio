interface Props { title: string; accent?: 'green' | 'blue' }

export default function SectionTitle({ title, accent = 'green' }: Props) {
  const color = accent === 'green' ? 'bg-neon-green' : 'bg-neon-blue'
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-text">{title}</h2>
      <div className={`h-0.5 w-16 mt-2 ${color}`} />
    </div>
  )
}
