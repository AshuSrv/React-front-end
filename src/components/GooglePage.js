import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import axios from 'axios'

import "./GooglePage.scss";//<== If sass is not installed comment this line
class GooglePage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isUserLoggedIn: false
    };
  }

  responseGoogle = response => {
    console.log(response)
    this.setState({ user: {
      name: response.profileObj.givenName,
      token: response.tokenId,
      profile_image: response.profileObj.imageUrl,
      email: response.profileObj.email,
      provider: "Google",
      uid: response.El,
      secret : ""
    }, isUserLoggedIn: true });
    
    axios.post('http://localhost:3001/create', this.state.user)
    .then(response => {
      console.log('auth response', response)
    }).catch(error => {
      console.log('auth error', error);
    });
  };

  logout = (response) => {
    this.setState({isUserLoggedIn: false})
    console.log(response)
  };

  
  

  render() {
    return (
      <div className="App">
        {!this.state.isUserLoggedIn && (
          <GoogleLogin
            clientId="679155638857-c36g0b5jmddperrekpo4m4aiep6nrruq.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (
              <button
                className="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        )}
        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div>Cool things are working</div>
            <div className="details-wrapper">
              <GoogleLogout
                render={renderProps => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={this.logout}
              />

              <div className="image">
                <img src={this.state.user.profile_image} alt="this is profile" />
              </div>
              <div className="name">
                Welcome Mr. {this.state.user.name}{" "}
                {this.state.user.uid}
              </div>
              <div className="email"><i>{this.state.user.email}</i></div>
            </div>
            <div className="bar" />
            <div className="stand" />
          </div>
        )}
      </div>
    );
  }
}

export default GooglePage;