const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const GenerateToken = require("./methods/GenerateToken");

const PROTO_PATH = "../../proto/auth.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });

const grpcObj = grpc.loadPackageDefinition(packageDefinition)
const auth = grpcObj.auth;

function startGRPC() {
  const server = new grpc.Server();
  const PORT = process.env.GRPC_PORT;

  server.addService(auth.AuthService.service, { GenerateToken });
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());

  console.log(`grpc server started on ${PORT}`);
}

module.exports = startGRPC;