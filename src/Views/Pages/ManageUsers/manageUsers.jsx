import React,{useState} from 'react'
import axios from 'axios'
import UserModel from '../../../Models/userModel'
import { useSelector } from 'react-redux';
import './manageUsers.css'
import UserSection from './component/manageUserComponent'


export default (props)=>{
    const [userObject,setUserObject] = useState(new UserModel(props.user));   
    const {auth} = useSelector(state=>state)
    const [display,setDisplay] = useState(false);
  
    function getUsers(e){
    e.preventDefault()
    if (auth.demo){
        alert("Cannot manage users using demo")
        return false
    }
    setDisplay(true);
}


    function inputChanged(e){
        setUserObject({
            ...userObject,
            [e.target.name]:e.target.value
        })
    }
    function back(e){
        e.preventDefault()
        setDisplay(false);
    }
    async function submit(e){
        e.preventDefault()
        if (auth.demo){
            alert("Cannot create user using demo")
            return false
        }
        if (!props.user._id){
        const registered ={
            fullName : userObject.fullName,
            userName : userObject.userName,
            email : userObject.email,
            password : userObject.password,
            role : userObject.role,
        }
        await axios.post("https://bug-tracker-arif.herokuapp.com/signUp", registered)
            .then((response=>{
                alert(response.data.message)
                if (response.data.success){
                    window.location.reload();
                    
                }
                return ;
              })).catch((err)=>{
                  console.log(err)
                return })
            
            }

            
     
        await axios.post("https://bug-tracker-arif.herokuapp.com/updateUser?token="+props.user._id, userObject)
        .then((response)=>{
            alert(response.data.message)
                if (response.data.success){
                    window.location.reload();
                    return false;
                }
              }).catch((err)=>{
                  console.log(err) 
                  return;
                })       
    }


    return(
        <div className = "page-container">
            
            {!display  ?
            <div className="bug-create">
                {props.user._id  ? <h1>Edit User</h1> : <h1>Create New User</h1> }
                {props.user._id && <button onClick={props.close} className='close-btn' aria-label="Close alert"><span aria-hidden="true">&times;</span> </button>}
                <form>
                    <label>Full Name: </label>
                    <input 
                    name="fullName"
                    placeholder="Full Name" 
                    value={userObject.fullName} 
                    required onChange={inputChanged}
                    className="form-control form-group"/>
                    <label>Username: </label>
                    <input 
                    name="userName"
                    placeholder="Username"
                    value={userObject.userName}
                    required onChange={inputChanged}
                    className="form-control form-group"
                    />
                    {auth.email !== props.user.email &&<label>Email: </label>}
                    {auth.email !== props.user.email && <input 
                     name="email"
                    placeholder="Email"
                    value={userObject.email}
                    required onChange={inputChanged}
                    className="form-control form-group"
                    />}
                    {!props.user._id &&  <label>Password: </label>}
                    {!props.user._id &&<input 
                     name="password"
                    type="password"
                    placeholder="Password"
                    value={userObject.password}
                    required onChange={inputChanged}
                    className="form-control form-group"/> 
                    }
                    
                    {auth.email !== props.user.email && <label>Role: </label>}
                    {auth.email !== props.user.email && <select name="role" value={userObject.admin} required onChange={inputChanged}>
                        <option>Admin</option>
                        <option>Client</option>
                    </select>
                    }
                    <button type="sumbit" className="" onClick={submit} >{props.user._id ?"Edit User": "Create New User"}</button>
                </form>
                {!props.user._id && <button onClick= {getUsers}>Manage Users</button>}
            </div>
            : <UserSection back={back}/>}
        </div>
    )
       
}