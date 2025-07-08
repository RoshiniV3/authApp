import type { NextApiRequest, NextApiResponse } from 'next'
import { mockUsers } from '../../../helpers/user-db'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
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
