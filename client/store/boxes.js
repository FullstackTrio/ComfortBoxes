import axios from 'axios';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories () {
  return (dispatch, getState) => {
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch({
          type: FETCH_CATEGORIES,
          categories
        });
      })
  }
}

export default function(state = [], action){
  switch (action.type){
    case FETCH_CATEGORIES:
      return action.categories;

    default:
      return state;
  }
}
