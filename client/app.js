import history from './history';
import React from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'

import { TestPage, OrderComplete } from './components'
import { BuildBox, SignUp, Cart, Checkout, Home, Navbar, Admin, ProductDetail, Pay } from './containers'

/**
 * COMPONENT
 */
export default function App () {
  return (
    <Router history={history}>
      <div>
        <Navbar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/orderComplete' component={OrderComplete} />
          <Route path='/admin' component={Admin} />
          <Route path='/cart' component={Cart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/buildbox' component={BuildBox} />
          <Route path='/products/:id' component={ProductDetail} />
          <Route path='/login' component={SignUp} />
          <Route path='/pay' component={Pay} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}
