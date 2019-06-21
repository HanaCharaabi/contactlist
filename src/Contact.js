import React, { Component } from 'react';
import './Contact.css'
import axios from 'axios'
class Contact extends Component {
  constructor(props){
    super(props)
    this.state=({
      name:'',
      phone:'',
      email:'',
      
    })
  }
  ContactName = e => {
    this.setState({
      name:e.target.value
    })
  }
  ContactPhone= e => {
    this.setState({
      phone:e.target.value+' $'
    })
  }
  ContactEmail= e => {
    this.setState({
      email:e.target.value
    })
  }

  addContact = () => {
    
    if (this.state.name !== '' && (this.state.phone !== '' || this.state.email !== '')) {
      axios.post("http://localhost:4000/contact", {

        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
      })
        .then(res => console.log(res))
        .then(res => this.props.history.push("/contacts"))
        .catch(err => console.log(err))
    } else { alert('* Required fields!! Name and phone number or email') }

   
  }

  render() { 
    return ( 
<div>
<div class="flex-container">
  <div class="content-container">
    <div class="form-container">
      <form action="">
        <h1>
          ADD Contact
        </h1>
        <br/>
        <br/>
        <span class="subtitle">NAME:</span>
        <br/>
        < input type = "text"
        id = "ContactName"
        onChange = {
          this.ContactName
        }
        />
        <br/>
        <span class="subtitle">Phone number:</span>
        <br/>
        < input type = "text"
        id = "ContactPhone"
        onChange = {
          this.ContactPhone
        }
        />
        <br/>
        <br/>
        <span class="subtitle">Email:</span>
        <br/>
        < input type = "text"
        id = "ContactEmail"
        onChange = {
          this.ContactEmail
        }
        />
        <br/>
        <br/>
       
      <span onClick={this.addContact} className='submit-btn' style={{padding:'10px 30px'}}>Submit</span>
      </form>
    </div>
  </div>
</div>

</div>

     );
  }
}
 
export default Contact;