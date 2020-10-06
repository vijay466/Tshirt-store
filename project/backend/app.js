require("dotenv").config();


const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBroutes = require("./routes/paymeent");
const { ADDRGETNETWORKPARAMS } = require("dns");
const { AddOns } = require("braintree");

//DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected|||");
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBroutes);


//PORT
const port = process.env.PORT || 8000;


if(process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("projfrontend/build"));
}


//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
