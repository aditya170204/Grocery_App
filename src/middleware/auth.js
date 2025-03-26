import jwt from "jsonwebtoken";

export const verifyToken = async (req, reply) => {
  try {
    const authReader = req.headers["authorization"];
    if (!authReader || !authReader.startsWith("Bearer ")) {
      return reply.code(401).send({ message: "Access token required" });
    }
    const token = authReader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    return true;
  } catch (error) {
    console.log(error);
    return reply.code(403).send({ error: "Invalid or expired token" });
  }
};
