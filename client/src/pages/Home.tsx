import React, { FC } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

import { RouteComponentProps } from 'react-router-dom'

export const Home: FC<RouteComponentProps> = () => {
  return (
    <Card className="container">
      <CardContent>
        <Typography>
          Welcome to the Plant Api, please make an account or login.
        </Typography>
      </CardContent>
    </Card>
  )
}
