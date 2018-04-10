import { applyMiddleware, createStore, combineReducers } from 'redux';
import * as reducers from 'reducers';
import thunk from 'redux-thunk';


const initialState = {};

export const createNewStore = (state = initialState) => (
    createStore(
        combineReducers({
            ...reducers
        }),
        state,
        applyMiddleware(thunk)
    )
);

export default createNewStore();