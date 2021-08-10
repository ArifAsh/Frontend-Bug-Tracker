import React,{useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import EditUser from '../manageUsers'
import './manageUserComponent.css'
export default (props)=>{
    const [user,setUser] = useState({      
        _id : "",
        fullName: "",
        userName: "",
        email: "",
        role: "Admin"})
    const {auth} =useSelector(state=>state);
    const [currUser,setCurrUser]= useState({display:false})

    function editUser(user){
        setUser({
            _id : user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            role: "Admin"
        })
        setCurrUser({
            display:true})
        }
        
   function close(){
  
   
     setCurrUser({
         display:false,
     })
 
    }
    async function deleteUser(user){
        
        await axios.post("https://bug-tracker-arif.herokuapp.com/deleteUser?token="+user._id)
        .then((response=>{
            alert(response.data.message)    
        })).catch((err=>console.log(err)))
        
            window.location.reload()
            return false
        }
    return(
        <div >
             {!currUser.display  ?
             <div className="table">
                <h1 style={{textAlign: "center"}}>All Users</h1>
                
                <table id = "table">
                
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Fullname</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {auth.users.map((user,count)=>(
                        <tr  className="userData"> 
                            
                            <td>{count+1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={()=>editUser(user)} style={{padding:"5px 10px",font:"15px thin"}}className="edit">Edit User</button>
                                {auth.email !== user.email && <button onClick={()=>deleteUser(user)} style={{padding:"5px 10px",font:"15px thin"}} className="delete">Delete User</button>}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
               
                <button onClick={props.back}>&#11013; Back</button>
                </div>
            
          
            : <EditUser close= {close} user={user}/>}
              </div>
     
    )
}