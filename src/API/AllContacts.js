import React, { Component } from 'react';
import axios from 'axios'

class AllContacts extends Component {
  constructor(props){
    super(props)
    this.state=({
      contactlist: [],
      
        contactName:'',
        contactPhone:'',
        contactEmail:'',

      class: false,
      idC: ''

    })
      }

  
 componentDidMount() {
        axios.get("http://localhost:4000/contact")
        .then(res => this.setState({contactlist: res.data}));
    
      }

  //...addcontact...
  addcontact = () => {

    axios.post("http://localhost:4000/contact", {
      text: this.state.contact
    })
    axios.get("http://localhost:4000/contact")
      .then(res => this.setState({ contactlist: res.data }));
  }

  

  deleteContact = (e) => {
        axios.delete(`http://localhost:4000/delete_contact/${e}`)
   
      }

  modifyContact = () => {
    let x={
      name:this.state.contactName,
      phone:this.state.contactPhone,
      email:this.state.contactEmail
    }
    axios.put(`http://localhost:4000/modify-contact/${this.state.idC}`, x)
  }


  render() { 

    return ( 
    <div>
{
  this.state.contactlist.map(el => {
    return (
  <div  key={el.id} style={{width:'315px', background:'white',margin:'30px 40%',padding:'50px',color:'gray'}}>
    <p>{el.name}</p>
    <br/>
    <p>{el.phone}</p>
    < br / >
    <p>{el.email}</p>
< br / >

< div className='btns'> 
< span 
            className='btn' 
            onClick={() => {
              this.setState({
                idC: el._id,
                class: !this.state.class,
                contactName: el.name,
                contactPhone: el.phone,
                contactEmail:el.email
              })

            }}
style = {
    {
      padding: '10px 30px'
    }
  } > Modify </span> 

          <span className='btn' style={
            {
              padding: '10px 30px'
            }
          } onClick={()=>{
  axios.delete("http://localhost:4000/delete/"+el._id)
  window.location.reload()
}}>Delete</span>
</div>
  </div>
)})


}

        <div className={this.state.class ? "class1" : "class2"}>
          <p className="close" onClick={() => {
            this.setState({ class: !this.state.class })
            axios.get("http://localhost:4000/contact")
              .then(res => this.setState({ contactlist: res.data }));
          }}>X</p>
          <h1 style={{ textAlign: "center" }}>Modify contact</h1>
          <br/>
          <input type="text" value={this.state.contactName} onChange={(e) => { this.setState({ contactName: e.target.value }) }} />
          <input type="text" value={this.state.contactPhone} onChange={(e) => { this.setState({ contactPhone: e.target.value }) }} />

          <input type="text" value={this.state.contactEmail} onChange={(e) => { this.setState({ contactEmail: e.target.value }) }} />

          <input type="button" value="Save" className='btn' onClick={this.modifyContact} />



        </div>
    </div> 
    );
  }
}

 
export default AllContacts;