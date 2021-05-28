import React from 'react';
// import "./SignIn.css";



class SignIn extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      wrongDetails: false,
      isPasswordShown: false,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }



  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  wrongDetails = () => {
    // console.log("Is it firing?");
    this.setState({wrongDetails: true})
  }

  togglePasswordVisibility = () => {
    this.setState({isPasswordShown: !this.state.isPasswordShown})
  }
      

  
  onSubmitSignIn = () => {
    fetch("https://agile-cliffs-41574.herokuapp.com/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then (user => {
        if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      } else {
        this.wrongDetails()
      }
      })
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    
    handleKeyPress = (event) => {
      if (event.key === "Enter") {
        this.onSubmitSignIn()
      }
    }
    
  
  render() {
  
      const { onRouteChange} = this.props;
     
    
    return (
     
        <div className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 mw6 shadow-5">
        <main className="pa4 black-80" style= {{zIndex: "2"}}>
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <p className={this.state.wrongDetails?"f4 b":'dn' } style={{color:"blue"}} >Incorrect email or password</p>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address" 
                onChange={this.onEmailChange}
              />

            </div>
            <div className="mv3 input-icons">
                <i  className={`fa ${this.state.isPasswordShown? "fa-eye icon": "fa-eye-slash icon"} ${this.state.wrongDetails? "icon-wd":"icon"}`} 
                aria-hidden="true" 
                onClick={this.togglePasswordVisibility}>
                </i> 
              <label className="db fw6 lh-copy f6"htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 input-icons" 
                type={this.state.isPasswordShown? "text": "password"} 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn} onKeyDown={this.handleKeyPress}/>
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("Register")} className="f6 link dim black db pointer"> Register!</p>
            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("guest")} className="f6 link dim black db pointer"> Sign in as Guest!</p>
          
          </div>
        </div>
      </main>
      </div>
      
      
    
    )
}
}
export default SignIn