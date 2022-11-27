const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./db/db");
const router = require(`./api/routes/route`);
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(400).send({
    msg: "server started running",
  });
});

connect();
app.use("/api", router);

app.listen(PORT, () => {
  console.log("server started............");
});
