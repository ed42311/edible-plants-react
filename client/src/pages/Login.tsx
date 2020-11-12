import React, { Component } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'
import { StaticContext } from 'react-router'

// Services
import { fakeAuth } from '../services'

type LocationState = {
  from: Location
}

export class Login extends Component<
  RouteComponentProps<{}, StaticContext, LocationState>
> {
  state = {
    redirectToReferrer: false,
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/public' },
    }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
