// utils/auth.js
import jwt from 'jsonwebtoken';

// Verify JWT token
export function verifyToken(authHeader) {
  // Check if Authorization header exists
  if (!authHeader) {
    throw new Error('No authorization token provided');
  }

  // Extract token from header (Bearer token format)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Generate JWT token (optional, for reference)
export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '30d' 
    }
  );
}
