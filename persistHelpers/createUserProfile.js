const mongoose = require("mongoose");
const utils = require("../services/utils");
const User = mongoose.model("users");
const List = mongoose.model("lists");

module.exports = async (googleId) => {
  const newUserProps = utils.getNewUserProps();
  newUserProps.googleId = googleId;

  const user = new User(newUserProps);
  const list = new List(utils.getNewListProps(user.settings.userId));
  user.productLists.push(list);

  return Promise.all([user.save(), list.save()]);
};
