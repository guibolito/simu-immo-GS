'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#0e1118', borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem 1.5rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
    }}>
      <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.6)', margin: 0, lineHeight: 1.6, maxWidth: 640 }}>
        Ce site utilise des cookies techniques nécessaires à son fonctionnement (session, authentification).
      </p>
      <button onClick={accept} style={{
        background: '#b8f040', color: '#080a0f', border: 'none',
        borderRadius: 8, padding: '8px 20px', fontSize: 12, fontWeight: 700,
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}>
        Accepter & fermer
      </button>
    </div>
  )
}
