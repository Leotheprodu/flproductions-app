import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER_MESSAGE,
    SET_SESSION_USER,
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
}
export interface Users {
    username: string;
    email: string;
    fecha_creacion: Date;
    activo: number;
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
                'Hola, estaré apareciendo por aquí cuando necesite informarte algo',
            messageType: 'notification',
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
        default:
            return state;
    }
};

export default userReducer;
