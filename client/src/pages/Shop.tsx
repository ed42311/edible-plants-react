import React, { FC } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

import { RouteComponentProps } from 'react-router-dom'

export const Shop: FC<RouteComponentProps> = () => {
  return (
    <Card className="container">
      <CardContent>
        <Typography>Shop</Typography>
      </CardContent>
    </Card>
  )
}
