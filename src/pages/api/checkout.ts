// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorMessage = {
  message: string
}
type Data = {
  session: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>,
) {

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const resp = await fetch(`${process.env.MENTIUM_API_URL}/checkout/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.MENTIUM_API_KEY!,
      },
      body: JSON.stringify({
        "amount": 25.05,
        "orderId": "order-1234",
        "payer": {
          "email": "matthieuberger84@gmail.com",
          "firstName": "Matthieu",
          "lastName": "Berger"
        },
      }),
    })
  
    const { sessionLink } = await resp.json();
    res.status(200).json({ session: sessionLink })
  } catch (e) {
    console.error("Error: ", e)
    res.status(400)
  }
}
