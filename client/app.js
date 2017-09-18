import history from './history';
import React, {Component} from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import { TestPage } from './components'
import { BuildBox, SignUp, Home, Navbar } from './containers'

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
          <Route
            path='/checkout'
            render={()=><TestPage pageName={'Checkout Page'}/>} />
          <Route path='/buildbox' component={BuildBox} />
          <Route path='/login' component={SignUp} />
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    </Router>
  )
}





// {
//   isLoggedIn &&
//     <Switch>
//       {/* Routes placed here are only available after logging in */}
//       <Route path='/home' component={UserHome} />
//     </Switch>
// }