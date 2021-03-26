const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const app = express();

//connect DB
connectDB();
const PORT = process.env.PORT;
// routing
app.use(express.json());
app.use("/api/contact", require("./routes/Contact"));

app.listen(PORT, (err) => {
  err ? console.error(err) : console.log("server is running");
});
