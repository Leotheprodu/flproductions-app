import {
    SET_SESSION,
    SET_SESSION_ROLES,
    SET_SESSION_ARTISTA,
    SET_SESSION_USER_MESSAGE,
} from './userTypes';

interface Session {
    session: SessionState;
}
interface UserMessage {
    message: string;
    messageType: 'error' | 'warning' | 'notification';
}
export interface SessionState {
    isLoggedIn: boolean;
    user: any;
    roles: number[];
    artista: any;
    message: string;
    userMessage: UserMessage;
}
const initialState: {
    session: SessionState;
} = {
    session: {
        isLoggedIn: false,
        user: {},
        roles: [],
        artista: null,
        message: '',
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
        default:
            return state;
    }
};

export default userReducer;
