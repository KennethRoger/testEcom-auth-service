const jwt = require("jsonwebtoken");

function GenerateToken(call, callback) {
  try {
    const userData = call.request;

    const token = jwt.sign(
      { _id: userData._id, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    callback(null, { success: true, token });
  } catch (err) {
    callback(err, { success: false, token: "" });
  }
}

module.exports = GenerateToken;
