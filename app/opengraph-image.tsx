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
          background: '#f3f2ee',
          color: '#11110f',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55 }}>
          Product Design · UX/UI · Web · Mendoza
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Luis Grasso
          </div>
          <div style={{ fontSize: 32, opacity: 0.7, maxWidth: 800, lineHeight: 1.25 }}>
            15+ years turning problems into products
          </div>
        </div>
        <div style={{ fontSize: 20, opacity: 0.5 }}>popnegro · digital product design</div>
      </div>
    ),
    { ...size }
  )
}
