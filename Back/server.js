const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/userRouter");
const menuRouter = require("./Routes/menuRouter");
const orderRouter = require("./Routes/orders");
const maintenanceRouter = require("./Routes/maintenanceRouter");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(menuRouter);
app.use(orderRouter);
app.use(maintenanceRouter);
app.use("/public", express.static(path.join(__dirname, "public")));
const port = process.env.PORT;
const dbUrl = process.env.DBURL;

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbUrl)
      .then(() => console.log("connected to mongoDB"))
      .then(() => {
        app.listen(port, () => {
          console.log(`server is running on port ${port}`);
        });
      });
  },
};
