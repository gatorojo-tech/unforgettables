import axios from 'axios';
import { actionTypesSavable, actionTypesUtil } from './actionTypes.js';

export function changeUserName(newName) {
  return {
    type: actionTypesSavable.CHANGE_USER_NAME,
    newName,
    persistInfo: 'settings',
  }
}

export function deleteConnection(connectionId, sharedListsIds) {
  return {
    type: actionTypesSavable.DELETE_CONNECTION,
    connectionId,
    sharedListsIds,
    persistInfo: 'settings',
  }
}

export const addConnection = connectionId => async dispatch => {
  const connection = await axios.post(`/api/update_settings`,
    { connectionId, type: actionTypesUtil.ADD_CONNECTION });
  dispatch({ type: actionTypesUtil.ADD_CONNECTION, payload: connection.data });
};

export function changeNewProductPosition(newPosition) {
  return {
    type: actionTypesSavable.CHANGE_NEW_PRODUCT_POSITION,
    newPosition,
    persistInfo: 'settings',
  }
}
