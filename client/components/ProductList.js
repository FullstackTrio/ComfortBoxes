import React, {Component} from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { getCopyOfTempShoppingCart, addProductToBox } from '../shoppingCart'
import { Notification } from 'react-notification'
import history from '../history'

/**
 * ProductList component:
 *   When user clicks a this.category Link from CategoryList,
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


class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      showSuccessNotification: false
    }
    this.addAProductToBox = this.addAProductToBox.bind(this)
  }


  addAProductToBox (event) {
    const {category} = this.props
    const shoppingCart = getCopyOfTempShoppingCart()
    const currentBox = localStorage.getItem('currentBoxId')
    if (shoppingCart[currentBox] && category.title === 'Box'){
      alert('Only one box type can be selected per box!');
      history.push('/buildbox/Sight');
    } else if ((shoppingCart[currentBox] && shoppingCart[currentBox].length <= 10) || category.title === 'Box') {
      addProductToBox(event.target.name)
      this.setState({showSuccessNotification: true});
      setTimeout(() => {
        this.setState({showSuccessNotification: false});
      }, 3000);
    } else if (shoppingCart[currentBox] && shoppingCart[currentBox].length > 10) {
        alert('Only 10 items may be selected per box (excluding box itself). Create another box in order to select more items!')
    } else {
      alert('Must select a box before other items!');
    }
  }
  render(){
    const {category} = this.props
    return (
      <div className='productList'>
        {
          category.products.map(product => {
            return (
              <div key={product.id} className='product'>
                <NavLink to={`/products/${product.id}`}>
                  <img src={product.img}/>
                </NavLink>
                <div>{product.title}</div>
                <button name={product.id} onClick={this.addAProductToBox}>Add</button>
                <Notification
                  isActive={this.state.showSuccessNotification}
                  message="Item successfully added to your box"
              />
              </div>
            )
          })
        }
      </div>
    )
  }
}

