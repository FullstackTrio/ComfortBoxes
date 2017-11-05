import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { removeBoxFromShoppingCart, getCopyOfShoppingCart, removeOneInstanceOfProductFromBox } from '../shoppingCart'
import { thunkGetCurrentCart } from '../store/cart'
import { connect } from 'react-redux'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.arrayOfBoxIds = Object.keys(this.props.cart).map(id => Number(id))
  }

  componentDidMount () {
    this.props.thunkGetCurrentCart(getCopyOfShoppingCart());
  }

  deleteBox (boxId) {
    removeBoxFromShoppingCart(boxId);
    this.props.thunkGetCurrentCart(getCopyOfShoppingCart());
  }

  deleteProduct (productId, boxId, category) {
    if (category !== 'Box'){
      removeOneInstanceOfProductFromBox(productId, boxId);this.props.thunkGetCurrentCart(getCopyOfShoppingCart());
    } else {
      alert('Cannot delete box product from box.')
    }
  }

  render() {
    const cart = this.props.cart;
    return (
      <div id='cartPage'>
        {
          Object.keys(cart).map((boxId, index) => (
            <div className='boxItem' key={boxId}>
              <div className='boxHead'>
                <h4>Box {index + 1}</h4>
                <button
                  onClick={() => this.deleteBox(boxId)}>Delete Box</button>
              </div>
              <ul>
              {
                cart[boxId].map((product, ind) => {
                  return (
                    <li key={ind}>
                      <img src={product.img} />
                      <div>{product.title}</div>
                      <div>${product.price}</div>
                      <button
                        onClick={() => this.deleteProduct(product.id, boxId, product.categories[0].title)}>REMOVE</button>
                    </li>
                  )
                })
              }
              </ul>
              <hr />
              <br />
            </div>
          ))
        }
        <Link to={'/checkout'}>
        <button>Checkout</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps, {thunkGetCurrentCart})(Cart)
