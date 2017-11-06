
import React from 'react';
import { getCopyOfTempShoppingCart, addProductToBox } from '../shoppingCart'
import { fetchProduct } from '../store/product';
import { fetchCategories } from '../store/categories';
import { connect } from 'react-redux';
import { CategoryList } from '../components'
import { Notification } from 'react-notification'
import history from '../history'

export class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSuccessNotification: false
    }
    this.addProductToCart = this.addProductToCart.bind(this)
  }

  componentDidMount () {
    // fetch categories from DB
    this.props.fetchProduct(this.props.match.params.id)
    this.props.fetchCategories()
  }

  addProductToCart (event) {
    const shoppingCart = getCopyOfTempShoppingCart()
    const currentBox = localStorage.getItem('currentBoxId')
    const categoryTitle = this.props.product.categories[0].title
    if (shoppingCart[currentBox] && categoryTitle === 'Box'){
      alert('Only one box type can be selected per box!');
      history.push('/buildbox/Sight');
    } else if ((shoppingCart[currentBox] && shoppingCart[currentBox].length <= 10) || categoryTitle === 'Box') {
      addProductToBox(event.target.name)
      this.setState({showSuccessNotification: true});
      setTimeout(() => {
        this.setState({showSuccessNotification: false});
      }, 3000);
    } else if (shoppingCart[currentBox] && shoppingCart[currentBox].length > 10) {
        alert('Only 10 items may be selected per box (excluding box itself). Add current box to cart and then create another box in order to select more items!')
    } else {
      alert('Must select a box before other items!');
      history.push('/buildbox/Box');
    }
  }

  render () {

    return (
      <div id='detailsPage' className='productList'>
        <Notification
          isActive={this.state.showSuccessNotification}
          message={`Successfully added ${this.props.product.title} to your box`}
        />
        <CategoryList categories={this.props.categories} />
        <div id="backBtn">
          <button onClick={history.goBack}>{'<= '}Back</button>
        </div>
        <div key={this.props.product.id} className='product'>
          <img src={this.props.product.img}/>
          <h1>{this.props.product.title}</h1>
          <h3>Description</h3>
          <p>{this.props.product.description}</p>
          <p>Price: ${this.props.product.price}</p>
          <button name={this.props.product.id} onClick={this.addProductToCart}>Add</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    product: state.product,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchProduct(id){
      dispatch(fetchProduct(id))
    },
    fetchCategories(){
      dispatch(fetchCategories())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
