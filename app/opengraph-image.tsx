import { ImageResponse } from 'next/og'

export const alt = 'Luis Grasso — Digital Product Design'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#ffffff',
          color: '#0d0d0d',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: '#0d0d0d' }} />
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Luis Grasso</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            15+ años convirtiendo problemas en productos.
          </div>
          <div style={{ fontSize: 22, color: '#6b6b6b', lineHeight: 1.35 }}>
            Product design · UX/UI · Web · Mendoza, Argentina
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#868686' }}>popnegro-portfolio.vercel.app</div>
      </div>
    ),
    { ...size }
  )
}
