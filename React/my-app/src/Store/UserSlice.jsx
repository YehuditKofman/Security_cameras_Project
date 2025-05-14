import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    name:"user",
    role: "user",
}

const UserSlice= createSlice({
    name:"User",
    initialState: initialValue,
    reducers:{
        Create_User:(state,action)=>{
            state.name= action.payload.name
            state.role= action.payload.role
        }
    }
})
export const {Create_User} = UserSlice.actions
export default UserSlice.reducer