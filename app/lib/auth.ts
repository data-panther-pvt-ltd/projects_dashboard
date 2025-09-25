import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const COOKIE_NAME = 'auth_token';

export type JwtPayload = {
  userId: string;
  organizationId: string;
};

export function signToken(payload: JwtPayload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function createAuthCookie(token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60};${
    isProd ? ' Secure;' : ''
  }`;
}

export function clearAuthCookie() {
  const isProd = process.env.NODE_ENV === 'production';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;${isProd ? ' Secure;' : ''}`;
}

export function getCookieName() {
  return COOKIE_NAME;
}


