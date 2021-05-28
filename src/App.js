import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import GuestRank from './components/GuestRank/GuestRank.js';
import GuestImageLinkForm from './components/GuestImageLinkForm/GuestImageLinkForm.js';
import LimitPopUp from './components/LimitPopUp/LimitPopUp.js'
import Particles from 'react-particles-js';
import './App.css';



const particlesOptions = {
        
        "particles": {
	        "number": {
	            "value": 100
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
        
    
}
      
const initialState = {
     
        input: "",
        imageUrl:"",
        boxes: [],
        route: "SignIn",
        isSignedIn: false,
        boxTotal:"",
        limitSeen: false,
        user: {
            id: "",
            name: "",
            email: "",
            // password: "",
            entries: 0,
            guestEntries: 2,
            joined: ""
        
    }
    
}

class App extends Component {
    
    constructor(){
        super();
        this.state = initialState
        }
    


    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            // password: "",
            entries: data.entries,
            guestEntries: data.entries,
            joined: data.joined,

        }}) 

    }





    calculateFaceLocation = (data) => {
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);

       return data.outputs[0].data.regions.map(face =>  {
        const clarifaiFace = face.region_info.bounding_box;
        
        return {
           leftCol: clarifaiFace.left_col * width, 
           topRow: clarifaiFace.top_row * height,
           rightCol: width - (clarifaiFace.right_col * width),
           bottomRow: height - (clarifaiFace.bottom_row * height)

                }

    });
}

    displayFaceBox = (boxes) => {
        // console.log(boxes.length);
        this.setState({boxes: boxes})
        
        }
        

    
    onInputChange = (event) => {
        
       this.setState({input:event.target.value}) 
    }
    
    

    
    onButtonSubmit = () => {
        
        this.setState({imageUrl: this.state.input});
        fetch("https://agile-cliffs-41574.herokuapp.com/imageurl", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  input: this.state.input
                })
            })
            .then(response => response.json())    
            .then((response) => {
                // console.log(response)
                if (response) {
                    fetch("https://agile-cliffs-41574.herokuapp.com/image", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { entries: count}))
                    })
                    .catch(console.log)    
                }   
                this.displayFaceBox(this.calculateFaceLocation(response))
                
            })

            .catch((err) => {
                console.log(err);
            })

            };  

        onSubmitGuest = () => {
            this.setState({imageUrl: this.state.input});
            fetch("https://agile-cliffs-41574.herokuapp.com/image/guesturl", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  input: this.state.input
                })
            })
            
            .then(response => response.json())   
            .then((response) => {
                // console.log(response)
             if (response) {
                 fetch("https://agile-cliffs-41574.herokuapp.com/image/guest", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                      id: this.state.user.id
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { guestEntries: count}))
                        // console.log(this.state.user.guestEntries)

                        if (this.state.user.guestEntries <= 0) {
                            this.toggleLimitPopUp()
                           
                    } 
                
                })         

                
                    .catch(console.log)    
             }   
             this.displayFaceBox(this.calculateFaceLocation(response))
             
            })
    
            .catch((err) => {
             console.log(err);
            })

        }

    onReturn = (event) => {
        
        if (event.key === "Enter") {
            this.onButtonSubmit()
    
                
         }
            
        }
    
        onGuestReturn = (event) => {
        
        if (event.key === "Enter") {
            this.onSubmitGuest()
    
                
         }
            
        }


    onRouteChange = (route) => {

        if (route === "signout") {
            
            this.setState(initialState)
            

        } else if (route === "home"){
            this.setState({isSignedIn: true})
           

        }  else if (route === "guest") {
            this.setState({isSignedIn: true})
        }
            
        this.setState({route: route});
        
    }
    
       hideTotal = () => {
       var T = document.getElementById("hide")
       T.style.display = "block";
   }


   toggleLimitPopUp = () => {
    this.setState({
      limitSeen: true
    });
  };


   


    render(){
        const {isSignedIn, imageUrl, route, boxes} = this.state;

  return (
    <div className="App">
     
   <Particles className="particles"
              params={particlesOptions}
            />
 
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     { route === "home"
     ? <div> 
     <Logo />
     <Rank name={this.state.user.name} entries={this.state.user.entries}/>
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onReturn={this.onReturn} boxes={boxes} hideTotal={this.hideTotal}/>
     <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>

     </div> 

     : route === "guest" 
     
     ? <div> 
     
     {this.state.limitSeen ? 
     <LimitPopUp toggle={this.toggleLimitPopUp} onRouteChange={this.onRouteChange} /> : null}
     <Logo />
     <GuestRank name="Guest" guestEntries={this.state.user.guestEntries}/>
     <GuestImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmitGuest} onReturn={this.onGuestReturn} boxes={boxes} hideTotal={this.hideTotal} toggle={this.toggleLimitPopUp}/>
     <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>

     </div> 
     

    : ( 
        route === "SignIn" ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       : route === "signout" ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
       : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    //    : <Register onRouteChange={this.onRouteChange}/>
        
  )
     
     }
    </div>
  );
}}

export default App;


