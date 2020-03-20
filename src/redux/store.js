import { createStore, applyMiddleware, compose } from 'redux';
import logger from "redux-logger";
import {persistStore} from "redux-persist";

import rootReducer from "./root-reducer"

const middlewares = [logger];

let composeEnhancers;
if(process.env.NODE_ENV !== "production"){
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
else{
  composeEnhancers = compose;
}

export const store = createStore(rootReducer,composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
