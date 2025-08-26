const express = require("express");
const app = express();
const startGRPC = require("./grpc");

const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

app.use("/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.SERVICE_PORT;

startGRPC();
app.listen(PORT, () => {
  console.log(`auth-service started listening on ${PORT}`);
})