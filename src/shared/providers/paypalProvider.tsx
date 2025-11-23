import type { ReactNode } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

type Props = {
  children: ReactNode
}
const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || ''
const currency = import.meta.env.VITE_PAYPAL_CURRENCY || 'EUR'

export const PaypalProvider = ({ children }: Props) => {
  if (!clientId) {
    console.warn('PayPal client ID is missing, rendering without PayPal scripts')
    return children
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': clientId,
        currency,
        intent: 'capture',
        components: 'buttons',
      }}
    >
      {children}
    </PayPalScriptProvider>
  )
}
