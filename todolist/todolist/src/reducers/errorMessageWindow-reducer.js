import { initialState } from "../store";

export const errorMessageWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.errorMessage,
            };

        default:
            return state;
    }
};
