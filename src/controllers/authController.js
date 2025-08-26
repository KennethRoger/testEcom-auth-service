const jwt = require("jsonwebtoken");

const throwError = require("../utils/errorObject");
const HttpStatus = require("../utils/httpStatusCodes");

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(throwError("Auth token not provided", HttpStatus.UNAUTHORIZED));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    res.status(200).json({
      success: true,
      message: "Token is valid!",
      data: decoded
    })
  } catch (err) {
    return next(throwError("Invalid or expired token", HttpStatus.FORBIDDEN));
  }
}

module.exports = { validateToken };