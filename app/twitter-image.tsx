import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Tagle Real Estate - 0.5% Full-Service Real Estate in San Diego'
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = 'image/png'

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* San Diego skyline silhouette at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            opacity: 0.15,
          }}
        >
          <svg
            viewBox="0 0 1200 100"
            style={{ width: '100%', height: '100px' }}
          >
            <path
              fill="#c9a962"
              d="M0,100 L0,70 L40,70 L40,50 L60,50 L60,70 L100,70 L100,45 L120,45 L120,35 L140,35 L140,45 L160,45 L160,70 L200,70 L200,60 L220,60 L220,70 L260,70 L260,40 L280,40 L280,30 L300,30 L300,40 L320,40 L320,70 L360,70 L360,50 L380,50 L380,70 L420,70 L420,28 L440,28 L440,18 L460,18 L460,28 L480,28 L480,70 L520,70 L520,55 L540,55 L540,70 L580,70 L580,35 L600,35 L600,22 L620,22 L620,35 L640,35 L640,70 L680,70 L680,45 L700,45 L700,70 L740,70 L740,32 L760,32 L760,18 L780,18 L780,32 L800,32 L800,70 L840,70 L840,55 L860,55 L860,70 L900,70 L900,42 L920,42 L920,70 L960,70 L960,50 L980,50 L980,40 L1000,40 L1000,50 L1020,50 L1020,70 L1060,70 L1060,60 L1080,60 L1080,70 L1120,70 L1120,55 L1140,55 L1140,70 L1200,70 L1200,100 Z"
            />
          </svg>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo: Tagle RƎ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: '-2px',
              marginBottom: 20,
            }}
          >
            <span style={{ color: '#ffffff' }}>Tagle R</span>
            <span style={{ color: '#c9a962' }}>Ǝ</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 600,
              color: '#c9a962',
              marginBottom: 14,
              letterSpacing: '2px',
            }}
          >
            0.5% Full-Service Real Estate
          </div>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            San Diego County
          </div>
        </div>

        {/* Decorative corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 35,
            left: 35,
            width: 50,
            height: 50,
            borderLeft: '3px solid rgba(201, 169, 98, 0.4)',
            borderTop: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 35,
            right: 35,
            width: 50,
            height: 50,
            borderRight: '3px solid rgba(201, 169, 98, 0.4)',
            borderTop: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 35,
            left: 35,
            width: 50,
            height: 50,
            borderLeft: '3px solid rgba(201, 169, 98, 0.4)',
            borderBottom: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 35,
            right: 35,
            width: 50,
            height: 50,
            borderRight: '3px solid rgba(201, 169, 98, 0.4)',
            borderBottom: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
