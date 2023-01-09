import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from "./Slices/albumsSlice";

export default configureStore({
    reducer: {counterReducer},
})