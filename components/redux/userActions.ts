import { SessionState } from './userReducer';
import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER_MESSAGE,
} from './userTypes';

export const setSession = (session: SessionState) => {
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

export const setSessionArtista = (artista) => {
    return {
        type: SET_SESSION_ARTISTA,
        payload: artista,
    };
};

export const setUserMessage = (userMessage) => {
    return {
        type: SET_SESSION_USER_MESSAGE,
        payload: userMessage,
    };
};
