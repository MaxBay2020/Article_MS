import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // email: 'wangxiaobei6666@gmail.com'
    email: localStorage.getItem('userEmail') || ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            localStorage.setItem('userEmail', action.payload.email)
            return state
        },

        logout: (state) => {
            state.email = ''
            localStorage.removeItem('userEmail')
        }
    }
})

export default userSlice.reducer

export const {
    login,
    logout
} = userSlice.actions
