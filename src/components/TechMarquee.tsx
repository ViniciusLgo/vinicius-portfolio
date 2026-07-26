'use client'

const TECHS = [
  'Java 17', 'Spring Boot', 'PHP 8', 'Laravel 12', 'Next.js 14', 'TypeScript',
  'MySQL', 'PostgreSQL', 'Docker', 'Nginx', 'Linux', 'Cloudflare',
  'Tailwind CSS', 'React', 'Supabase', 'Git', 'JWT', 'REST API',
]

export default function TechMarquee() {
  const items = [...TECHS, ...TECHS]
  return (
    <div className="relative overflow-hidden py-4 border-y border-border/50 bg-surface/20">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {items.map((tech, i) => (
          <span key={i} className="font-mono text-xs text-muted/70 flex items-center gap-2">
            <span className="text-neon-green/60">›</span>
            {tech}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
