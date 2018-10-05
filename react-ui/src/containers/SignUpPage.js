import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.js';

export default class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: "",
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
      classes: {}
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event 
   */
  processForm(event) {
    event.preventDefault();
    const { user } = this.state
    // const name = encodeURIComponent(this.state.user.name)
    // const email = encodeURIComponent(this.state.user.email)
    // const password = encodeURIComponent(this.state.user.password)
    // const formData = `name=${name}&email=${email}&password=${password}`
    // console.log(formData)

    console.log(user)
    fetch('/api/users', {
        method: 'POST', 
        headers :  {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user), 
      })
      .then(res => res.json())
      .then(el => {
        console.log(el)
      })
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });

    //     // set a message
    //     localStorage.setItem('successMessage', xhr.response.message);

    //     // redirect user after sign up to login page
    //     
    //   } else {
    //     // failure

    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({
    //       errors
    //     });
    //   }
    // });
    // xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        classes={this.state.classes}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};


