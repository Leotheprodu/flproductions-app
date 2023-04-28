import { SET_SESSION } from './userTypes';

export const setSession = (session) => {
    return {
        type: SET_SESSION,
        payload: session,
    };
};
