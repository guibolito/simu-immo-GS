'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Params {
  pm2: number; surf: number; duree: number; taux: number; apport: number
  rev: number; conc: number; chg: number; vac: number
}

interface Calc {
  prixBien: number; frais: number; total: number; emprunt: number
  mens: number; revNM: number; cf: number; rB: number; rN: number
  l70: number; impact: number; tEnd: number
  s0: number; s50: number; s100: number
}

function calc(p: Params): Calc {
  const taux = p.taux / 100, r = taux / 12, n = p.duree * 12
  const prixBien = p.pm2 * p.surf, frais = prixBien * 0.075, total = prixBien + frais
  const emprunt = total - p.apport
  const mens = r === 0 ? emprunt / n : emprunt * (r * (1 + r) ** n) / ((1 + r) ** n - 1)
  const revAj = p.rev * (1 - p.vac / 100), revNC = revAj * (1 - p.conc / 100)
  const revNA = revNC - p.chg, revNM = revNA / 12, cf = revNM - mens
  const rB = (p.rev / total) * 100, rN = (revNA / total) * 100
  const l70 = p.rev * 0.70 / 12, impact = mens - l70
  const tEnd = Math.max(0, impact) / ((40000 * 0.78) / 12)
  const k = r === 0 ? 1 / n : r * (1 + r) ** n / ((1 + r) ** n - 1)
  const s = (tcf: number) => { const num = revNM - tcf + p.apport * k, den = p.surf * 1.075 * k; return den > 0 ? num / den : 0 }
  return { prixBien, frais, total, emprunt, mens, revNM, cf, rB, rN, l70, impact, tEnd, s0: s(0), s50: s(50), s100: s(100) }
}

const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR')
const E = (n: number, s = '€') => fmt(n) + ' ' + s
const P = (n: number, d = 1) => n.toFixed(d).replace('.', ',') + ' %'

const SCENARIOS = [2500, 3000, 3500, 4000, 4200, 4500, 5000, 5500, 6000, 6500, 7000]

