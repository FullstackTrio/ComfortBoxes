import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Pay extends Component {
  constructor(props){
    super(props)
    this.onToken = this.onToken.bind(this)
  }

  onToken (token) {
    this.props.history.push('/orderComplete');
  }

  render () {
    return (
      <div id="payPage">
      <h1>Billing Information</h1>
      <StripeCheckout
      token={this.onToken}
      stripeKey="pk_test_CorZb3Znv3UF1aKyOdS3syUF"
    />
    </div>
    )
  }
}

