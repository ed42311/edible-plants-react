import React, { createElement } from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  return <Route {...rest} render={routeComponent} />
}
