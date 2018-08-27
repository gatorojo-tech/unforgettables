const mongoose = require("mongoose");
const User = mongoose.model("users");
const requestTypes = require("../persistHelpers/requestTypes");

module.exports = {
  createUniqueId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
  },

  getNewUserProps() {
    return {
      settings: {
        userId: this.createUniqueId(),
        userName: 'New User',
        lastAmended: Date.now(),
        connections: [],
        preferences: {
          newProductPosition: 'top'
        }
      }
    };
  },

  getNewListProps(userId) {
    return {
      id: this.createUniqueId(),
      title: 'My new List',
      sharedWith: [userId],
      creationDate: Date.now(),
      lastAmendmentsDate: Date.now(),
      products: [],
    }
  },

  correctSharedWith(userProfile) {
    const user = {...userProfile};
    const id = user.settings.userId;

    user.productLists.forEach(list => {
      list.sharedWith = list.sharedWith.filter(connection => connection !== id);
    });
    return user;
  },

  async populateConnections (userProfile) {
    const user = {...userProfile};
    const populatedConnections = [];

    for (let connection of user.settings.connections) {
      const { settings } = await User.findOne({ 'settings.userId': connection.id });
      connection.name = settings.userName;
      populatedConnections.push(connection);
    }

    user.settings.connections = populatedConnections;
    return user;
  },

  async populateListConnections (userProfile) {
    const user = {...userProfile};
    const populatedConnections = {};

    for (let list of user.productLists) {
      let listConnections = {};

      for (let userId of list.sharedWith) {
        if (!populatedConnections[userId]) {
          const connection = await User.findOne({ 'settings.userId': userId });

          populatedConnections[userId] = {
            id: userId,
            name: connection.settings.userName,
          };
        }
        listConnections[userId] = populatedConnections[userId];
      }
      list.updatedConnections = listConnections;
    }
    return user;
  },

  handlePersistProductOperation(list, actionType, data) {
    switch (actionType) {
      case requestTypes.ADD_PRODUCT: {
        if (data.productPosition === 'top') {
          list.products = [data.productData, ...list.products];
        } else if (data.productPosition === 'bottom') {
          list.products = [...list.products, data.productData];
        }
        return list;
      }

      case requestTypes.CLEAR_CURRENT_LIST: {
        list.products = [];
        return list;
      }

      case requestTypes.DELETE_SELECTED_PRODUCTS: {
        list.products = list.products.filter(product => {
          return !data.productsToDelete.includes(product.id);
        });
        return list;
      }

      case requestTypes.MARK_PRODUCT_AS_BOUGHT: {
        list.products = list.products.map(product => {
          if (product.id === data.productId) {
            product.bought = !product.bought;
          }
          return product;
        });
        return list;
      }

      case requestTypes.EDIT_PRODUCT: {
        list.products = list.products.map(product => {
          if (product.id === data.productData.id) {
            product = {...data.productData};
          }
          return product;
        });
        return list;
      }

      default:
        return list;
    }
  },
};
