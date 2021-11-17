import * as types from '../types';

const INITIAL_STATE = [];

export default function message(state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.ADD_MESSAGE:
			return [...state, action.payload];
		default:
			return state;
	}
}
