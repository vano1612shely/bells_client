import { ArrowLeft } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Card } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'

const sections = [
  {
    title: '1. Préambule',
    items: [
      'Les présentes Conditions Générales de Vente (CGV) régissent les relations entre VRE-DECO.com (ci-après « le Vendeur ») et toute personne physique ou morale passant une commande sur le site.',
      'En cochant la case « J’accepte » lors du processus de commande, le Client déclare avoir lu, compris et accepté sans réserve les présentes CGV.',
    ],
  },
  {
    title: '2. Produits',
    items: [
      'Les produits proposés sur VRE-DECO.com sont des créations artisanales et/ou personnalisées, réalisées à la main.',
      'Chaque pièce peut présenter des variations (couleurs, textures, dimensions) par rapport aux photos, du fait de sa fabrication artisanale.',
      'Lorsqu’un produit est personnalisé ou fabriqué « sur mesure », le Client fournit des spécifications (dimensions, couleurs, finitions, etc.) lors de la commande.',
    ],
  },
  {
    title: '3. Commande',
    items: [
      'Pour passer commande, le Client doit fournir des informations exactes et complètes (adresse, coordonnées, informations de paiement).',
      'Le bouton de confirmation de commande doit clairement indiquer que la commande entraîne une obligation de paiement, conformément à l’article L. 221-14 du Code de la consommation.',
      'Après validation, le Client reçoit une confirmation de commande par e-mail contenant les informations essentielles (produit, prix, frais de livraison, délai de fabrication).',
    ],
  },
  {
    title: '4. Prix et paiement',
    items: [
      'Les prix indiqués sur le site sont en euros (€), toutes taxes comprises (TVA incluse).',
      'Le paiement s’effectue en ligne lors de la commande, ou selon les modalités précisées sur le site (acompte, solde, etc.).',
      'Aucun processus de production ne commence avant la réception du paiement selon les modalités convenues.',
    ],
  },
  {
    title: '5. Livraison',
    items: [
      'Le délai de fabrication des créations artisanales est indiqué sur la page produit ou au moment de la commande.',
      'Une fois le produit prêt, il est expédié à l’adresse indiquée par le Client.',
      'Les frais et le mode de livraison sont précisés avant la validation de la commande.',
    ],
  },
  {
    title: '6. Droit de rétractation',
    items: [
      'Conformément aux dispositions légales (Code de la consommation, article L221-18 et suivants), le Client dispose d’un droit de rétractation de 14 jours calendaires à compter de la réception du produit.',
      'Cependant, le droit de rétractation ne s’applique pas aux produits personnalisés ou fabriqués selon les spécifications du consommateur (articles sur mesure), conformément à l’exception du Code de la consommation.',
      'Par conséquent, aucun remboursement ne sera effectué pour les commandes de produits artisanaux personnalisés sur mesure, dès lors que la production a commencé ou que la personnalisation est réalisée.',
      'Si, malgré tout, un retour serait accepté pour un produit non personnalisé (hors exception), le Client sera informé des conditions de retour (frais, adresse de retour, état du produit) au préalable.',
    ],
  },
  {
    title: '7. Responsabilité',
    items: [
      'Le Vendeur s’engage à livrer un produit conforme à sa description et aux spécifications demandées par le Client.',
      'Le Client est responsable de la véracité des données qu’il transmet (dimensions, couleurs, adresse, etc.).',
      'Le Vendeur ne peut être tenu responsable des dommages résultant d’une mauvaise utilisation ou d’un entretien inadapté du produit.',
    ],
  },
  {
    title: '8. Propriété intellectuelle',
    items: [
      'Tous les visuels, textes, dessins et créations présents sur le site sont protégés par le droit d’auteur et autres droits de propriété intellectuelle.',
      'Le Client s’interdit toute reproduction, utilisation ou diffusion des créations sans l’accord écrit du Vendeur.',
    ],
  },
  {
    title: '9. Modification des CGV',
    items: [
      'Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment.',
      'Les conditions applicables sont celles en vigueur au moment de la commande.',
    ],
  },
  {
    title: '10. Litiges',
    items: [
      'En cas de litige, le Client peut contacter le service client de VRE-DECO.com à l’adresse email / téléphone – à indiquer.',
      'Si aucune solution amiable n’est trouvée, le litige sera soumis aux tribunaux compétents conformément au droit français.',
    ],
  },
]

export const ConditionsGeneralesDeVentePage = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-6">
      <button
        onClick={() => navigate({ to: '/' })}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l’accueil
      </button>

      <Card className="p-8 space-y-6 shadow-lg">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-primary font-semibold">
            Informations légales
          </p>
          <h1 className="text-3xl font-bold">
            Conditions Générales de Vente — VRE-DECO.com
          </h1>
        </div>

        <Separator />

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ConditionsGeneralesDeVentePage
