import React, { Component } from 'react';
import EventForm from '../../components/EventForm/EventForm';
import './CreateEventPage.css';

class CreateEventPage extends Component {
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
        <EventForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default CreateEventPage;