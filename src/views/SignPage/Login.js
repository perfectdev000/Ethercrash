import React from 'react';
import { Link } from 'react-router-dom'
import './sign.css'


export default class Login extends React.Component {  
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
  render() {
    return (      
      <>
        <div className='root'>
          <img src="bottom-bg.svg" className='bottom-img'/>
          <div className='div-form'>                      
            <div className='form' >
              <div className='form-title'>PLEASE LOGIN</div> 
              <div className='text-label'>User Name</div>
              <input type="text" name='username' className='text-input' placeholder='User Name'  onChange={this.handleChange.bind(this)}/>
              <div className='text-label'>Password</div>
              <input type="password" name='password' className='text-input' placeholder='Password' onChange={this.handleChange.bind(this)}/>              
              <button className='submit' onClick={this.mySubmitHandler}>Log In</button>
              <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Link to='/register' className="login-signup">Go to <b style={{color:'yellow'}}>Register</b></Link>
              </div>
            </div>
          </div>
        </div>     
      </>
    );
  }
}