import React, {useRef,useEffect} from 'react'
import './topbar.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'



export default()=>{
    const {auth} = useSelector(state=>state)
    const [DISPLAY,SETDISPLAY] = useState(false);
    const [showUser,setShowUser] = useState(false)
    const [pass,setPass] = useState({email: auth.email,currPass:"",newPass:""})
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
   
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    SETDISPLAY(false)
                    setShowUser(false)
                }
            }
          
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    function showMenu(){
        SETDISPLAY(!DISPLAY)
        setShowUser(false)
      

    }
 
    function redirect(e){
  
        if (auth.demo){
            alert("Cannot edit demo profile")
            return
        }
        setShowUser(true)
        
    }
    function inputChanged(e){
        
        setPass({
            ...pass,
            [e.target.name]:e.target.value
        })
    }
    async function submit(e){
        e.preventDefault();
        
        await axios.post("https://bug-tracker-arif.herokuapp.com/app/changePassword",pass)
        .then((response)=>{
            alert(response.data.message)
            if(response.data.success){
                window.location.reload(); 
                return false;   
            }
         })
            

    }

    return(
        <div ref={wrapperRef} >
        <div className="topbar">
            {auth.admin && auth.demo && <h3>Logged in as: Demo Admin</h3>}
            {!auth.admin && auth.demo && <h3>Logged in as: Demo Client</h3> }
            {auth.admin && !auth.demo && <h3>Logged in as: Admin</h3>}
            {!auth.admin && !auth.demo && <h3>Logged in as: Client</h3>}
            <button onClick={showMenu}>User Profile</button>
          
        </div>
        {DISPLAY && !showUser && 
            <div className="menu">
                <a onClick = {redirect}>Change Password</a>
              </div>}
        {showUser && DISPLAY &&
        <div>
            <form className="changePassword">
            <input type="password" name='currPass' placeholder='Current Password' required onChange={inputChanged}  value={pass.currPass}></input>
            <input type="password" name='newPass'placeholder='New Password' required onChange={inputChanged}  value={pass.newPass}></input>
            <button type='submit' onClick={submit}>Change Password</button>
            </form>
            </div>}
        </div>
        
    )
}