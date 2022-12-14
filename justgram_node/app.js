const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./routes");

const app = express();
app.use(express.json()); //req.body undefined 에러 해결(아마 express사용시 발생하는 에러인듯? 전에는 body-parser Install해서 해결한 기억이 있는데 그게 express 업데이트 되면서 express내장 기능으로 추가 된듯)
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(morgan("combined"));
app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "success" });
});

module.exports = app;

// const express = require("express");

// const dotenv = require("dotenv");
// dotenv.config();
// const router = require("./routes");

// const createApp = () => {
//   const app = express();

//   app.use(express.json());
//   app.use(router);

//   return app;
// };

// module.exports = { createApp };
