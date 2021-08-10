import Login from './Views/Pages/Login/login'
import axios from 'axios'
import React,{useEffect} from 'react'
import {setBugs} from './Controllers/Redux/bugSlice'
import {useDispatch,useSelector} from 'react-redux'
import {getAllUsers} from './Controllers/Redux/authSlice'
import ViewBugPage from './Views/Pages/ViewBug/viewBugs'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from './Views/Pages/Dashboard/dashboard'
import Sidebar from './Views/sidebar/sidebar'
import Topbar from './Views/topbar/topbar'
import CreateBug from './Views/Components/Bug Create/bugForm'
import ManageUsers from './Views/Pages/ManageUsers/manageUsers'
import { signIn } from './Controllers/Redux/authSlice'


function App() {
  const{auth,bugs} = useSelector(state=> state)
  const dispatch =useDispatch()
  


  const token = localStorage.getItem('token');
  useEffect(()=>{
  if (token){
    dispatch(signIn({
     login:true,
     admin: JSON.parse(localStorage.getItem('admin')),
     demo: false,
     fullName: localStorage.getItem('name'),
     token: token,
     user:localStorage.getItem('user'),
     email:localStorage.getItem('email')
     }))
     if (JSON.parse(localStorage.getItem('admin'))){
      axios.get("https://bug-tracker-arif.herokuapp.com/getBugs")
         .then((response)=>{
             const data = response.data
             dispatch(setBugs({
                 bugs: data.bugs}))
         })
     }else{
      axios.get("https://bug-tracker-arif.herokuapp.com/getSpecificBugs?name="+ localStorage.getItem('name'))
      .then((response)=>{
          const data = response.data
          dispatch(setBugs({
              bugs: data.bugs}))
      })
     }
     
     axios.get("https://bug-tracker-arif.herokuapp.com/users")
         .then((response=>{
             const users = response.data.users;
             const clients = users.filter(user => user.role === "Client")
             dispatch(getAllUsers({users:users,clients:clients}));
         })
         )
   };   
 },[])
 
   
  


  
  const defaultBug = {
    _id:bugs.bug.length,
    priority:1,
    type:1,
    assigned:1,
    creator: auth.fullName,
  }
  const defaultUser = {
    role: "Admin"
  }
  return (
    <Router>
    {!auth.LoggedIn ? <Login /> : 
      <>
        <Topbar/>
        <Sidebar/>
        <div className="Page">
          <Switch>
            <Route path="/" exact><Dashboard /></Route>
            <Route path="/viewbugs"><ViewBugPage /></Route>
            <Route path="/create"><div className="page-container"><CreateBug bug={defaultBug} title="Create Bug" /></div></Route>
            <Route path="/manageUsers"><div className="page-conatiner"><ManageUsers user={defaultUser}/></div></Route>
          </Switch>
        </div>
       
      </>
    }
    </Router>
  );
}

export default App;
