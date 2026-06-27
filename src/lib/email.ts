import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendSubscriptionEmail(email: string) {
  return getResend().emails.send({
    from: 'SimuImmo <bonjour@votre-domaine.fr>',
    to: email,
    subject: 'Votre abonnement SimuImmo est actif ✓',
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:560px">
      <tr><td style="background:#080a0f;padding:32px 40px;text-align:center">
        <h1 style="margin:0;font-size:24px;font-weight:900;letter-spacing:-0.04em;color:#ffffff">
          Simu<span style="color:#b8f040">Immo</span>
        </h1>
        <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.1em">Simulateur Cashflow Locatif</p>
      </td></tr>
      <tr><td style="padding:40px">
        <div style="background:#b8f040;border-radius:10px;padding:16px;text-align:center;margin-bottom:24px">
          <p style="margin:0;font-size:13px;font-weight:800;color:#080a0f;letter-spacing:-.01em">✓ Abonnement activé</p>
        </div>
        <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111">Paiement confirmé !</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#444">
          Votre abonnement SimuImmo à <strong>10 €/mois</strong> est actif. Vous avez accès à toutes les fonctionnalités du simulateur.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:32px auto;display:block;text-align:center">
          <tr><td style="background:#b8f040;border-radius:10px;padding:14px 32px">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color:#080a0f;font-size:14px;font-weight:800;text-decoration:none;letter-spacing:-0.02em">
              Accéder au simulateur →
            </a>
          </td></tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;line-height:1.7;color:#999">
          Vous pouvez gérer ou annuler votre abonnement à tout moment depuis le dashboard via le bouton « Abonnement ».
        </p>
      </td></tr>
      <tr><td style="background:#f8f9fa;padding:20px 40px;border-top:1px solid #eee">
        <p style="margin:0;font-size:11px;color:#999;text-align:center;line-height:1.6">
          SimuImmo · Simulateur cashflow locatif<br>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/legal" style="color:#999">Mentions légales & CGU</a>
          · Les résultats sont des estimations à titre indicatif uniquement.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>
    `.trim(),
  })
}

export async function sendWelcomeEmail(email: string) {
  return getResend().emails.send({
    from: 'SimuImmo <bonjour@votre-domaine.fr>',
    to: email,
    subject: 'Bienvenue sur SimuImmo 🏡',
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:560px">

      <!-- Header -->
      <tr><td style="background:#080a0f;padding:32px 40px;text-align:center">
        <h1 style="margin:0;font-size:24px;font-weight:900;letter-spacing:-0.04em;color:#ffffff">
          Simu<span style="color:#b8f040">Immo</span>
        </h1>
        <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.1em">Simulateur Cashflow Locatif</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:40px">
        <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111">Bienvenue ! 👋</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#444">
          Votre compte SimuImmo est actif. Vous pouvez maintenant calculer le cashflow
          de vos investissements locatifs en temps réel.
        </p>

        <div style="background:#f8f9fa;border-radius:12px;padding:24px;margin:24px 0">
          <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999">Ce qui vous attend</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#333">📊 Règle bancaire 70% + limite HCSF</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#333">🎯 Seuils de rentabilité en temps réel</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#333">📈 Tableau de scénarios comparatifs</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#333">📤 Export Excel & PDF professionnel</td>
            </tr>
          </table>
        </div>

        <table cellpadding="0" cellspacing="0" style="margin:32px auto;display:block;text-align:center">
          <tr><td style="background:#b8f040;border-radius:10px;padding:14px 32px">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color:#080a0f;font-size:14px;font-weight:800;text-decoration:none;letter-spacing:-0.02em">
              Accéder au simulateur →
            </a>
          </td></tr>
        </table>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#666">
          Une question ? Répondez directement à cet email, on vous répond rapidement.
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8f9fa;padding:20px 40px;border-top:1px solid #eee">
        <p style="margin:0;font-size:11px;color:#999;text-align:center;line-height:1.6">
          SimuImmo · Simulateur cashflow locatif<br>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/legal" style="color:#999">Mentions légales & CGU</a>
          · Les résultats sont des estimations à titre indicatif uniquement.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
    `.trim(),
  })
}
