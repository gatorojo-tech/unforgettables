const mongoose = require("mongoose");
const requestTypes = require("./requestTypes");
const utils = require("../services/utils");
const User = mongoose.model("users");
const List = mongoose.model("lists");

module.exports = async (req, res) => {
  switch (req.body.type) {
    case requestTypes.ADD_NEW_LIST: {
      const user = await User.findOne({ googleId: req.user.googleId });
      const newListProps = utils.getNewListProps(user.settings.userId);
      const list = new List(newListProps);
      user.productLists.push(list);
      await Promise.all([user.save(), list.save()]);

      res.send(newListProps);
      break;
    }

    case requestTypes.POSITION_AS_FIRST: {
      const user = await User
        .findOne({ googleId: req.user.googleId })
        .populate('productLists');

      const listIndex = user.productLists.findIndex(list => list.id === req.body.listId);
      user.productLists = [user.productLists[listIndex], ...user.productLists.slice(0, listIndex),
        ...user.productLists.slice(listIndex + 1)];

      await user.save();
      res.send();
      break;
    }

    case requestTypes.REMOVE_LIST: {
      const user = await User
        .findOne({ googleId: req.user.googleId })
        .populate('productLists');
      const list = await List.findOne({ id: req.body.listId });

      user.productLists = user.productLists.filter(list => {
        return list.id !== req.body.listId;
      });
      await user.save();

      if (list.sharedWith.length === 1) {
        await list.remove();
      } else {
        list.sharedWith = list.sharedWith.filter(connectionId => connectionId !== user.settings.userId);
        await list.save();
      }
      res.send();
      break;
    }

    case requestTypes.SHARE_LIST_WITH_CONNECTION: {
      const list = await List.findOne({ id: req.body.listId });
      list.sharedWith.push(req.body.connectionId);

      const user = await User.findOne({ 'settings.userId': req.body.connectionId });
      user.productLists.push(list);

      await Promise.all([user.save(), list.save()]);
      res.send();
      break;
    }

    default:
      res.send();
  }
};
