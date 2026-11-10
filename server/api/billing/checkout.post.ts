export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const config = useRuntimeConfig()

  // Creates a Whop checkout for the single subscription variant.
  // customer_id ties the resulting membership back to this user.
  const res = await fetch(`${config.whopApiBase}/checkout_configurations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.whopApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      variant_id: config.whopVariantId,
      metadata: { customer_id: session.user.id },
      redirect_url: `${config.public.siteUrl}/university`
    })
  })

  if (!res.ok) {
    throw createError({ statusCode: 502, statusMessage: 'Could not start checkout' })
  }

  const checkout = await res.json() as { purchase_url: string }
  return { url: checkout.purchase_url }
})
