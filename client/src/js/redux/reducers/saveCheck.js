import { actionTypesSavable, actionTypesUtil } from '../actions/actionTypes.js';

function saveCheck(state = [], action) {
  if (action.type === actionTypesUtil.SAVE_SUCCESS) {
    return {...state, saveNeeded: false};
  } else if (actionTypesSavable[action.type]) {
    return {...state, saveNeeded: action.saveNeeded !== false };
  }
  return state;
}

export default saveCheck;
