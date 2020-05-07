import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';
import scoresService from '../../utils/scoresService';

import GamePage from '../../pages/GamePage/GamePage';
import HighScoresPage from '../HighScoresPage/HighScoresPage';


class App extends Component {
  constructor() {
    super();
    this.state = {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser(),
      scores: []
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  handleUpdateScores = (scores) => {
    this.setState({ scores });
  }
  /*--- Lifecycle Methods ---*/

  render() {
    
    return (
      <div>
        <header className='header-footer'> D I P </header>
        
        <Switch>
        <Route exact path='/' render={() =>
            <GamePage
              handleLogout={this.handleLogout}
              user={this.state.user}
          />
          }/>
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
          <Route exact path='/high-scores' render={() => 
            userService.getUser() ? 
              <HighScoresPage
                scores={this.state.scores}
                handleUpdateScores={this.handleUpdateScores}
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
