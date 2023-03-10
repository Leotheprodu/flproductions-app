import { SET_USER, SET_ROLES } from './userTypes';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const setRoles = (roles) => {
    return {
        type: SET_ROLES,
        payload: roles
    };
};