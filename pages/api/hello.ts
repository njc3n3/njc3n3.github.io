// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { VercelRequest, VercelResponse } from '@vercel/node'

export default (_req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ name: 'John Doe' })
}
