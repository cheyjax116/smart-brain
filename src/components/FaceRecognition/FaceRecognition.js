import React from 'react';
import "./FaceRecognition.css";



const FaceRecognition = ( {imageUrl, boxes} ) => {
    
    return (
   <div className="center ma">
     <div className="absolute mt2">
     <img id="inputimage" className="imageSize" alt="" src={imageUrl} /> 
    
     {boxes.map(boxes => {
       return <div key={boxes.topRow} className="bounding-box" style={{top: boxes.topRow, right: boxes.rightCol, bottom: boxes.bottomRow, left: boxes.leftCol }}></div> 
       
      })
    }
    
     </div>
     <div>


     </div>
   </div>
    
    );
}

export default FaceRecognition