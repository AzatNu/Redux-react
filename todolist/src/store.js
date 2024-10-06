import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
    deleteButtonReducer,
    errorMessageWindowReducer,
    AddButtonReducer,
} from "./reducers";
export const initialState = {
    TODOLIST: [],
    errorMessage: "",
    addInputValue: "",
    refreshPage: false,
    sortButtonClicked: false,
    Id: 0,
    updateButtonClick: false,
    isLoading: false,
    isAdding: false,
    isDeleting: false,
};

const reducer = combineReducers({
    reducerDeleteButton: deleteButtonReducer,
    reducerErrorWindow: errorMessageWindowReducer,
    reducerAddButton: AddButtonReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
