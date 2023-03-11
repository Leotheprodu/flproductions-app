import { SET_USER, SET_SESSION } from './userTypes';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const setSession = (session) => {
    return {
        type: SET_SESSION,
        payload: session
    };
};