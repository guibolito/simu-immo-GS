import Link from 'next/link'

export const metadata = {
  title: 'Mentions légales & CGU — SimuImmo',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#b8f040', marginBottom: '1rem', paddingBottom: '.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {title}
    </h2>
    <div style={{ color: 'rgba(232,228,220,0.7)', fontSize: 13, lineHeight: 1.8 }}>
      {children}
    </div>
  </section>
)

export default function LegalPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', fontFamily: 'var(--font-mono, monospace)' }}>
      <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0e1118', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.04em', textDecoration: 'none', color: '#e8e4dc' }}>
          Simu<span style={{ color: '#b8f040' }}>Immo</span>
        </Link>
        <Link href="/dashboard" style={{ fontSize: 12, color: 'rgba(232,228,220,0.4)', textDecoration: 'none' }}>← Retour</Link>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.2rem)', letterSpacing: '-0.04em', marginBottom: '.5rem' }}>
          Mentions légales & CGU
        </h1>
        <p style={{ color: 'rgba(232,228,220,0.4)', fontSize: 12, marginBottom: '3rem' }}>Dernière mise à jour : juin 2025</p>

        <Section title="1. Éditeur du site">
          <p>Le service SimuImmo est édité par :</p>
          <p style={{ marginTop: '.75rem', padding: '1rem', background: '#0e1118', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
            <strong style={{ color: '#e8e4dc' }}>[NOM DE VOTRE SOCIÉTÉ]</strong><br />
            [Forme juridique] au capital de [X] €<br />
            Siège social : [Adresse complète]<br />
            SIRET : [Numéro SIRET]<br />
            RCS : [Ville] [Numéro]<br />
            TVA intracommunautaire : FR[XX][SIRET]<br />
            Email : [contact@votre-domaine.fr]
          </p>
        </Section>

        <Section title="2. Hébergement">
          <p>
            Le site est hébergé par <strong style={{ color: '#e8e4dc' }}>Vercel Inc.</strong>, 340 Pine Street, Suite 701,
            San Francisco, California 94104, USA.
          </p>
        </Section>

        <Section title="3. Description du service">
          <p>
            SimuImmo est un outil de simulation de cashflow locatif destiné aux investisseurs immobiliers.
            Il permet d'estimer la rentabilité d'un investissement locatif à partir de paramètres saisis par l'utilisateur.
          </p>
          <p style={{ marginTop: '.75rem', padding: '1rem', background: 'rgba(240,176,64,0.08)', borderRadius: 10, border: '1px solid rgba(240,176,64,0.2)', color: '#f0b040' }}>
            ⚠ Les résultats fournis sont des estimations à titre indicatif. Ils ne constituent pas un conseil
            financier, fiscal ou juridique. Consultez un professionnel avant tout investissement.
          </p>
        </Section>

        <Section title="4. Conditions d'utilisation">
          <p><strong style={{ color: '#e8e4dc' }}>4.1 Accès au service</strong></p>
          <p>L'accès au simulateur est conditionné à la création d'un compte et à la souscription d'un abonnement mensuel de 10 € TTC.</p>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>4.2 Abonnement</strong></p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '.5rem' }}>
            <li>L'abonnement est renouvelé automatiquement chaque mois.</li>
            <li>Vous pouvez résilier à tout moment depuis votre espace « Mon abonnement ».</li>
            <li>La résiliation prend effet à la fin de la période en cours (pas de remboursement au prorata).</li>
            <li>Le paiement est traité par Stripe Inc. (PCI-DSS certifié). Nous ne stockons aucune donnée bancaire.</li>
          </ul>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>4.3 Droit de rétractation</strong></p>
          <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux contenus numériques fournis immédiatement après l'achat avec accord préalable du consommateur.</p>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>4.4 Utilisation autorisée</strong></p>
          <p>Le service est destiné à un usage personnel et professionnel. Toute revente, redistribution ou usage frauduleux est interdit.</p>
        </Section>

        <Section title="5. Protection des données personnelles (RGPD)">
          <p><strong style={{ color: '#e8e4dc' }}>Données collectées :</strong></p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '.5rem' }}>
            <li>Adresse email (pour l'authentification et la facturation)</li>
            <li>Données de paiement (traitées par Stripe, jamais stockées par SimuImmo)</li>
            <li>Données de simulation (stockées sur Supabase, accessibles uniquement par vous)</li>
          </ul>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>Base légale :</strong> Exécution du contrat d'abonnement (art. 6.1.b RGPD).</p>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>Vos droits :</strong> Accès, rectification, suppression, portabilité, opposition.
          Exercez-les par email à <strong style={{ color: '#e8e4dc' }}>[contact@votre-domaine.fr]</strong></p>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>Conservation :</strong> Données supprimées dans les 30 jours suivant la résiliation.</p>

          <p style={{ marginTop: '1rem' }}><strong style={{ color: '#e8e4dc' }}>Sous-traitants :</strong></p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '.5rem' }}>
            <li><strong style={{ color: '#e8e4dc' }}>Supabase</strong> — stockage des données (USA, clauses contractuelles types UE)</li>
            <li><strong style={{ color: '#e8e4dc' }}>Stripe</strong> — paiements (USA, certifié PCI-DSS)</li>
            <li><strong style={{ color: '#e8e4dc' }}>Vercel</strong> — hébergement (USA, clauses contractuelles types UE)</li>
          </ul>
        </Section>

        <Section title="6. Cookies">
          <p>
            SimuImmo utilise uniquement des cookies fonctionnels nécessaires à l'authentification (session Supabase).
            Aucun cookie publicitaire ni de tracking tiers n'est déposé sans votre consentement.
            Stripe peut déposer des cookies lors du paiement, conformément à sa propre politique de confidentialité.
          </p>
        </Section>

        <Section title="7. Propriété intellectuelle">
          <p>
            L'ensemble du service SimuImmo (code, design, contenu) est la propriété exclusive de son éditeur.
            Toute reproduction sans autorisation écrite est interdite.
          </p>
        </Section>

        <Section title="8. Limitation de responsabilité">
          <p>
            SimuImmo fournit des estimations sur la base des données saisies par l'utilisateur.
            L'éditeur ne saurait être tenu responsable de décisions financières prises sur la base de ces simulations.
            Le service est fourni « tel quel » sans garantie de disponibilité permanente.
          </p>
        </Section>

        <Section title="9. Droit applicable">
          <p>
            Les présentes CGU sont soumises au droit français.
            Tout litige relève de la compétence des tribunaux français.
          </p>
        </Section>

        <div style={{ marginTop: '3rem', padding: '1rem', background: '#0e1118', borderRadius: 10, fontSize: 12, color: 'rgba(232,228,220,0.4)', textAlign: 'center' }}>
          Questions ? Contactez-nous à <strong style={{ color: 'rgba(232,228,220,0.6)' }}>[contact@votre-domaine.fr]</strong>
        </div>
      </main>
    </div>
  )
}
