import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER,
    SET_SESSION_MUSIC,
} from './userTypes';

interface Session {
    session: SessionState;
}
export interface SessionState {
    isLoggedIn: boolean;
    user: Users;
    roles: number[];
    artista: any;
    music: Music;
}
export interface Users {
    username: string;
    email: string;
    fecha_creacion: Date;
    activo: number;
}
export interface Music {
    producciones: Array<any>;
    artistas: Array<any>;
    produccionActual: object;
    playlists: object;
}
const initialState: {
    session: SessionState;
} = {
    session: {
        isLoggedIn: false,
        user: {
            username: '',
            email: '',
            fecha_creacion: null,
            activo: 1,
        },
        roles: [],
        artista: null,
        music: {
            producciones: [],
            artistas: [],
            produccionActual: null,
            playlists: {
                default: [],
                played: [],
                tuanis: [],
            },
        },
    },
};

const userReducer = (state: Session = initialState, action) => {
    switch (action.type) {
        case SET_SESSION:
            return {
                ...state,
                session: action.payload,
            };
        case SET_SESSION_ROLES:
            return {
                ...state,
                session: {
                    ...state.session,
                    roles: action.payload,
                },
            };
        case SET_SESSION_ARTISTA:
            return {
                ...state,
                session: {
                    ...state.session,
                    artista: action.payload,
                },
            };

        case SET_SESSION_USER:
            return {
                ...state,
                session: {
                    ...state.session,
                    user: action.payload,
                },
            };

        case SET_SESSION_MUSIC:
            return {
                ...state,
                session: {
                    ...state.session,
                    music: action.payload,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
