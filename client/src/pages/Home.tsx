import React, { FC } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import Auth from '../modules/Auth'

import { RouteComponentProps } from 'react-router-dom'

// interface IPrivateRoute extends RouteComponentProps {
//   toggleAuthenticateStatus: Function
// }

export const Home: FC<RouteComponentProps> = () => {
  return (
    <Card className="container">
      {Auth.isUserAuthenticated() ? (
        <CardContent>
          <Typography>Welcome! You are logged in.</Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography>
            Welcome to the Plant Api, please make an account or login.
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}
