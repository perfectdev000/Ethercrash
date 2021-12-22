import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './sign.css'


export default class Login extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { mail: '', password:'', username: '' };
  }  
  
  mySubmitHandler = () =>{    
    if(this.state.mail==="" || this.state.password === "" )
      alert("Please input all data");
    else{
      var data = { mail: this.state.mail, password:this.state.password, level:0 };
      console.log(data)
      axios.post('http://localhost:8080/login', data)
        .then(
          response => {  
            console.log(response.data)
            if (response.data=="matching")
            {
              let data = [
                {oauth:'true'},
              ]
              this.props.history.push({pathname:'/',data:data});
            }else{
              alert(response.data);
            }
          }          
        )
        .catch(
          error => {this.setState({ errorMessage: error.message });
          console.error('There was an error!', error);
        }
      );      
    }    
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
              <div className='text-label'>Mail</div>
              <input type="text" name='mail' className='text-input' placeholder='User Mail'  onChange={this.handleChange.bind(this)}/>
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