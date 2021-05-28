import React, { Component } from "react";
import "./LimitPopUp.css";


export default class LimitPopUp extends Component {


    render() {
        
        const { onRouteChange } = this.props;
        
        const resetToRegister = () => {
            onRouteChange("signout")
            onRouteChange("Register")
        
        }
  return (
   <div className="modal" style= {{zIndex: "1"}}>
     <div className="modal_content" style= {{zIndex: "1"}}>
     <p className="f3">You've reached your limit for today. Please register to get unlimited uploads.</p>
     <button className="w-auto-1 grow f4 link ph3 pv2 dib white bg-orange limit-register-button" onClick={() => resetToRegister()} > Register!</button>
     
    </div>
   </div>
  );
 }
}