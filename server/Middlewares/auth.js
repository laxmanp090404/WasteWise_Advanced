const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
