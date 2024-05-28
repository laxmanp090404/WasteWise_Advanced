import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"User",
    initialState:{
        details:{},
        login:false
    },
    reducers:{
        addUser: (state, action) => {
            console.log("addUser reducer called with action ", action);
            state.details = action.payload;
          },
          loginState: (state, action) => {
            state.login = action.payload;
          },
          clearUser: (state) => {
            state.details = {};
            state.login = false;
          },
    }
})

export const { addUser, loginState, clearUser } = userSlice.actions;
export default userSlice.reducer;