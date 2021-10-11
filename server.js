const express = require("express");
const middleware = require("./utils/middleware");

const app = express();
middleware(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('express is listening on:', PORT));