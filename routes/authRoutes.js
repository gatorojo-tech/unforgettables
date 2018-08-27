const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const utils = require("../services/utils");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => res.redirect("/")
  );

  app.get("/api/current_user", async (req, res) => {
    if (req.user) {
      try {
        const {settings, productLists} = await User
          .findOne({ googleId: req.user.googleId })
          .populate('productLists');

        let userProfile = utils.correctSharedWith({settings, productLists});
        userProfile = await utils.populateConnections(userProfile);
        userProfile = await utils.populateListConnections(userProfile);

        res.send(userProfile);
      } catch(err) {
        res.status(500).send({description: 'Database issue'});
      }
    } else {
      res.send({});
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
