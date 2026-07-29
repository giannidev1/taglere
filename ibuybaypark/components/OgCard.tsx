/**
 * Shared 1200×630 social card, used by both app/opengraph-image.tsx and
 * app/twitter-image.tsx so the two can never drift apart.
 *
 * Note this renders through Satori (next/og), not the browser — only a subset
 * of CSS works and every container needs an explicit `display`.
 */
export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export function OgCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #16394d 0%, #0e2a3a 60%, #07161f 100%)',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#f5d9bf',
          marginBottom: 32,
        }}
      >
        Bay Park · San Diego
      </div>

      {/* Headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-2px',
        }}
      >
        <span style={{ color: '#ffffff' }}>Sell your Bay Park home.</span>
        <span style={{ color: '#e08b4c' }}>Cash, on your timeline.</span>
      </div>

      {/* Value props */}
      <div
        style={{
          display: 'flex',
          fontSize: 30,
          color: '#cbd5e1',
          marginTop: 40,
        }}
      >
        No commissions · No repairs · No showings
      </div>

      {/* Accent rule */}
      <div
        style={{
          display: 'flex',
          width: 160,
          height: 6,
          backgroundColor: '#e08b4c',
          borderRadius: 3,
          marginTop: 48,
        }}
      />

      {/* Wordmark + license */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 32,
          fontSize: 26,
        }}
      >
        <span style={{ color: '#ffffff', fontWeight: 700 }}>I Buy&nbsp;</span>
        <span style={{ color: '#e08b4c', fontWeight: 700 }}>Bay Park</span>
        <span style={{ color: '#64748b', marginLeft: 20 }}>
          ibuybaypark.com · DRE #02250353
        </span>
      </div>
    </div>
  );
}
