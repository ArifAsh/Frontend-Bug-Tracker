import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signOut} from '../../Controllers/Redux/authSlice'
import './sidebar.css'

export default ()=>{
    const dispatch = useDispatch();
    const {auth} = useSelector(state => state)

    function SignOut(){
        if (auth.demo){
        dispatch(signOut());
        }else{
            
            axios.get("https://bug-tracker-arif.herokuapp.com/app/logout?token="+auth.token)
            .then((response)=>{
                const data = response.data;
                console.log(data)
                dispatch(signOut());
                localStorage.setItem('token',"");
            })
        }
    }
    return (
        <div className="sidebar">
            <Link className='nav-link' to="/"><h1 style={{marginBottom:"0"}} className="brand">Welcome </h1> </Link>
            <h1 className="userName" >{auth.fullName}</h1>
            <ul>
            <Link to='/' className='nav-link' ><li>Dashboard</li></Link>
            <Link to='/viewbugs' className='nav-link'><li>View Bugs</li></Link>
            {auth.admin  && <Link to='/create' className='nav-link'><li>Create Bugs</li></Link> }
            {auth.admin  && <Link to='/manageUsers' className='nav-link'><li>Manage Users</li></Link>}
            </ul>
            <button className="nav-link logout" onClick={SignOut}>Logout</button>
        </div>
    )
}