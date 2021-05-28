import React from 'react';
import Tilty from 'react-tilty';
import "./Logo.css";
import brain from "./knowledge-brain-logo.png"


const Logo = () => {
    
//    let style1 = {
//        borderRadius:"50%" - for glareStyle
//    };
    
    return (
    
       <div className="ma4 mt0">
        <Tilty className="tilty shadow-2" scale={1.05} maxGlare={0.5} glareStyle={{borderRadius: "50%"}}>
         <div className="inner">
           <img alt="brain-logo" src={brain}/>
             </div>
        
        </Tilty>
        </div>
        
    
    );
}

export default Logo