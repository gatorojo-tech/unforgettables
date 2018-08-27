const mongoose = require("mongoose");
const requestTypes = require("./requestTypes");
const User = mongoose.model("users");
const List = mongoose.model("lists");
const utils = require("../services/utils");

module.exports = async (req, res) => {
  switch (req.body.type) {
    case requestTypes.CHANGE_CURRENT_LIST_TITLE: {
      const user = await User.findOne({ googleId: req.user.googleId });
      await List.update({ _id: user.productLists[0] }, {title: req.body.newTitle});
      res.send();
      break;
    }

    case requestTypes.ADD_PRODUCT:
    case requestTypes.CLEAR_CURRENT_LIST:
    case requestTypes.DELETE_SELECTED_PRODUCTS:
    case requestTypes.MARK_PRODUCT_AS_BOUGHT:
    case requestTypes.EDIT_PRODUCT: {
      const user = await User.findOne({ googleId: req.user.googleId });
      let list = await List.findOne({ _id: user.productLists[0] });
      const currentDate = Date.now();

      list = utils.handlePersistProductOperation(list, req.body.type, req.body);
      list.lastAmendmentsDate = currentDate;

      await list.save();
      res.send({currentDate});
      break;
    }

    default:
      res.send();
  }
};
