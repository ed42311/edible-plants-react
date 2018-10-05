import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Button, 
  TextField 
} from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  classes
}) => (
  <Card className="container">
    <form 
      action="/" 
      onSubmit={onSubmit}
      noValidate 
      autoComplete="off"
    >
      <h2 className="card-heading">Sign Up</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <TextField
        name="name"
        label="Name"
        value={user.name}
        className={classes.textField}
        autoComplete="full-name"
        onChange={(e) => onChange(e)}
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={user.email}
        autoComplete="email"
        className={classes.textField}
        onChange={(e) => onChange(e)}
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        className={classes.textField}
        onChange={(e) => onChange(e)}
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
      <Button type="submit"  color="primary" className={classes.button}>
        Primary
      </Button>

      <CardContent>Already have an account? <Link to={'/login'}>Log in</Link></CardContent>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpForm);
