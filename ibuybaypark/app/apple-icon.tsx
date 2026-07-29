import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #16394d 0%, #0e2a3a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-3px',
          }}
        >
          <span style={{ color: '#ffffff' }}>I</span>
          <span style={{ color: '#e08b4c' }}>BP</span>
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            color: '#f5d9bf',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Bay Park
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
