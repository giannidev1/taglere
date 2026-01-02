import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Tagle Real Estate - 0.5% Full-Service Real Estate in San Diego'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OGImage() {
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
            height: 120,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            opacity: 0.15,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            style={{ width: '100%', height: '120px' }}
          >
            <path
              fill="#c9a962"
              d="M0,120 L0,80 L40,80 L40,60 L60,60 L60,80 L100,80 L100,50 L120,50 L120,40 L140,40 L140,50 L160,50 L160,80 L200,80 L200,70 L220,70 L220,80 L260,80 L260,45 L280,45 L280,35 L300,35 L300,45 L320,45 L320,80 L360,80 L360,55 L380,55 L380,80 L420,80 L420,30 L440,30 L440,20 L460,20 L460,30 L480,30 L480,80 L520,80 L520,65 L540,65 L540,80 L580,80 L580,40 L600,40 L600,25 L620,25 L620,40 L640,40 L640,80 L680,80 L680,50 L700,50 L700,80 L740,80 L740,35 L760,35 L760,20 L780,20 L780,35 L800,35 L800,80 L840,80 L840,60 L860,60 L860,80 L900,80 L900,45 L920,45 L920,80 L960,80 L960,55 L980,55 L980,45 L1000,45 L1000,55 L1020,55 L1020,80 L1060,80 L1060,70 L1080,70 L1080,80 L1120,80 L1120,60 L1140,60 L1140,80 L1200,80 L1200,120 Z"
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
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: '-2px',
              marginBottom: 24,
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
              fontSize: 42,
              fontWeight: 600,
              color: '#c9a962',
              marginBottom: 16,
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
              fontSize: 28,
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
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderLeft: '3px solid rgba(201, 169, 98, 0.4)',
            borderTop: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 60,
            height: 60,
            borderRight: '3px solid rgba(201, 169, 98, 0.4)',
            borderTop: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 60,
            height: 60,
            borderLeft: '3px solid rgba(201, 169, 98, 0.4)',
            borderBottom: '3px solid rgba(201, 169, 98, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
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
