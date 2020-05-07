import React, { Component } from 'react';
import ScoreForm from '../../components/ScoreForm/ScoreForm';
import './CreateScorePage.css';

class CreateScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='SignupPage'>
        <ScoreForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default CreateScorePage;