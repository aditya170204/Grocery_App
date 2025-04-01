import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";
import fastifysocketIO from "fastify-socket.io";
import { registerRoutes } from "./src/routes/index.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import mongoose from "mongoose";

// console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const start = async () => {
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
  await buildAdminRouter(app);

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Grocery_Base is running on http://localhost:${PORT}${admin.options.rootPath}`
      );
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
