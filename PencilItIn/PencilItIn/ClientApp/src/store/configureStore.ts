import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { ApplicationState } from './types';
import * as OfficeHours from './OfficeHours';

export default (history: History, initialState?: ApplicationState): Store => createStore(
    combineReducers({
        officeHours: OfficeHours.reducer,
        router: connectRouter(history)
    }),
    initialState,
    compose(
        applyMiddleware(...[thunk, routerMiddleware(history)]),
        ...(window && (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()] : [])
    )
);
