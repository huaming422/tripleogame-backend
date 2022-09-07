const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const mongoose = require("mongoose");
const config = require("./config/config");
// Import routers.
const apiRouter = require("./routes/index");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./docs");
const swaggerJSDoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

// Connect database
mongoose
  .connect(config.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Initialize express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", apiRouter);

// Set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
