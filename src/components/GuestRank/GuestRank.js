import React from 'react';



const GuestRank = ({name, guestEntries}) => {
    
    return (
    
        
        <div>
        
            <div className="white f3">
            
            {`Hello ${name}, you have the following test runs left for today...`}
            
             </div>
        
            <div className="white f1">
            
            {guestEntries}
            
             </div>
        
        
        </div>
    
    )
}

export default GuestRank