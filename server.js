const express = require("express");
const mongoose = require("mongoose");
const TaskRoutes = require("./routes/TaskRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT || 3000;

///////ROUTES///////
app.use("/tasks", TaskRoutes);

//CORS//
const corsConfig = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsConfig));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected.");
    app.listen(port, () => {
      console.log("server started");
    });
  })
  .catch((err) => console.log(err));
