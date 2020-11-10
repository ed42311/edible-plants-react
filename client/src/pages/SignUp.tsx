import React, { Component, SyntheticEvent } from 'react'
import { SignUpForm } from '../components'

export class SignUp extends Component {
  state = {
    message: '',
    errors: {},
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  }

  /**
   * Process the form.
   *
   * @param {object} event
   */
  processForm = (event: SyntheticEvent) => {
    event.preventDefault()
    const { user } = this.state
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // add errors to state
        const { message, success } = data
        if (success) {
          this.setState({
            errors: {},
          })
          localStorage.setItem('successMessage', message)
          // this.props.history.push('/login')
        } else {
          this.setState({
            errors: message,
          })
        }
      })
  }

  changeUser = (event: SyntheticEvent) => {
    console.log(event)
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    )
  }
}
