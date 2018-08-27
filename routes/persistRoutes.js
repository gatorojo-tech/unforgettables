const requireLogin = require("../middlewares/requireLogin");
const persistLists = require("../persistHelpers/persistLists");
const persistProducts = require("../persistHelpers/persistProducts");
const persistSettings = require("../persistHelpers/persistSettings");

module.exports = app => {
  app.post("/api/update_lists", requireLogin, async (req, res) => {
    await persistLists(req, res);
  });

  app.post("/api/update_products", requireLogin, async (req, res) => {
    await persistProducts(req, res);
  });

  app.post("/api/update_settings", requireLogin, async (req, res) => {
    await persistSettings(req, res);
  });
};
