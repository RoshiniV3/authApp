import { NextApiRequest, NextApiResponse } from "next"

export function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Allow any localhost origin
  const origin = req.headers.origin
  if (origin && /^http:\/\/localhost(:\d+)?$/.exec(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function handleCorsOptions(req: NextApiRequest, res: NextApiResponse): boolean {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return true
  }
  return false
}