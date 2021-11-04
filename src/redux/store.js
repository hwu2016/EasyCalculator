import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {typeReducer} from './reducers/simple'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(typeReducer, composeWithDevTools(applyMiddleware(thunk)))