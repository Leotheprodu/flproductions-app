import { SessionState } from './userReducer';
import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER,
    SET_SESSION_MUSIC,
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
export const setSessionUser = (user) => {
    return {
        type: SET_SESSION_USER,
        payload: user,
    };
};
export const setSessionMusic = (music) => {
    return {
        type: SET_SESSION_MUSIC,
        payload: music,
    };
};
