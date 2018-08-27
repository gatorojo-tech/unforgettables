import axios from 'axios';
import { actionTypesSavable, actionTypesUtil } from './actionTypes.js';

export function changeCurrentListTitle(newTitle, saveNeeded) {
  return {
    type: actionTypesSavable.CHANGE_CURRENT_LIST_TITLE,
    newTitle,
    saveNeeded,
    persistInfo: 'products',
  }
}

export const clearCurrentList = () => async dispatch => {
  const response = await axios.post(`/api/update_products`,
    { type: actionTypesUtil.CLEAR_CURRENT_LIST });

  dispatch({ type: actionTypesUtil.CLEAR_CURRENT_LIST, currentDate: response.currentDate });
};

export const deleteSelectedProducts = (productsToDelete, saveNeeded) => async dispatch => {
  if (saveNeeded) {
    const response = await axios.post(`/api/update_products`,
      {
        productsToDelete,
        type: actionTypesUtil.DELETE_SELECTED_PRODUCTS
      });

    dispatch(
      {
        type: actionTypesUtil.DELETE_SELECTED_PRODUCTS,
        productsToDelete,
        saveNeeded,
        currentDate: response.data.currentDate,
      });
  } else {
    dispatch({type: actionTypesUtil.DELETE_SELECTED_PRODUCTS, saveNeeded});
  }
};

export const addProduct = (productData, productPosition) => async dispatch => {
  const response = await axios.post(`/api/update_products`,
    {
      productData,
      type: actionTypesUtil.ADD_PRODUCT,
      productPosition
    });

  dispatch(
    {
      type: actionTypesUtil.ADD_PRODUCT,
      productData,
      productPosition,
      currentDate: response.data.currentDate,
    });
};

export const markProductAsBought = (productId) => async dispatch => {
  const response = await axios.post(`/api/update_products`,
    {
      productId,
      type: actionTypesUtil.MARK_PRODUCT_AS_BOUGHT,
    });

  dispatch(
    {
      type: actionTypesUtil.MARK_PRODUCT_AS_BOUGHT,
      productId,
      currentDate: response.data.currentDate,
    });
};

export const editProduct = (productData, saveNeeded) => async dispatch => {
  if (saveNeeded) {
    const response = await axios.post(`/api/update_products`,
      {
        productData,
        type: actionTypesUtil.EDIT_PRODUCT
      });

    dispatch(
      {
        type: actionTypesUtil.EDIT_PRODUCT,
        productData,
        saveNeeded,
        currentDate: response.data.currentDate,
      });
  } else {
    dispatch({type: actionTypesUtil.EDIT_PRODUCT, saveNeeded});
  }
};
