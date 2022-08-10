"use strict";

var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/portfolio"; //IP database server
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connexio a la BD establerta");
    app.listen(port, () => {
      console.log("Servidor funcionant correctament");
    });
  })
  .catch((err) => console.log(err));
