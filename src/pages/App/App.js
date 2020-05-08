import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';
import eventsService from '../../utils/eventsService';
import CreateEventPage from '../CreateEventPage/CreateEventPage';

import AllEventsPage from '../AllEventsPage/AllEventsPage';
import NavBar from '../../components/NavBar/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser(),
      events: []
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  handleCreateEvents = (events) => {
   
  }


  handleUpdateEvents = (events) => {
    this.setState({ events });
  }


  /*--- Lifecycle Methods ---*/

  render() {
    
    return (
      <div>
        <header className='header-footer'> D I P </header>
        <NavBar
      
        handleLogout={this.handleLogout}
        user={this.state.user}
      />
        <Switch>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>


           <Route exact path='/create' render={({ history }) => 
           userService.getUser() ? 
            <CreateEventPage
              history={history}
              handleCreateEvent={this.handleCreateEvents}
            />
            :
            <Redirect to='/login'/>
          }/>



          <Route exact path='/' render={() => 
            userService.getUser() ? 
              <AllEventsPage
                events={this.state.events}
                user={this.state.user}
                handleUpdateEvents={this.handleUpdateEvents}
              />
          
            :
              <Redirect to='/login'/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
