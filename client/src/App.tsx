import React, { Component, ComponentProps, FC } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  MuiThemeProvider,
  createMuiTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import { blue, indigo, red } from '@material-ui/core/colors'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  RouteComponentProps,
} from 'react-router-dom'

import { Home, Dashboard, Login, SignUp } from './pages'
import { LogoutFunction } from './containers'
import Auth from './modules/Auth'

interface IPublicRoute extends RouteComponentProps {
  toggleAuthenticateStatus: Function
}

injectTapEventPlugin()

const custTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: FC<RouteComponentProps>
}) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

const LoggedOutRoute = ({
  component: Component,
  ...rest
}: {
  component: FC<RouteComponentProps>
}) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
)

const PropsRoute = ({
  component: Component,
  ...rest
}: {
  component: FC<RouteComponentProps>
}) => <Route {...rest} render={(props) => <Component {...props} {...rest} />} />

class App extends Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    const { toggleAuthenticateStatus } = this
    return (
      <MuiThemeProvider theme={custTheme}>
        <Router>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography color="inherit">Plants App</Typography>
                {this.state.authenticated ? (
                  <div className="top-bar-right">
                    <Button component={Link} color="inherit" to="/dashboard">
                      Dashboard
                    </Button>
                    <Button component={Link} color="inherit" to="/logout">
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="top-bar-right">
                    <Button component={Link} color="inherit" to="/login">
                      Log in
                    </Button>
                    <Button component={Link} to="/signup" color="inherit">
                      Sign Up
                    </Button>
                  </div>
                )}
              </Toolbar>
            </AppBar>
            <div>
              <PropsRoute
                exact
                path="/"
                component={Home}
                toggleAuthenticateStatus={toggleAuthenticateStatus}
              />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <LoggedOutRoute
                path="/login"
                component={Login}
                toggleAuthenticateStatus={toggleAuthenticateStatus}
              />
              <LoggedOutRoute path="/signup" component={SignUp} />
              <Route path="/logout" component={LogoutFunction} />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
