import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";
import fastifysocketIO from "fastify-socket.io";
import registerRoutes from "./src/routes/index.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = fastify();
  app.register(fastifysocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });
  await registerRoutes(app);
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Grocery_Base is running on http://localhost:${PORT}`);
    }
  });
  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinroom", (orderId) => {
        socket.join(orderId);
        console.log(`User joined room ${orderId}`);
      });
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  });
};
start();
