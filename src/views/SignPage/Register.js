import React from 'react';
import { Link } from 'react-router-dom'
import './sign.css'

const Checkbox = props => (
  <input type="checkbox" {...props} />
)
export default class Register extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { mail: '', password:'', username: '', agree:false, level:0 };
  }  
  
  mySubmitHandler = () =>{
    if(this.state.agree==true)
      alert("Ok")
    else
      alert("Please check your agreement")      
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});   
  }  
  handleCheckboxChange = event => this.setState({ agree: event.target.checked });  
  render() {
    return (      
      <>
        <div className='root'>
          <img src="bottom-bg.svg" className='bottom-img'/>
          <div className='div-form'>                      
            <div className='form' >
              <div className='form-title'>CREATE A NEW ACCOUNT</div> 
              <div className='text-label'>User Name</div>
              <input type="text" name='username' className='text-input' placeholder='User Name'  onChange={this.handleChange.bind(this)}/>
              <div className='text-label'>Password</div>
              <input type="password" name='password' className='text-input' placeholder='Password' onChange={this.handleChange.bind(this)}/>
              <div className='text-label'>Email Address</div>
              <input type="text" name='mail' className='text-input' placeholder='Email Address' onChange={this.handleChange.bind(this)}/>                
              <p>
                By clicking register you are agreeing to ethercrash.io terms of service. You also agree that you are of legal age, and that gambling is permitted in your jurisdiction.
              </p>
              <div className='text-check'>
                <Checkbox type="checkbox" name="checked"  className='checkbox' checked={this.state.agency} onChange={this.handleCheckboxChange}/>&nbsp;I Agree
              </div>
              <button className='submit' onClick={this.mySubmitHandler}>Register</button>
              <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Link to='/login' className="login-signup">Go to <b style={{color:'yellow'}}>LogIn</b></Link>
              </div>
            </div>
          </div>
        </div>     
      </>
    );
  }
}