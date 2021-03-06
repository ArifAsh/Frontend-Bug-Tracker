import React,{useState} from 'react'
import axios from 'axios'
import './bugForm.css'
import BugModel from '../../../Models/bugModel'
import {createBugs,updateBug} from '../../../Controllers/Redux/bugSlice'
import { useDispatch, useSelector } from 'react-redux';

export default (props) =>{
    const [bugObject,setBugObject] = useState(new BugModel(props.bug));
    
    const {auth,bugs} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [clicked,setClicked] = useState({
        isClicked:false,
        display:false,
    }) 
    function inputChanged(e){
        setClicked({isClicked: false, display: false})
        setBugObject({
            ...bugObject,
            [e.target.name]:e.target.value
        })
    }
  
    
    async function createBug(e){
        e.preventDefault();
       
        if (bugObject.priority > 3){
           bugObject.priority = 1;
        }
     
       
        if ( !bugObject.name  || !bugObject.steps  || !bugObject.version || !bugObject.details ){ 
            setClicked({isClicked: true, display: false})
        }else{
            setBugObject({
                ...bugObject,
                creator: auth.fullName,
            })
            if (props.title === "Edit Bug" && auth.demo ){
                dispatch(updateBug(bugObject))
                alert("Ticket updated")
             

            }else if (props.title === "Edit Bug" && !auth.demo){
                const names = auth.clients.map(clients =>clients.fullName)
                if (parseInt(bugObject.assigned) === 1 || !names.includes(bugObject.assigned)){
                    console.log("here")
                    bugObject.assigned = auth.clients[0].fullName;
                }
                await axios.post("https://bug-tracker-arif.herokuapp.com/app/update?token="+bugs.currBugToken,bugObject) 
                .then((response)=>{
                   alert(response.data.message)
                })
                window.location.href = window.location.href;
                return false;   
            }else if(props.title ==="Create Bug" && !auth.demo){
                if (parseInt(bugObject.assigned) === 1){
                    bugObject.assigned = auth.clients[0].fullName;
                }
                console.log(bugObject.assigned)
                setClicked({isClicked: true, display: true})
                await axios.post("https://bug-tracker-arif.herokuapp.com/app/createBug",bugObject)
                .then((response)=>{
                    const data = response.data;
                    console.log(data);
                })
                window.location.href = window.location.href; 
                return false;
            }
            else{
                setClicked({isClicked: true, display: true});
                dispatch(createBugs([bugObject]));
            
            }
        }
        }
        
        
       
      
    
    
    return (
        <div className="page-container">
            <div className='bug-create'>
                {props.title === "Edit Bug" && <button onClick={props.close}className='close-btn' aria-label="Close alert"><span aria-hidden="true">&times;</span></button>}
                <h1>{props.title}</h1>
                <form>
                    <label>Name:</label>
                    <input name ='name' placeholder='Bug Name' required onChange={inputChanged} value={bugObject.name}></input>
                    <label>Details:</label>  
                    <textarea name='details' placeholder='Detailed description on the bug' required onChange={inputChanged} value={bugObject.details}></textarea>
                    <label>Steps:</label>
                    <textarea name='steps' placeholder='Steps to recreate the bug' required onChange={inputChanged} value={bugObject.steps}></textarea>
                    <label>Priority:</label>    
                    <select name='priority' required onChange={inputChanged} value={bugObject.priority}>
                        <option value='1'>High</option>
                        <option value='2'>Medium</option>
                        <option value='3'>Low</option>
                        
                    </select>
                    <label>Type:</label>   
                    <select name='type' required onChange={inputChanged} value={bugObject.type}>
                        <option value='1'>Bugs/Error</option>
                        <option value='2'>Feature Requests</option>
                        <option value='3'>Other Comments</option>
                        <option value='4'>Training/Document Requests</option>
                    </select>
                    <label>Assigned:</label>
                    <select name='assigned' required onChange={inputChanged} value={bugObject.assigned}>
                        {!auth.demo && auth.clients.map((client)=>(
                            <option>{client.fullName}</option>
                        ))}
                       
                    </select>
                    <label>Application Version:</label>
                    <input name='version' placeholder='Application Version' onChange={inputChanged} value={bugObject.version}></input>
                    <button type='submit' onClick={createBug}>{props.title}</button>
                </form>
                {clicked.isClicked && clicked.display && alert("Ticket Created") &&
                setClicked({isClicked: false, display: false})}
                {clicked.isClicked && !clicked.display && alert("Please fill in all fields") &&
                 setClicked({isClicked: false, display: false})}
                
            </div>
        </div>
    )
}