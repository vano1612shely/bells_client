import { createFileRoute } from '@tanstack/react-router'
import { ConditionsGeneralesDeVentePage } from '@/pages/conditions-generales-de-vente'

export const Route = createFileRoute('/conditions-generales-de-vente')({
  component: ConditionsGeneralesDeVentePage,
})
