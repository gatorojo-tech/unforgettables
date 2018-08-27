import { actionTypesSavable, actionTypesUtil } from '../actions/actionTypes.js';

function productLists(state = [], action) {
  const newState = [...state];

  switch (action.type) {
    case actionTypesUtil.FETCH_USER:
      return action.payload.productLists || {};

    case actionTypesSavable.CHANGE_CURRENT_LIST_TITLE:
      newState[0].title = action.newTitle;
      return newState;
  
    case actionTypesUtil.CLEAR_CURRENT_LIST:
      newState[0].products = [];
      newState[0].lastAmendmentsDate = action.currentDate;
      return newState;
  
    case actionTypesUtil.DELETE_SELECTED_PRODUCTS:
      if (action.saveNeeded) {
        newState[0].products = newState[0].products.filter(product => {
          return !action.productsToDelete.includes(product.id);
        });
        newState[0].lastAmendmentsDate = action.currentDate;
      }
      return newState;
  
    case actionTypesUtil.ADD_PRODUCT:
      if (action.productPosition === 'top') {
        newState[0].products = [action.productData, ...newState[0].products];
      } else if (action.productPosition === 'bottom') {
        newState[0].products = [...newState[0].products, action.productData];
      }
      newState[0].lastAmendmentsDate = action.currentDate;
      return newState;

    case actionTypesUtil.MARK_PRODUCT_AS_BOUGHT:
      newState[0].products.forEach(product => {
        if (product.id === action.productId) {
          product.bought = !product.bought;
        }
      });
      newState[0].lastAmendmentsDate = action.currentDate;
      return newState;

    case actionTypesUtil.EDIT_PRODUCT:
      if (action.saveNeeded) {
        newState[0].products = newState[0].products.map(product => {
          if (product.id === action.productData.id) {
            product = {...action.productData};
          }
          return product;
        });
        newState[0].lastAmendmentsDate = action.currentDate;
      }
      return newState;
  
    case actionTypesSavable.REMOVE_LIST:
      return newState.filter(list => {
        return list.id !== action.listId;
      });
  
    case actionTypesSavable.POSITION_AS_FIRST:
      const listIndex = newState.findIndex(list => list.id === action.listId);
      return [newState[listIndex], ...newState.slice(0, listIndex),
        ...newState.slice(listIndex + 1)];
  
    case actionTypesSavable.SHARE_LIST_WITH_CONNECTION:
      return newState.map(list => {
        if (list.id === action.listId) {
          if (!list.updatedConnections) list.updatedConnections = {};
          list.updatedConnections[action.connectionId] = {
            id: action.connectionId,
            name: action.connectionName,
          };

          list.sharedWith.push(action.connectionId);
        }
        return list;
      });
  
    case actionTypesSavable.DELETE_CONNECTION:
      if (!action.sharedListsIds.length) return newState;
      
      return newState.map(list => {
        if (action.sharedListsIds.includes(list.id)) {
          list.sharedWith = list.sharedWith.filter(connectionId => {
            return connectionId !== action.connectionId;
          });
        }
        return list;
      });

    case actionTypesUtil.PROVIDE_USER_DATA:
      return [...action.userData.productLists];

    case actionTypesUtil.ADD_NEW_LIST:
      newState.push(action.newList);
      return newState;
      
    default:
      return state;
  }
}
export default productLists;
