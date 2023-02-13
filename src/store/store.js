import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    claims : [],
    lastFetch : null,
    currentUser : {}
}


//action : {type : ...  , value : ...}
// { type : login, value { name : "Matt", role : "admin" }}
// { type : logout}
// { type : updateCountries, value : ["a","b","c"]}

const reducer = (state = initialState, action) => {
    if(action.type === "updateClaims") {
        return {...state, claims : action.value, lastFetch: new Date().getTime()}
    }
    else if (action.type === "login") {
        return {...state, currentUser : action.value, lastFetch: new Date().getTime()}
    }
    else if (action.type === "logout") {
        return {...state, currentUser : {}}
    }
    return state;
}

const store = configureStore({reducer : reducer});
export default store;