const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/Auth");
require("./models/User");
require("./models/List");
require("./services/passport");

mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/persistRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
