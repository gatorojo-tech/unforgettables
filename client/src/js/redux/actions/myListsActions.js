import axios from 'axios';
import { actionTypesSavable, actionTypesUtil } from './actionTypes.js';

export function removeList(listId) {
  return {
    type: actionTypesSavable.REMOVE_LIST,
    listId,
    persistInfo: 'lists',
  }
}

export function positionListAsFirst(listId) {
  return {
    type: actionTypesSavable.POSITION_AS_FIRST,
    listId,
    persistInfo: 'lists',
  }
}

export function shareListWithConnection(listId, connectionId, connectionName) {
  return {
    type: actionTypesSavable.SHARE_LIST_WITH_CONNECTION,
    listId,
    connectionId,
    connectionName,
    persistInfo: 'lists',
  }
}

export const addNewList = () => async dispatch => {
  const newList = await axios.post(`/api/update_lists`,
    { type: actionTypesUtil.ADD_NEW_LIST});

  dispatch({ type: actionTypesUtil.ADD_NEW_LIST, newList: newList.data });
};
