import React from 'react';
import "./GuestImageLinkForm.css"


const GuestImageLinkForm = ({onInputChange, onButtonSubmit, onReturn, boxes, hideTotal, toggle}) => {


   

   var total = boxes.length

return (
    
        <div>
    
        <div>
        <p className="f3">{"This Magic Brain will detect faces in your pictures. Submit a photo link to try it out!"}</p>
        
        <div className="center">
            <div className="center pa4 br3 shadow-5 form"  >
        <input className="f4 pa2 w-70 center" type="text" placeholder="Paste JPG or PNG Image Link Here" onChange={onInputChange} onKeyPress={onReturn}/>
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-orange" onClick={function (event) {onButtonSubmit(); hideTotal()}}>Detect Faces</button>
                
            </div>
            
        </div>

    
            
    </div>
    
    <p id="hide" className= "b f3" style={{color:"purple", display:"none"}}> {`${total} face(s) detected in this image.`}</p>
    

    </div>
    );
}

export default GuestImageLinkForm

