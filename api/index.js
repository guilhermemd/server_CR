const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas da API
const scheduleRoutes = require("../routes/scheduleRoutes");

app.use("/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Oi Express!" });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-classicriders.qmdgrez.mongodb.net/bancodaapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Contectamos on MongoDB!");
    app.listen(3001);
  })
  .catch((err) => console.log(err));
