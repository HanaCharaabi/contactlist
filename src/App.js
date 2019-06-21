import React, { Component } from 'react';
import Contact from './Contact.js'
import './App.css'
import AllContacts from './API/AllContacts.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class App extends Component {
  render() { 
    return (
      <Router>
   <div> 
     <div className='appp'>
     <div className='meme'>
            
            <Link to="/contact"><p>Add Contact</p></Link>
          </div>
          <div  className='meme'>
            <Link to="/contacts"><p>All Contacts</p></Link>
          </div>
     </div>
           
        <Route path="/contact" component={Contact}/>
        <Route path="/contacts" component={AllContacts}/>
          
   </div>
   </Router>
     );
  }
}
 
export default App;