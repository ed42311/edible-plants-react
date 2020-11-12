import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// Comps
import { PrivateRoute, MenuBar } from './components'

// Pages
import { Shop, Home, Login } from './pages'

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class App extends Component {
  state = {
    authenticated: false,
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </Switch>
      </div>
    )
  }
}

export default App
