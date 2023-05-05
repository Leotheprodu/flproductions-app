import { SET_SESSION, SET_SESSION_ROLES } from './userTypes';

export const setSession = (session) => {
    return {
        type: SET_SESSION,
        payload: session,
    };
};
export const setSessionRoles = (roles) => {
    return {
        type: SET_SESSION_ROLES,
        payload: roles,
    };
};
