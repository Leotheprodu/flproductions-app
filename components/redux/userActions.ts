import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
} from './userTypes';

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

export const setSessionArtista = (artista) => {
    return {
        type: SET_SESSION_ARTISTA,
        payload: artista,
    };
};
