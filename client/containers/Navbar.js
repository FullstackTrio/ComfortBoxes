import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, me } from '../store/user';
import { createBoxInShoppingCart } from '../shoppingCart'

/**
 * Navbar Component:
 *   Renders the navbar
 *
 *   exported to /client/routes.js
 */
export class Navbar extends Component {
  constructor(props) {
    super(props)
    this.createABox = this.createABox.bind(this)
    this.showBuildBox = this.showBuildBox.bind(this)
    this.state = {
      buildBoxHidden: true
    }
  }

  componentDidMount () {
    this.props.me();
  }

  createABox() {
    createBoxInShoppingCart()
    this.setState({buildBoxHidden: 'hidden'})
  }

  showBuildBox () {
    this.setState({buildBoxHidden: 'visible'})
  }

  render () {
    const {currentUser, handleLogout} = this.props;

    return (
      <div className='navbar'>
        <div>
          {
            currentUser.isAdmin
              ? <Link to='/admin' className='navHome'>ADMIN</Link>
              : <Link to='/' className='navHome'>HOME</Link>
          }
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/FullstackTrio/ComfortBoxes">VIEW ON GITHUB</a>
        </div>
        <div className='nav'>
          {(!this.props.location.pathname.includes('buildbox') && !this.props.location.pathname.includes('products')) &&
            <Link to='/buildbox/Box' onClick={this.createABox}>BUILD MY BOX</Link>
          }
          {(!this.props.location.pathname.includes('buildbox') && !this.props.location.pathname.includes('products')) &&
            <Link to='/cart'>CART</Link>
          }
          {(!this.props.location.pathname.includes('buildbox') && !this.props.location.pathname.includes('products')) &&
            <Link to='/checkout'>CHECKOUT</Link>
          }
          {
            currentUser.email
              ? <a href='#' onClick={handleLogout}>SIGN OUT</a>
              : <Link to='/login'>LOG IN</Link>
          }
        </div>
      </div>
    );
  }
}

const mapState = ({currentUser}) => ({currentUser});
const mapDispatch = { handleLogout: logout, me }

export default withRouter(connect(mapState, mapDispatch)(Navbar));
