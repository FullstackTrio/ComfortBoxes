/**
 * localStorage has id of box, products
 * {
  1: [12, 14, 8, 2, 19, 12],  // note that product ids may be repeated if customer purchased more than one of that item for that box
  3: [18, 6, 3, 24, 11],
  4: [22, 20, 7, 13, 9, 17, 18, 4]
}
 */

 /**
  * thunk with mapping
  */

import axios from 'axios';

const GET_CURRENT_CART = 'GET_CURRENT_CART';
const CLEAR_STORE_CART = 'CLEAR_STORE_CART';

export function clearStoreCart () {
  return (dispatch) => {
    dispatch({
      type: CLEAR_STORE_CART,
      cart: {}
    })
  }
}


export function thunkGetCurrentCart (cart) {

  return (dispatch, getState) => {

    let storeCart = {};
    const arrayOfBoxIds = Object.keys(cart);

    const outerPromiseArray = arrayOfBoxIds.map(boxId => {
      storeCart[boxId] = [];
      const promiseArray = cart[boxId].map(productId => {
        return axios.get(`/api/products/${productId}`)
        .then(res => res.data)
        .then(product => storeCart[boxId].push(product))
      })

      return Promise.all(promiseArray);
    })

    Promise.all(outerPromiseArray)
    .then(() => {
      dispatch({
        type: GET_CURRENT_CART,
        cart: storeCart,
      })
    })
  }
}

export default function(state = {}, action){
  switch (action.type){
    case GET_CURRENT_CART:
      return action.cart;
    case CLEAR_STORE_CART:
      return action.cart;
    default:
      return state;
  }
}
