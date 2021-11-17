import * as types from '../types';

export const addMessage = payload => (
	{ type: types.ADD_MESSAGE, payload }
);
