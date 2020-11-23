'use strict';

require('dotenv').config()

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
//const routes = require('./routes')
//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const stateRoutes = require("./routes/state");
const cityRoutes = require("./routes/city");
const categoryRoutes = require("./routes/category");
const feedbackRoutes = require("./routes/feedback");
const albumRoutes = require("./routes/album");
const photoRoutes = require("./routes/photo");


mongoose.Promise = global.Promise;
//Db Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
//Middlewares
//app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'))
//app.use(express.static(path.join(__dirname, './', 'uploads')))
app.use(cookieparser());
app.use(cors());

//cors(app);
//cors(routes);
 
//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", stateRoutes);
app.use("/api", cityRoutes);
app.use("/api", categoryRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", albumRoutes);
app.use("/api/photo", photoRoutes);

//Port
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
