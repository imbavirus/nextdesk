//app/api/protected/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

/**
 * @openapi
 * Protected route handler
 * @desc: Handle protected API requests with session validation
 * @auth: session
 * @params: ProtectedRequest
 * @response: ProtectedResponse
 */
export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Your logic to handle the incoming request
  const { deviceInfo, id, op, uuid } = req.body;

  // Make sure to process the incoming data as needed
  if (op === 'google') {
    // Handle the request specific to Google authentication
    return res.status(200).json({ message: 'Authenticated with Google', data: { deviceInfo, id, uuid } });
  }

  res.status(400).json({ message: 'Invalid operation' });
}
