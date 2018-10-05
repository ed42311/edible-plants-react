import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container">
          {Auth.isUserAuthenticated() ? (
            <CardContent style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardContent>
          ) : (
            <CardContent style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardContent>
          )}
      </Card>
    )
  }
};

export default HomePage;
