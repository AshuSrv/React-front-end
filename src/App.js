import React, { Component } from 'react';
import './App.css';
import Facebook from './components/Facebook'
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: {}
    }
  }
  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      console.log(resultObject)
      console.log(loginStatus)
      this.setState({
        username1: resultObject.user.name,
        user: {
        name: resultObject.user.name,
        token: resultObject.authResponse.accessToken,
        profile_image: resultObject.user.picture.data.url,
        email: resultObject.user.email,
        provider: "Facebook",
        uid: resultObject.authResponse.userID,
        secret : ""
        }
      });
    } else {
      alert('Facebook login error');
    }
  }

  componentDidUpdate() {
    axios.post('http://localhost:3001/create', this.state.user)
      .then(response => {
        console.log('auth response', response)
      }).catch(error => {
        console.log('auth error', error);
      });
  }


  render() {
    const { username1} = this.state;

    return (
      <div>
        <div className="App-intro">
          { !username1 &&
            <div>
              <p>Click on one of any button below to login</p>
              <Facebook onLogin={this.onFacebookLogin}>
                <button>Facebook</button>
              </Facebook>
            </div>
          }
          {username1 &&
          <div>
            <p>Welcome back, {username1}</p>
            {/* <a href="http://localhost:3001/auth/facebook">Click To fetch Additional details</a> */}
          </div>
          }
        </div>
      </div>
    );
  }
}
//change
export default App;
