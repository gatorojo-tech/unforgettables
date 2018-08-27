const mongoose = require("mongoose");
const requestTypes = require("./requestTypes");
const User = mongoose.model("users");

module.exports = async (req, res) => {
  switch (req.body.type) {
    case requestTypes.CHANGE_USER_NAME: {
      await User.update({ googleId: req.user.googleId }, {"settings.userName": req.body.newName},
        function(err){if (err) return res.status(500).send({error: err})});
      res.send();
      break;
    }

    case requestTypes.ADD_CONNECTION: {
      const connectionUser = await User
        .findOne({ 'settings.userId': req.body.connectionId });

      if (!connectionUser) {
        res.send({
          error: true,
          id: req.body.connectionId
        });
      } else {
        const responseData = {
          id: req.body.connectionId,
          sharedListsIds: [],
          name: connectionUser.settings.userName,
        };
        await User.update(
          { googleId: req.user.googleId },
          { $push: { 'settings.connections': responseData } }
        );
        res.send(responseData);
      }
      break;
    }

    case requestTypes.CHANGE_NEW_PRODUCT_POSITION: {
      await User
        .update({ googleId: req.user.googleId },
        {"settings.preferences.newProductPosition": req.body.newPosition},
        function(err){if (err) return res.status(500).send({error: err})});
      res.send();
      break;
    }

    case requestTypes.DELETE_CONNECTION: {
      const user = await User
        .findOne({ googleId: req.user.googleId })
      ;
      user.settings.connections = user.settings.connections.filter(connection => {
        return connection.id !== req.body.connectionId;
      });

      await user.save();
      res.send();
      break;
    }

    default:
      res.send();
  }
};
