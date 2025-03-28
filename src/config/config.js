import "dotenv/config";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";

import { Admin } from "../models/index.js";

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("Session store error", error);
});

export const authenticate = async (email, password) => {
  //UNCOMMENT when CREATING ADMIN FIRST TIME

  if (email && password) {
    if (user.email === "aditya@data.com" && user.password === "1223334444") {
      return Promise.resolve({ email: email, password: password });
    } else {
      return null;
    }
  }

  //UNCOMMENT THIS  AFTER CREATING ADMIN MANUALLY ON DATABASE

  // if(email&&password){
  //   const user=await Admin.findOne({email})
  //   if(!user){
  //     return null
  //   }
  //   if (user.password===password){
  //     return Promise.resolve({email:email,password:password})
  //   }else{
  //     return null
  //   }
};
