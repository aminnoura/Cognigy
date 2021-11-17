import { combineReducers } from 'redux';
import messageList from './MessageList';

export const rootReducer = combineReducers({
    messageList
});

export type RootState = ReturnType<typeof rootReducer>
