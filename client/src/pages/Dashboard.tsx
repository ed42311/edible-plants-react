import React, { FC } from 'react'
import { Card, CardContent } from '@material-ui/core'
import { PlantForm } from '../components/'

import { RouteComponentProps } from 'react-router-dom'

interface IUser {
  firstName: string
  lastName: string
}

interface IPrivateRoute extends RouteComponentProps {
  secretData?: string
  user: IUser
  onSubmit: () => void
  onChange: () => void
}

// secretData?: string

export const Dashboard: FC<IPrivateRoute> = ({ user, onSubmit, onChange }) => (
  <Card className="container">
    <CardContent style={{ fontSize: '16px', color: 'green' }}>
      Welcome{' '}
      <strong>
        {user.firstName} {user.lastName}
      </strong>
      !
      <br />
      <PlantForm
        onSubmit={onSubmit}
        onChange={onChange}
        plant={{ commonName: 'thing' }}
      />
    </CardContent>
  </Card>
)
