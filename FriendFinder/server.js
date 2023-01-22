
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const htmlRoutes = require("./app/routing/htmlRoutes.js");
const apiRoutes = require("./app/routing/apiRoutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  