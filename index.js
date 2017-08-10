const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/User");
require("./models/Profile");

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

require("./routes/profileRoutes")(app);

const PORT = process.env.PORT || 5000;
//const server = http.createServer(app);
//server.listen(port);
app.listen(PORT);
console.log("server listening on:", PORT);
