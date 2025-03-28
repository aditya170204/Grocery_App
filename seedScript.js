import "dotenv/config.js";
import mongoose from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";
const uri =
  "mongodb+srv://aditya1234:kSzX2XEiPqUC1xhp@cluster0.1f1s8.mongodb.net/testdb?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

async function seedDataBase() {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // await Product.deleteMany({});
    // await Category.deleteMany({});

    // const categoryDocs = await Category.insertMany(categories);
    // const categoryMap = categoryDocs.reduce((map, category) => {
    //   map[category.name] = category._id;
    //   return map;
    // }, {});
    // const productWithCategoryIds = products.map((product) => ({
    //   ...product,
    //   category: categoryMap[product.category],
    // }));

    // await Product.insertMany(productWithCategoryIds);

    // console.log("DATABASE SEEDED SUCCESSFULLY");
  } catch (error) {
    console.log("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDataBase();
r;
