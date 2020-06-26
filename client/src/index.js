import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios'


import App from './App'

// Keep in CASE INDEX route is broken!!!!!!

// ReactDOM.render(
//   <BrowserRouter>
//     <App user={res.data.userDoc}/>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

document.getElementById('root').innerText = 'The React app has not connected to the backend yet.'

axios.get('/api/checkuser').then(res => {
  ReactDOM.render(
    <Router>
    <App user={res.data.userDoc} />
    </Router>, 
    document.getElementById('root'));
}).catch(err => {
  alert('backend not running or /checkuser route not defined !')
})

