import { createStore } from "redux";

const initialState = {
    isLoggedin: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){

        case 'LOG_IN':
            return {
                ...state,
                isLoggedin: true
            }

        case 'LOG_OUT':
            return {
                ...state,
                isLoggedin: false
            }

        default:
            return state;
    }
}

export default createStore(reducer)