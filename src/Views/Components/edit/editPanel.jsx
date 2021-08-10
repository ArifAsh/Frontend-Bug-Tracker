import React from 'react'
import './editPanel.css'

export default (props)=>{
    return(
        <div className='edit-panel'>
            <button className="delete" onClick = {props.deleteClicked}>Delete</button>
            <button className="edit" onClick  = {props.editClicked}>Edit</button>
            
        </div>
    )
}