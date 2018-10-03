import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>This is not a Pipe</h2>
        </div>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default App;
