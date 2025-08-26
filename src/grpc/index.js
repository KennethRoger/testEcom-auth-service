const path = require("node:path");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const GenerateToken = require("./methods/GenerateToken");

const PROTO_PATH = path.join(__dirname, "../../proto/auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });

const grpcObj = grpc.loadPackageDefinition(packageDefinition)
const auth = grpcObj.auth;

function startGRPC() {
  const server = new grpc.Server();
  const PORT = process.env.GRPC_PORT;

  server.addService(auth.AuthService.service, { GenerateToken });
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Failed to bind gRPC server:", err);
      return;
    }
    console.log(`grpc server started on ${port}`);
  });
}

module.exports = startGRPC;