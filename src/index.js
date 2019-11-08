import React from 'react';
import ReactDOM from 'react-dom';
import GooglePage from './components/GooglePage';
import App from './App'

class Loginpage extends React.Component{
  render(){
    return(
      <div>
        <App />
        <GooglePage />
      </div>
    )
  }
}

ReactDOM.render(<Loginpage />,document.getElementById('root'))
