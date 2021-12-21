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
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (      
      <>
        <div style={{backgroundColor:'black', width:'100vw', height:'100vh'}}>
          <img src="bottom-bg.svg" style={{width:'100vw', position:'absolute', bottom:0}}/>
          <div>

          </div>
        </div>        
        {/* <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form> */}
      </>
    );
  }
}