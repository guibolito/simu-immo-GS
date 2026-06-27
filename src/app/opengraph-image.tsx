import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SimuImmo — Simulateur Cashflow Locatif'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', background: '#080a0f',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', padding: '0 80px',
    }}>
      {/* Logo */}
      <div style={{ fontSize: 80, fontWeight: 900, color: '#ffffff', letterSpacing: '-4px', display: 'flex' }}>
        Simu<span style={{ color: '#b8f040' }}>Immo</span>
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.45)', marginTop: 18, letterSpacing: '3px', textTransform: 'uppercase' }}>
        Simulateur Cashflow Locatif
      </div>

      {/* Feature chips */}
      <div style={{ marginTop: 56, display: 'flex', gap: 24 }}>
        {['📊 Règle 70% bancaire', '🎯 HCSF 35% max', '📤 Export Excel & PDF'].map(f => (
          <div key={f} style={{
            background: 'rgba(184,240,64,0.08)', border: '1px solid rgba(184,240,64,0.25)',
            borderRadius: 16, padding: '14px 28px', fontSize: 18, color: 'rgba(232,228,220,0.75)',
            display: 'flex',
          }}>
            {f}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 48, fontSize: 14,
        color: 'rgba(255,255,255,0.25)', letterSpacing: '1px',
      }}>
        10 €/mois · Abonnement sans engagement
      </div>
    </div>
  )
}
