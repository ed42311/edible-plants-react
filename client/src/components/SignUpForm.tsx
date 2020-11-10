import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Button, TextField } from '@material-ui/core'

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   dense: {
//     marginTop: 19,
//   },
//   menu: {
//     width: 200,
//   },
// });
interface IUser {
  firstName: string
  lastName: string
  email: string
}

interface ISignUpForm {
  user: IUser
  onSubmit: () => void
  onChange: () => void
  errors: {
    summary: string
  }
}

export const SignUpForm: FC<ISignUpForm> = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card>
    <CardContent>
      <form action="/" onSubmit={onSubmit} noValidate autoComplete="off">
        <h2 className="card-heading">Sign Up</h2>
        {errors.summary && <p className="error-message">{errors.summary}</p>}
        <TextField
          name="firstName"
          label="First Name"
          value={user.firstName}
          autoComplete="given-name"
          onChange={onChange}
          margin="normal"
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={user.lastName}
          autoComplete="last-name"
          onChange={onChange}
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={user.email}
          autoComplete="email"
          onChange={onChange}
          margin="normal"
        />
        <TextField
          name="password"
          onChange={onChange}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <div>
          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </div>
        <p>
          Already have an account? <Link to={'/login'}>Log in</Link>
        </p>
      </form>
    </CardContent>
  </Card>
)
