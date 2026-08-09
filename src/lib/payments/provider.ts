/* The UI must not know the payment provider. Stripe and Payrexx are both still
   on the table, so only this interface exists during the design pass. Nothing
   implements it yet.

   Constraints for later, so the UI does not promise anything wrong: TWINT is
   CHF only, has a cap per payment and knows no recurring payments. Membership
   fees therefore never run through a subscription flow. */

export type CheckoutLine = {
  bezeichnung: string
  betragRappen: number // CHF in Rappen, integer
  anzahl: number
}

export type CheckoutRequest = {
  referenz: string
  zeilen: CheckoutLine[]
  erfolgUrl: string
  abbruchUrl: string
}

export type CheckoutSession = {
  id: string
  weiterleitungUrl: string
}

export interface PaymentProvider {
  createCheckoutSession(request: CheckoutRequest): Promise<CheckoutSession>
}
