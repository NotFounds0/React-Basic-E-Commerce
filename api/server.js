const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const port = 5000;

const productRouter = require("./Router/ProductsRouter");
const UserRouter = require("./Router/UserRouter");
app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", UserRouter);

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
