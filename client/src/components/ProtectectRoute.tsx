import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

// const defaultProtectedRouteProps: ProtectedRouteProps = {
//   isAuthenticated: this.props.state.session.isAuthenticated,
//   authenticationPath: '/login',
// };

// <ProtectedRoute
//   {...defaultProtectedRouteProps}
//   exact={true}
//   path='/'
//   component={ProtectedContainer}
// />

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean
  isAllowed: boolean
  restrictedPath: string
  authenticationPath: string
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  let redirectPath = ''
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath
  }
  if (props.isAuthenticated && !props.isAllowed) {
    redirectPath = props.restrictedPath
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}
