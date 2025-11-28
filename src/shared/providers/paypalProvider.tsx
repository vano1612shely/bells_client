import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || ''
const currency = import.meta.env.VITE_PAYPAL_CURRENCY || 'EUR'
// Apple Pay / Google Pay require a merchant id enabled in the PayPal account
const merchantId = import.meta.env.VITE_PAYPAL_MERCHANT_ID || ''
const walletComponents = merchantId ? ',applepay,googlepay' : ''

export const PaypalProvider = ({ children }: Props) => {
  if (!clientId) {
    console.warn(
      'PayPal client ID is missing, rendering without PayPal scripts',
    )
    return children
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency,
        intent: 'capture',
        // load Apple Pay / Google Pay only when merchant id is configured to avoid SDK 400
        components: `buttons${walletComponents}`,
        ...(merchantId
          ? {
              merchantId,
              enableFunding: ['card', 'applepay', 'googlepay'],
            }
          : {}),
      }}
    >
      {children}
    </PayPalScriptProvider>
  )
}
