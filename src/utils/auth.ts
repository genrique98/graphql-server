import express from 'express'
import jwt, { Secret } from 'jsonwebtoken'

function getTokenPayload(token: string): string | jwt.JwtPayload {
    const { TOKEN_SECRET } = process.env;
    return jwt.verify(token, TOKEN_SECRET as Secret);
}

export function getUserId(req: express.Request, authToken?: string): string | jwt.JwtPayload {

  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        throw new Error('No token found');
      }
      const userId = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {

    const userId = getTokenPayload(authToken);
    return userId;
  }
  
  throw new Error('Hey: Not authenticated');
}

