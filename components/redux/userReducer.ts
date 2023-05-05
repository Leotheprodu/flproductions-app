import { SET_SESSION, SET_SESSION_ROLES } from './userTypes';

interface Session {
    session: object;
}

const initialState = {
    session: { isLoggedIn: false, user: {}, roles: [] },
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
        default:
            return state;
    }
};

export default userReducer;
