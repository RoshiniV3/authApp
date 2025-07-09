import type { NextApiRequest, NextApiResponse } from 'next'
import { mockUsers } from '../../../lib/user-db'
import { setCorsHeaders, handleCorsOptions } from '../../../utils/cors'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCorsHeaders(req, res)

  if (handleCorsOptions(req, res)) {
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const user = mockUsers.find(u => u.username === username)

  if (!user) {
    return res.status(400).json({ message: 'Username not found' })
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' })
  }

  const token = Buffer.from(`${username}:${password}`).toString('base64')
  return res.status(200).json({ token, role: user.role })
}
