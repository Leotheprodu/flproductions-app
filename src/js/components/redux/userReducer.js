import { SET_USER, SET_SESSION } from './userTypes';

const initialState = {
    user: null,
    session: {}

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
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