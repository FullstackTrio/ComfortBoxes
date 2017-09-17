import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBoxInShoppingCart, getCopyOfShoppingCart, addProductToBox } from '../shoppingCart'

/**
 * ProductList component:
 *   When user clicks a category Link from CategoryList,
 *   corresponding Route is rendered here
 *
 * Products component:
 *   Renders all products of a category
 */
export default function ProductList ({categories}) {
  return (
    <Switch>
      {
        categories.map((category, i) =>
          <Route
            key={i}
            path={`/buildbox/${category.title}`}
            render={() => <Products category={category} />}
          />
        )
      }
    </Switch>
  );
}

function Products ({category}) {

  const addProductToCart = function (event) {
    event.preventDefault()
    const shoppingCart = getCopyOfShoppingCart()
    const currentBox = localStorage.getItem('currentBoxId')
    console.log(shoppingCart, currentBox)
    if (shoppingCart[currentBox] && category.title === 'Box'){
      console.error('Only one box per box!')
    } else if (shoppingCart[currentBox] || category.title === 'Box') {
      addProductToBox(event.target.name)
    } else {
      console.error('Must select a box before other items!');
    }
    console.log('shopping cart: ', getCopyOfShoppingCart())
  }


  return (
    <div className='productList'>
      {
        category.products.map(product => {
          return (
            <div key={product.id} className='product'>
              <img src={product.img}/>
              <div>{product.title}</div>
              <button name={product.id} onClick={addProductToCart}>Add</button>
            </div>
          )
        })
      }
    </div>
  );
}