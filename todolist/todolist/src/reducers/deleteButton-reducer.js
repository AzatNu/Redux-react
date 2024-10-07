import { initialState } from "../store";
export const deleteButtonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_DELETEING":
            return {
                ...state,
                isDeleteing: action.isDeleteing,
            };

        default:
            return state;
    }
};
