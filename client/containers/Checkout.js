import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { getCopyOfShoppingCart } from '../shoppingCart'
import axios from 'axios';
import { me } from '../store/user'
import { connect } from 'react-redux'


export class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailInput: '',
      addressInput: '',
      cityInput: '',
      stateInput: '',
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.me();
  }

  handleChange (event) {
    if (event.target.name === 'email') {
      this.setState({
        emailInput: event.target.value
      });
    } else if (event.target.name === 'address') {
      this.setState({
        addressInput: event.target.value
      });
    } else if (event.target.name === 'city') {
      this.setState({
        cityInput: event.target.value
      });
    } else if (event.target.name === 'state') {
      this.setState({
        stateInput: event.target.value
      });
    }

  }

  handleSubmit (event) {
    event.preventDefault()
    const email = this.state.emailInput;
    const address = this.state.addressInput;
    const city = this.state.cityInput;
    const state = this.state.stateInput;
    const storageCart = getCopyOfShoppingCart()
    const boxIds = Object.keys(storageCart);
    console.log('user', this.props.user)
    let user = null;
    if (Object.keys(this.props.user).length) { // doesn't know what this is
      user = this.props.user.id;
    }

    const promises = boxIds.map(boxId => {
      return axios.post('/api/orders/', {
        productIds: storageCart[boxId],
        userId: user,
        boxId: Number(boxId),
        shippingDetails: [address, city, state, email]
      })
    })

    Promise.all(promises)
      .then(() => {
        this.setState({
          emailInput: '',
          addressInput: '',
          cityInput: '',
          stateInput: ''
        });
        this.setState({
          submitted: true
        });
      })
  }

  render() {
    if (this.state.submitted) {
      return (
        <Redirect to={'/OrderComplete'} />
      )
    }
    return (
      <div id='checkoutPage'>
        <form onSubmit={this.handleSubmit}>
          <h3>Shipping Information</h3>
          <label><small>Email Address</small></label>
          <input
            onChange={this.handleChange}
            value={this.state.emailInput}
            name="email" />
          <label><small>Address</small></label>
          <input
            onChange={this.handleChange}
            value={this.state.addressInput}
            name="address" />
          <label><small>City</small></label>
          <input
            onChange={this.handleChange}
            value={this.state.cityInput}
            name="city" />
          <label><small>State</small></label>
          <input
            onChange={this.handleChange}
            value={this.state.stateInput}
            name="state" />
          <div className='row u-full-width'>
            <button className='twelve columns button-primary'type="submit">Submit Shipping Info</button>
          </div>
        </form>
      </div>
    );
  }
}




function mapStateToProps (state) {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps, {me})(Checkout)
