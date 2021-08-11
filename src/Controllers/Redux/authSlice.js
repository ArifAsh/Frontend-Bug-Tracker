import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name:"auth",
    initialState: {
        LoggedIn:false,
        admin:false,
        role: "",
        fullName: "",
        demo: true,
        token: "",
        users : [],
        clients : [],
        email: "",
        user:{}
    
    },
    reducers:{
        signIn:(state,action)=>{
   
            const {fullName,admin,role,demo,token,login,email,user} = action.payload;
            state.fullName = fullName;
            state.LoggedIn = login;
            state.admin = admin;
            state.role = role;
            state.demo = demo;
            state.token = token;
            state.email = email;
            state.user = user;
            
        },
        signOut:(state)=>{
            state.LoggedIn = false;
            state.admin = false;
            state.fullName = "";
            localStorage.setItem('token',"");
            localStorage.setItem('admin',"");
            localStorage.setItem( 'name',"");
            window.location = "/";
            
        },
        getAllUsers:(state,action)=>{
            return{
                ...state,
                users: [...action.payload.users],
                clients: [...action.payload.clients]
            }

        }
    }
})

export default slice.reducer;
export const {signIn,signOut,getAllUsers} = slice.actions;