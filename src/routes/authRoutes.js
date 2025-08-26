const express = require("express");
const router = express.Router();

const { validateToken } = require("../controllers/authController");

router.post("/validate", validateToken);

module.exports = router;