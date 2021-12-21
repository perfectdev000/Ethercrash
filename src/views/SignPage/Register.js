import './sign.css'
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (      
      <>
        <div className='root'>
          <img src="bottom-bg.svg" className='bottom-img'/>
          <div className='div-form'>                      
            <form onSubmit={this.handleSubmit}>
              <div className='form-title'>CREATE A NEW ACCOUNT</div> 
              <div className='text-label'>User Name</div>
              <input type="text" className='text-input' placeholder='User Name' value={this.state.value} onChange={this.handleChange}/>
              <div className='text-label'>Password</div>
              <input type="text" className='text-input' placeholder='Password' value={this.state.value} onChange={this.handleChange}/>
              <div className='text-label'>Email Address</div>
              <input type="text" className='text-input' placeholder='Email Address' value={this.state.value} onChange={this.handleChange}/>                
              <p>
                By clicking register you are agreeing to ethercrash.io terms of service. You also agree that you are of legal age, and that gambling is permitted in your jurisdiction.
              </p>
              <div className='text-check'><input type="checkbox" className='checkbox'/>&nbsp;I Agree</div>
              <input type="submit" value="Submit" className='submit' />
            </form>
          </div>
        </div>     
      </>
    );
  }
}