export default function SimulateurClient({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [params, setParams] = useState<Params>({ pm2: 4500, surf: 45, duree: 20, taux: 3.5, apport: 0, rev: 18500, conc: 20, chg: 2800, vac: 5 })
  const d = calc(params)

  const set = useCallback((key: keyof Params) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams(p => ({ ...p, [key]: parseFloat(e.target.value) })), [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handlePortal() {
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  const cfColor = d.cf > 50 ? '#b8f040' : d.cf >= -50 ? '#f0b040' : '#f04060'
  const heroBorder = d.cf > 50 ? 'rgba(184,240,64,0.3)' : d.cf >= -50 ? 'rgba(240,176,64,0.3)' : 'rgba(240,64,96,0.3)'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0e1118', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.04em' }}>
          Simu<span style={{ color: '#b8f040' }}>Immo</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232,228,220,0.4)' }}>{userEmail}</span>
          <button onClick={handlePortal} style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(232,228,220,0.6)', cursor: 'pointer' }}>
            Mon abonnement
          </button>
          <button onClick={handleSignOut} style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)', background: 'transparent', color: 'rgba(232,228,220,0.4)', cursor: 'pointer' }}>
            Déconnexion
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', flex: 1 }}>
        <div style={{ background: '#0e1118', borderRight: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem 1.4rem', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)', position: 'sticky', top: '64px', alignSelf: 'start' }}>
          <SectionHead>Paramètres du bien</SectionHead>
          <Slider label="Prix au m²" value={fmt(params.pm2) + ' €/m²'} id="pm2" min={2500} max={7000} step={50} val={params.pm2} onChange={set('pm2')} />
          <Slider label="Surface" value={params.surf + ' m²'} id="surf" min={25} max={70} step={1} val={params.surf} onChange={set('surf')} />
          <Slider label="Durée du crédit" value={params.duree + ' ans'} id="duree" min={15} max={25} step={1} val={params.duree} onChange={set('duree')} />
          <Slider label="Taux crédit" value={params.taux.toFixed(1).replace('.', ',') + ' %'} id="taux" min={2} max={5} step={0.1} val={params.taux} onChange={set('taux')} />
          <Slider label="Apport personnel" value={E(params.apport)} id="apport" min={0} max={50000} step={1000} val={params.apport} onChange={set('apport')} />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '1.2rem 0' }} />
          <SectionHead color="rgba(64,216,240,0.7)">Revenus locatifs</SectionHead>
          <Slider label="Revenu locatif brut" value={E(params.rev, '€/an')} id="rev" min={8000} max={30000} step={500} val={params.rev} onChange={set('rev')} />
          <Slider label="Frais de gestion" value={params.conc + ' %'} id="conc" min={0} max={30} step={1} val={params.conc} onChange={set('conc')} />
          <Slider label="Charges annuelles" value={E(params.chg, '€/an')} id="chg" min={500} max={6000} step={100} val={params.chg} onChange={set('chg')} />
          <Slider label="Vacance locative" value={params.vac + ' %'} id="vac" min={0} max={30} step={1} val={params.vac} onChange={set('vac')} />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '1.2rem 0' }} />
          <SectionHead color="rgba(184,240,64,0.7)">Exporter</SectionHead>
          <div style={{ display: 'flex', gap: 8 }}>
            <ExportBtn color="#50c878" borderColor="rgba(0,180,80,0.45)" onClick={() => exportExcel(params, d)}>Excel</ExportBtn>
            <ExportBtn color="#f07070" borderColor="rgba(240,64,64,0.45)" onClick={() => exportPDF(params, d)}>PDF</ExportBtn>
          </div>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          <div style={{ borderRadius: 18, border: `1px solid ${heroBorder}`, padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#0e1118', position: 'relative', overflow: 'hidden' }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '.4rem' }}>Cashflow mensuel net</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: cfColor }}>
                {d.cf >= 0 ? '+' : ''}{E(Math.round(d.cf))}/mois
              </div>
              <div style={{ fontSize: 11.5, color: cfColor, marginTop: '.5rem', opacity: 0.85 }}>
                {d.cf > 50 ? 'Autofinancement avec excédent' : d.cf >= -50 ? 'Quasi-autofinancement — effort négligeable' : `Effort mensuel de ${E(Math.abs(Math.round(d.cf)))} — ne s'autofinance pas`}
              </div>
            </div>
            <div style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, border: `1px solid ${heroBorder}`, color: cfColor, background: `${cfColor}11` }}>
              {d.cf > 50 ? '✓ AUTOFINАНCÉ' : d.cf >= -50 ? '≈ ÉQUILIBRE' : '✗ DÉFICIT'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.85rem' }}>
            {[
              { label: 'Prix du bien', val: E(d.prixBien), color: 'rgba(232,228,220,0.65)' },
              { label: 'Mensualité crédit', val: E(Math.round(d.mens)) + '/mois', color: 'rgba(232,228,220,0.65)' },
              { label: 'Revenu net / mois', val: E(Math.round(d.revNM)) + '/mois', color: '#b8f040' },
              { label: 'Total acquisition', val: E(d.total), color: 'rgba(232,228,220,0.65)' },
              { label: 'Rendement brut', val: P(d.rB), color: '#b8f040' },
              { label: 'Rendement net', val: P(d.rN), color: '#40d8f0' },
            ].map(m => (
              <div key={m.label} style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '.9rem 1rem' }}>
                <div style={{ fontSize: 9.5, color: 'rgba(232,228,220,0.4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '.95rem', fontWeight: 600, color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card title="Analyse bancaire — règle 70%" titleColor="rgba(240,176,64,0.7)">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.6rem', marginBottom: '.9rem' }}>
                {[
                  { label: 'Loyer retenu (70%)', val: E(Math.round(d.l70)) + '/mois', color: undefined },
                  { label: 'Mensualité charge', val: E(Math.round(d.mens)) + '/mois', color: undefined },
                  { label: 'Impact endettement', val: (d.impact > 0 ? '+' : '') + E(Math.round(d.impact)) + '/mois', color: d.impact > 0 ? '#f04060' : '#b8f040' },
                  { label: "Taux endettement", val: P(d.tEnd * 100), color: d.tEnd > .35 ? '#f04060' : d.tEnd > .25 ? '#f0b040' : '#b8f040' },
                ].map(bi => (
                  <div key={bi.label} style={{ background: '#141820', borderRadius: 9, padding: '.7rem .85rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontSize: 9.5, color: 'rgba(232,228,220,0.4)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>{bi.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '12.5px', fontWeight: 600, color: bi.color ?? '#e8e4dc' }}>{bi.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(232,228,220,0.65)', marginBottom: 5 }}>
                <span>Endettement estimé</span><span>{P(d.tEnd * 100)}</span>
              </div>
              <div style={{ height: 4, background: '#1c2030', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 2, width: `${Math.min(d.tEnd * 100 / 50 * 100, 100)}%`, background: d.tEnd > .35 ? '#f04060' : d.tEnd > .25 ? '#f0b040' : '#b8f040', transition: 'width .4s' }} />
              </div>
              <div style={{ fontSize: 9, color: 'rgba(232,228,220,0.35)', textAlign: 'right', marginTop: 3 }}>Limite HCSF : 35 %</div>
            </Card>

            <Card title="Seuils prix au m²" titleColor="rgba(184,240,64,0.7)">
              {[
                { label: 'Point mort (CF = 0)', val: fmt(Math.round(d.s0)) + ' €/m²' },
                { label: 'Cashflow +50 €/mois', val: fmt(Math.round(d.s50)) + ' €/m²' },
                { label: 'Cashflow +100 €/mois', val: fmt(Math.round(d.s100)) + ' €/m²' },
              ].map((row, i) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.55rem 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', fontSize: 11 }}>
                  <span style={{ color: 'rgba(232,228,220,0.65)' }}>{row.label}</span>
                  <span style={{ color: '#b8f040', fontWeight: 500 }}>{row.val}</span>
                </div>
              ))}
            </Card>
          </div>

          <Card title="Scénarios — cashflow selon prix au m²" titleColor="rgba(64,216,240,0.7)">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead>
                  <tr>
                    {['Prix au m²', 'Prix bien', 'Mensualité', 'Rev. net/mois', 'Cashflow', 'Rend. brut'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-display)', fontSize: '8.5px', fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', padding: '7px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: h === 'Prix au m²' ? 'left' : 'right', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCENARIOS.map(pm2v => {
                    const sd = calc({ ...params, pm2: pm2v })
                    const isActive = Math.abs(pm2v - params.pm2) < 300
                    const cc = sd.cf > 50 ? '#b8f040' : sd.cf >= -50 ? '#f0b040' : '#f04060'
                    return (
                      <tr key={pm2v} style={{ background: isActive ? 'rgba(184,240,64,0.04)' : undefined }}>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', color: isActive ? '#b8f040' : 'rgba(232,228,220,0.65)' }}>{fmt(pm2v)} €/m²{isActive ? ' ←' : ''}</td>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' }}>{E(sd.prixBien)}</td>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' }}>{E(Math.round(sd.mens))}/mois</td>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' }}>{E(Math.round(sd.revNM))}/mois</td>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'right', color: cc, fontWeight: 500 }}>{sd.cf >= 0 ? '+' : ''}{E(Math.round(sd.cf))}/mois</td>
                        <td style={{ padding: '6px 9px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' }}>{P(sd.rB)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SectionHead({ children, color = 'rgba(232,228,220,0.4)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color, paddingBottom: '.65rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {children}
    </div>
  )
}

function Slider({ label, value, id, min, max, step, val, onChange }: {
  label: string; value: string; id: string; min: number; max: number; step: number; val: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.45rem' }}>
        <span style={{ fontSize: 11, color: 'rgba(232,228,220,0.65)' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#b8f040' }}>{value}</span>
      </div>
      <input type="range" id={id} min={min} max={max} step={step} value={val} onChange={onChange} />
    </div>
  )
}

function Card({ title, titleColor = 'rgba(232,228,220,0.4)', children }: { title: string; titleColor?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '1.3rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: titleColor, marginBottom: '1rem', paddingBottom: '.6rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{title}</div>
      {children}
    </div>
  )
}

function ExportBtn({ color, borderColor, onClick, children }: { color: string; borderColor: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 600, letterSpacing: '.06em', padding: '10px', borderRadius: 12, border: `1px solid ${borderColor}`, cursor: 'pointer', textTransform: 'uppercase', background: 'transparent', color }}>
      {children}
    </button>
  )
}

function exportExcel(p: Params, d: Calc) {
  // @ts-ignore
  if (typeof window === 'undefined' || !window.XLSX) { alert('Chargez la page complètement avant d\'exporter'); return }
  // @ts-ignore
  const XLSX = window.XLSX
  const wb = XLSX.utils.book_new()
  const aoa = [
    ['SIMULATEUR CASHFLOW LOCATIF', '', ''],
    ['Règle bancaire 70% · HCSF 35% max', '', ''], [''],
    ['PARAMÈTRES', '', ''],
    ['Prix au m²', p.pm2, '€/m²'], ['Surface', p.surf, 'm²'],
    ['Durée crédit', p.duree, 'ans'], ['Taux crédit', p.taux + '%', ''],
    ['Apport', p.apport, '€'], ['Revenu locatif brut', p.rev, '€/an'],
    ['Frais de gestion', p.conc + '%', ''], ['Charges annuelles', p.chg, '€/an'],
    ['Vacance locative', p.vac + '%', ''], [''],
    ['RÉSULTATS', '', ''],
    ['Prix du bien', Math.round(d.prixBien), '€'], ['Frais notaire', Math.round(d.frais), '€'],
    ['Total acquisition', Math.round(d.total), '€'], ['Emprunt', Math.round(d.emprunt), '€'],
    ['Mensualité crédit', Math.round(d.mens), '€/mois'], ['Revenu net/mois', Math.round(d.revNM), '€/mois'],
    ['CASHFLOW MENSUEL NET', Math.round(d.cf), '€/mois'],
    ['Rendement brut', d.rB.toFixed(1) + '%', ''], ['Rendement net', d.rN.toFixed(1) + '%', ''], [''],
    ['SEUILS', '', ''],
    ['Point mort', Math.round(d.s0), '€/m²'], ['CF +50€', Math.round(d.s50), '€/m²'], ['CF +100€', Math.round(d.s100), '€/m²'],
  ]
  const ws = XLSX.utils.aoa_to_sheet(aoa)
  ws['!cols'] = [{ wch: 36 }, { wch: 18 }, { wch: 10 }]
  XLSX.utils.book_append_sheet(wb, ws, 'Simulateur')
  XLSX.writeFile(wb, 'cashflow_locatif.xlsx')
}

function exportPDF(p: Params, d: Calc) {
  const cc = d.cf > 50 ? '#70c840' : d.cf >= -50 ? '#c09030' : '#d04050'
  const cs = d.cf >= 0 ? '+' : ''
  const fmt2 = (n: number) => Math.round(n).toLocaleString('fr-FR')
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Cashflow Locatif</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#111;padding:28px;font-size:11px;line-height:1.5}h1{font-size:17px;font-weight:800;margin-bottom:3px}.cf-box{display:flex;justify-content:space-between;background:#f8f9fa;border-left:4px solid ${cc};padding:14px 18px;margin-bottom:18px;border-radius:6px}.cf-num{font-size:26px;font-weight:800;color:${cc}}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}.st{font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999;padding-bottom:5px;border-bottom:1px solid #e8e8e8;margin-bottom:8px}table{width:100%;border-collapse:collapse}td{padding:4px 7px;border-bottom:1px solid #f2f2f2;font-size:10.5px}td:last-child{text-align:right}@media print{@page{margin:12mm}body{padding:0}}<\/style><\/head><body>
<h1>Simulateur Cashflow Locatif<\/h1><div style="color:#999;font-size:9.5px;margin-bottom:16px">Règle bancaire 70% · HCSF 35% max<\/div>
<div class="cf-box"><div><div style="font-size:9px;text-transform:uppercase;color:#999">Cashflow mensuel net<\/div><div class="cf-num">${cs}${fmt2(d.cf)} €/mois<\/div><\/div><div style="text-align:right"><div style="font-size:9px;color:#999">Rendement brut / net<\/div><div style="font-size:18px;font-weight:700;color:${cc}">${d.rB.toFixed(1)}%<\/div><div style="font-size:10px;color:#888">Net : ${d.rN.toFixed(1)}%<\/div><\/div><\/div>
<div class="grid"><div><div class="st">Paramètres<\/div><table>
<tr><td>Prix au m²<\/td><td>${fmt2(p.pm2)} €/m²<\/td><\/tr><tr><td>Surface<\/td><td>${p.surf} m²<\/td><\/tr>
<tr><td>Durée crédit<\/td><td>${p.duree} ans<\/td><\/tr><tr><td>Taux<\/td><td>${p.taux}%<\/td><\/tr>
<tr><td>Revenu brut<\/td><td>${fmt2(p.rev)} €/an<\/td><\/tr><tr><td>Charges<\/td><td>${fmt2(p.chg)} €/an<\/td><\/tr>
<\/table><\/div><div><div class="st">Résultats<\/div><table>
<tr><td>Prix du bien<\/td><td>${fmt2(d.prixBien)} €<\/td><\/tr><tr><td>Total acq.<\/td><td>${fmt2(d.total)} €<\/td><\/tr>
<tr><td>Mensualité<\/td><td>${fmt2(d.mens)} €/mois<\/td><\/tr><tr><td>Revenu net<\/td><td>${fmt2(d.revNM)} €/mois<\/td><\/tr>
<tr><td><b>Cashflow<\/b><\/td><td style="color:${cc};font-weight:700"><b>${cs}${fmt2(d.cf)} €/mois<\/b><\/td><\/tr>
<\/table><\/div><\/div>
<script>window.onload=()=>window.print()<\/script><\/body><\/html>`
  const w = window.open('', '_blank', 'width=900,height=700')
  if (w) { w.document.write(html); w.document.close() }
}
