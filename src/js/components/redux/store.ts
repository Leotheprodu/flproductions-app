import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
