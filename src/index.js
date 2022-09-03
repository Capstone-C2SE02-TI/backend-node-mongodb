const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
const routing = require("./routers");

app.use(morgan("dev"));
app.use(bodyParse.json());

routing(app);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/`);
});
