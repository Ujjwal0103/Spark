const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", // React app running on localhost:3000
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ msg: "This is Example" });
});

app.listen(PORT, () => {
  console.log("Server is running");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/upload"));

//connect MONGODB

const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
