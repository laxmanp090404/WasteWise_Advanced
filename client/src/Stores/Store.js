import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slices/userSlice';
import bookingReducer from '../Slices/bookingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
    },
});

export default store;
