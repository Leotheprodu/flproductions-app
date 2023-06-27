import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER_MESSAGE,
    SET_SESSION_USER,
    SET_SESSION_MUSIC,
} from './userTypes';

interface Session {
    session: SessionState;
}
interface UserMessage {
    message: string;
    messageType?: 'error' | 'warning' | 'notification';
}
export interface SessionState {
    isLoggedIn: boolean;
    user: Users;
    roles: number[];
    artista: any;
    userMessage: UserMessage;
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
        userMessage: {
            message:
                'Puedes preguntarme cualquier cosa que tenga que ver con el estudio',
            messageType: 'notification',
        },
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
        case SET_SESSION_USER_MESSAGE:
            return {
                ...state,
                session: {
                    ...state.session,
                    userMessage: action.payload,
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
