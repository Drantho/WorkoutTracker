const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));


app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const exphbs = require("express-handlebars");

require('dotenv').config()

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    helpers: {
      "json": function (context) {
        return JSON.stringify(context, null, 4);
      }
    }
}));
app.set("view engine", "handlebars");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });

const routes = require("./controllers/controller.js");


app.use(routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`App now listening on port: ${PORT} view at: http://localhost:${PORT}`);
});