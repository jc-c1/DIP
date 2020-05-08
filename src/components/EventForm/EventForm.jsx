import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventsService from '../../utils/eventsService';
import styles from "./EventForm.module.css";


class EventForm extends Component {

  state = {
    eventTitles: "",
    dates: "",
    eventInfos: "", 
    comments: "",
    guest: "",
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventsService.create(this.state);
      // Let <App> know a user has signed up!

      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }




  render() { 
    return (
      <div className={`${styles.table} table text-info`}>
        <header className="header-footer">New Event!</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <span>Event Name</span>
              <input type="text" className="form-control"  value={this.state.eventTitles} name="eventTitles" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
            <span>Date</span>
              <input type="date" className="form-control" value={this.state.dates} name="dates" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
            <span>Link for more details</span>
              <input type="text" class="form-control"  className="form-control" placeholder="http://www.google.com" value={this.state.eventInfos} name="eventInfos" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
            <span>Comment</span>
              <textarea class="form-control"  className="form-control" value={this.state.comments} name="comments" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
            <span>Guest Emails</span>
              <textarea  class="form-control"  placeholder="john@gmail.com, jane@gmail.com" value={this.state.guest} name="guest" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" >Create Event</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;
