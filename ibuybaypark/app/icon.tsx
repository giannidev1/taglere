import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// "IB" in white, "BP" in accent — reads as a mark at favicon size.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0e2a3a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '-1px',
          }}
        >
          <span style={{ color: '#ffffff' }}>I</span>
          <span style={{ color: '#e08b4c' }}>BP</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
