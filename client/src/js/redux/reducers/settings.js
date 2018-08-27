import { actionTypesSavable, actionTypesUtil } from '../actions/actionTypes.js';

function settings(state = {}, action) {
  const newState = {...state};

  switch (action.type) {
    case actionTypesUtil.FETCH_USER:
      return action.payload.settings || {};

    case actionTypesSavable.CHANGE_USER_NAME:
      newState.userName = action.newName;
      return newState;
  
    case actionTypesSavable.DELETE_CONNECTION:
      newState.connections = newState.connections.filter(connection => {
        return connection.id !== action.connectionId;
      });
      return newState;
  
    case actionTypesUtil.ADD_CONNECTION:
      newState.connections.push({
        id: action.payload.id,
        name: action.payload.name,
        sharedListsIds: action.payload.sharedListsIds,
        error: action.payload.error,
      });
      return newState;

    case actionTypesSavable.CHANGE_NEW_PRODUCT_POSITION:
      newState.preferences.newProductPosition = action.newPosition;
      return newState;
  
    case actionTypesSavable.REMOVE_LIST:
      newState.connections = newState.connections.map(connection => {
        connection.sharedListsIds = connection.sharedListsIds.filter(listId => {
          return listId !== action.listId;
        });
        return connection;
      });
      return newState;
  
    case actionTypesSavable.SHARE_LIST_WITH_CONNECTION:
      newState.connections = newState.connections.map(connection => {
        if (connection.id === action.connectionId) connection.sharedListsIds.push(action.listId);
        return connection;
      });
      return newState;

    case actionTypesUtil.PROVIDE_USER_DATA:
      return {...action.userData.settings};
      
    default:
      return state;
  }
}

export default settings;
