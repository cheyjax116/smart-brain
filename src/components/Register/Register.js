import React from 'react';
const AbortController = require("abort-controller")



class Register extends React.Component {

  
  constructor (props) {
    

    super(props);
    this.state = {
      registrarFullName: "",
      registrarEmail: "",
      registrarPassword: "",
      wrongDetails: false,
      noDetails: false,
      isPasswordShown: false,
      abortControl: new AbortController()
     
    
  }
  this.handleKeyPress = this.handleKeyPress.bind(this);
}

  onNameChange = (event) => {
    this.setState({registrarFullName: event.target.value})

  }
 
  
  onEmailChange = (event) => {
    this.setState({registrarEmail: event.target.value})

  }


  onPasswordChange = (event) => {
    this.setState({registrarPassword: event.target.value})

  }


  wrongDetails = () => {
    // console.log("Is it firing?");
    this.setState({wrongDetails: true})
  }

  noDetails = () => {
    this.setState({noDetails: true})
    // this.changeCSS()
    
  }
    
  togglePasswordVisibility = () => {
    this.setState({isPasswordShown: !this.state.isPasswordShown})
  }
      

  // changeCSS = () => {
  //   // document.getElementsByClassName('register-password-icon').setAttribute('class','register-password-icon-2')
  //   document.getElementsByClassName('register-password-icon').style.backgroundColor = "red";
  // }

  onSubmitRegister = () => {
    
    let abortControl = this.state.abortControl;
    let signal = abortControl.signal

    fetch("https://agile-cliffs-41574.herokuapp.com/register", {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: this.state.registrarFullName,
      email: this.state.registrarEmail,
      password: this.state.registrarPassword,
    }),
      signal: signal
  })

    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      } else
      {
          }
      })
      .catch((err) => {
        console.log(err);
        this.wrongDetails()
      })
      setTimeout(() => abortControl.abort(), 2000);
     this.setState({abortControl: new AbortController()})   
  }



  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
    
  
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onSubmitRegister()
    }
  }



  submitCheck = () => {
    if (this.state.registrarFullName === '' || this.state.registrarEmail === '' || this.state.registrarPassword === '') {

      this.noDetails()

    } else {
      
      this.onSubmitRegister()
  }}

  
  render() {  
      
    return (
        <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 mw6 shadow-5">
        <main className="pa4 black-80" style= {{zIndex: "2"}}>
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
            <p className={this.state.wrongDetails?"f4 b":'dn' } style={{color:"blue"}} >Sorry, this email is already taken.</p>
            <p className={this.state.noDetails?"f4 b":'dn' } style={{color:"blue"}} >Please Fill Out All Fields.</p>
              <label className="db fw6 lh-copy f4" htmlFor="name">Full Name</label>
              <input required className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input required="required" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
            </div>
            <div className="mv3 input-icons">
              <i className={`fa ${this.state.isPasswordShown? "fa-eye icon-reg": "fa-eye-slash icon-reg"} ${this.state.noDetails? "icon-reg-nd":"icon-reg"} ${this.state.wrongDetails? "icon-reg-wd":"icon-reg"} ${this.state.wrongDetails && this.state.noDetails?  "icon-reg-wd":"icon-reg"}`} 
              aria-hidden="true" 
              onClick={this.togglePasswordVisibility}>
                </i> 
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 input-icons" 
              type= {this.state.isPasswordShown? "text": "password"} 
              name="password"  
              id="password" 
              onChange={this.onPasswordChange} />
            </div>
            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.submitCheck} onKeyDown={this.handleKeyPress} />
          </div>
          {/* {  <div className="lh-copy mt3">
            { <a href="#0" className="f6 link dim black db">Register!</a> }
            { <a href="#0" className="f6 link dim black db">Forgot your password?</a> }
          </div>   */}
        </div>
      </main>
      </article>
      
        )
      }
    }
  
    export default Register