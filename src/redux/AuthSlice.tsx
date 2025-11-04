import { createSlice } from "@reduxjs/toolkit";
 interface userInterface {
  name: string
  email: string
  password: string
  
 }
interface UserState{
    user: userInterface|null;
    token:string|null;
    isLoggedIn:boolean;
    shareLink:string|null
    
}
const initialState:UserState={
    user:null,
    token:null,
    isLoggedIn:false,
    shareLink:null,
}

export const authSlice=createSlice({

    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.token=action.payload?.token ?? null;
            state.user=action.payload?.user ?? null;
            console.log("safely logged in ")
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.token= null;
            state.user=null;
            state.shareLink = null;
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";


        },
        sharelink:(state,action)=>{
            state.shareLink=action.payload?.shareLink ?? null
        }

    }
})
export const { login, logout, sharelink } = authSlice.actions;
export default authSlice.reducer