import { SET_USER, SET_ROLES } from './userTypes';

const initialState = {
    user: null,
    roles: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_ROLES:
            return {
                ...state,
                roles: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;