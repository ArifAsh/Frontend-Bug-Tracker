import axios from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import img from '../../../images/user-image.png'
import {signIn,getAllUsers} from '../../../Controllers/Redux/authSlice'
import { setBugsDemo} from '../../../Controllers/Redux/bugSlice'

import './login.css'
export default()=>{
    const dispatch = useDispatch();

    const [display,setDisplay] = useState(true)
    const [formInput,setFormInput] = useState({
        admin:false,
        name:"",
        password:"",
      
    });

    function inputChanged(e){   // when input is chnaged
        setFormInput({
            ...formInput,
            [e.target.name]:e.target.value  //sets the state of the variables
        })
    }

    function DemoAdmin(e){
        e.preventDefault();        //prevents page from automatically reloading after hitting submit
        if (!formInput.name){
            alert("Name cannot be blank")
            return
        }
        dispatch(setBugsDemo())
        dispatch(signIn({fullName:formInput.name,admin:true,demo:true,login:true}));     //sends state of form to signIn reducer
    
    
    }
      
    function DemoClient(e){
        e.preventDefault();       //prevents page from automatically reloading after hitting submit  
        if (!formInput.name){
            alert("Name cannot be blank")
            return
        }
        dispatch(setBugsDemo())
        dispatch(signIn({fullName:formInput.name,admin:false,demo:true,login:true}));      //sends state of form to signIn reducer

   
    }
    async function Login (e){
        e.preventDefault();
        const info = {
            email: formInput.name,
            password: formInput.password
        }
      
        await axios.post("https://bug-tracker-arif.herokuapp.com/app/signIn",info)
        .then((response)=>{
            const data = response.data;
            
            if (data.success === true){
                let admin = "";
                if (data.user.role === "Admin"){
                    admin = true;
                }else{ 
                    admin = false
                }
                dispatch(signIn({
                fullName:data.user.fullName,
                user: data.user,
                admin: admin,
                token: data.token,
                email: data.user.email
                }))
                localStorage.setItem('token',data.token);
                localStorage.setItem('user',data.user);
                localStorage.setItem('email',data.user.email);
                localStorage.setItem('admin',JSON.stringify(admin));
                localStorage.setItem( 'name',data.user.fullName);
                axios.get("https://bug-tracker-arif.herokuapp.com/app/verify?token="+data.token)
                .then((response)=>{
                    console.log(response)
                    
                })
                window.location.href = window.location.href; 
            }else{
                alert(response.data.message)}
        })
    
     
        
        return false;
    }
  
    function changeToDemo(){
        setDisplay(!display)
    }

    return(
        <div className="loginBG">
            {display && 
                <form className='login-panel'>
                    
                    <h1>Bug Tracker</h1>
                    
                   
                    <input label name='name' placeholder = 'Email' onChange={inputChanged} value={formInput.name}></input>
                   
                    <br></br>
                    
                    <input name='password' type='password' placeholder = 'Password' onChange={inputChanged} value={formInput.password}></input>
                    
                    <br></br>
                    <button type='submit' onClick={Login}>Login</button>
                    <p>Sign in as a <a href="#" onClick={changeToDemo}> Demo User</a></p>
                   
                </form>
                }
                {!display && 
                <form className='login-panel'>
                    <h1 >Demo Users</h1>
                    <input label name='name' placeholder = 'Enter name' required onChange={inputChanged} value={formInput.name}></input>
                    <br></br>
                    <div className="DemoUsers">
                    <div className="demo" style={{borderRight:"1px groove black"}} onClick={DemoAdmin}>
                    <img style={{width:"30%", height:"50%"}}src={img} name="saveForm" alt="cannot display" />
                    <h3>Demo Admin</h3>
                    </div>
                    <div className="demo" onClick={DemoClient}>
                    <img style={{width:"30%", height:"50%"}}src={img} name="saveForm" alt="cannot display" />
                    <h3>Demo Client</h3>
                    </div>
                    </div>
                    <p>Back to <a href="#" onClick={changeToDemo}> Login Page</a></p>
                </form>
                }
           
        </div>
    )
}