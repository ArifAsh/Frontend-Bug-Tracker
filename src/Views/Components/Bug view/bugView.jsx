import React,{useState} from 'react'
import ViewSection from './component/bugViewSection'
import './bugView.css'
import BugModel from '../../../Models/bugModel'
import {useDispatch,useSelector} from 'react-redux'
import {markComplete,removeBug,getNewId} from '../../../Controllers/Redux/bugSlice'
import EditPanel from '../edit/editPanel'
import EditBug from '../Bug Create/bugForm'

import axios from 'axios'

export default (props)=>{
    const dispatch = useDispatch();
    const {auth,bugs} = useSelector(state=>state);
    const bug = new BugModel(props.bug);

    const [displayEdit,setDisplayEdit]= useState(false);

    function editClicked(){
        setDisplayEdit(!displayEdit)
        
        
    }

    function deleteClicked(){
        if (auth.demo){
        let currIndex = bug._id+1;
        const newBugIds = []
    
        while (currIndex < bugs.bug.length){
            const newBug = Object.assign({}, bugs.bug[currIndex]);
            newBug._id = currIndex-1;
            newBugIds.push(newBug)
            currIndex++
        }
     
        dispatch(removeBug(bug))
        dispatch(getNewId(newBugIds))
        return
    }
    axios.post("https://bug-tracker-arif.herokuapp.com/app/delete?token="+bugs.currBugToken)
    .then((response)=>{
        alert(response.data.message)
    })
    window.location.href = window.location.href;
    }
    function markCompletedClicked(){
        if (auth.demo){
            dispatch(markComplete(bug));
            return
        }
        bug.priority = 4;
        axios.post("https://bug-tracker-arif.herokuapp.com/app/update?token="+bugs.currBugToken,bug)
        .then((response)=>{
            alert(response.data.message)
        })
        window.location.href = window.location.href;
        

        
        
    }
    const priorities = ["High","Medium","Low","Completed"];
    const types = ["Bugs/Error","Feature Requests","Other Comments","Training/Document Requests"]
    return(
        <>
      
        <div className="bug-view">
            {displayEdit && <EditBug title="Edit Bug" bug={bug} close={props.clicked}/> }
            {!displayEdit && <>
            {auth.admin && <EditPanel editClicked={editClicked} deleteClicked={deleteClicked}/>}
            <button onClick={props.clicked} className='close-btn' aria-label="Close alert"><span aria-hidden="true">&times;</span></button>
            <h1>{bug.name}</h1>
            <ViewSection title = 'Details' info={bug.details} />
            <ViewSection title = 'Steps' info={bug.steps} />
            <ViewSection title = 'Priority' info={priorities[bug.priority-1]} />
            <ViewSection title = 'Creator' info={bug.creator} />
            <ViewSection title = 'App Version' info={bug.version} />
            <ViewSection title = 'Bug type' info={types[bug.type-1]} />
            <ViewSection title = 'Time Created' info={bug.time} /> 
            {parseInt(bug.priority) !== 4 && <button className="markComplete"onClick={markCompletedClicked }>Mark Complete &#10004;</button>}
            </>}
        </div>
        
        
     
        </>
    )
}