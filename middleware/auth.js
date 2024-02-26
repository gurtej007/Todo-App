const jwt = require('jsonwebtoken');
const JWT_SECRET = "gurtej";

module.exports = (req, res, next) => {
  try {
    const token = req.headers['auth-token'];
   

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const val = jwt.verify(token, JWT_SECRET);
    console.log('Token verified:', val);
    req.id = val.id;
    
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      console.log('Invalid token');
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expired');
      return res.status(401).json({ error: 'Token expired' });
    } else {
      console.log('Internal server error');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
