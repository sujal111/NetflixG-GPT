
import {configureStore} from "@reduxjs/toolkit"
import { useReducer } from "react";

import movieReducer from "./moviesSlice";

const appStore=configureStore({
reducer:{
    user: useReducer,
    movie: movieReducer,

}
});

export default appStore;