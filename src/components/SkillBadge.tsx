interface Props { name: string }

export default function SkillBadge({ name }: Props) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded border border-border bg-surface text-sm text-text/80 font-mono hover:border-neon-green hover:text-neon-green transition-all duration-200 cursor-default">
      {name}
    </span>
  )
}
