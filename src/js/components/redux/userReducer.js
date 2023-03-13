import { SET_SESSION } from './userTypes';

const initialState = {
    session: { isLoggedIn: false, user: {}, roles: [] }

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SESSION:
            return {
                ...state,
                session: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;