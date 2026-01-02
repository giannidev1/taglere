import { ImageResponse } from 'next/og'

// Apple touch icon metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Apple touch icon generation - TRƎ logo
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-2px',
          }}
        >
          <span style={{ color: '#ffffff' }}>TR</span>
          <span style={{ color: '#c9a962' }}>Ǝ</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
