import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vinicius Lago Cruz — Backend / Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage({ params }: { params: { locale: string } }) {
  const isEn = params.locale === 'en'
  const role = isEn ? 'Backend / Full Stack Developer' : 'Desenvolvedor Backend / Full Stack'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 6,
          background: '#00ff88',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#00ff88', fontSize: 18, marginBottom: 24, letterSpacing: 4 }}>
            VL_portfolio
          </div>
          <div style={{ color: '#e2e8f0', fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
            Vinicius Lago Cruz
          </div>
          <div style={{ color: '#00d4ff', fontSize: 28, marginBottom: 40 }}>
            {role}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Java', 'Spring Boot', 'PHP', 'Laravel', 'Next.js'].map(tech => (
              <div key={tech} style={{
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: '#00ff88',
                fontSize: 14,
                padding: '6px 16px',
                borderRadius: 6,
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  )
}
