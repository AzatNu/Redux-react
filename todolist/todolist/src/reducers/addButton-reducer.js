import { initialState } from "../store";
export const AddButtonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REFRESH_PAGE":
            return {
                ...state,
                refreshPage: action.refreshPage,
            };
        case "SET_ADD_INPUT_VALUE":
            return {
                ...state,
                addInputValue: action.addInputValue,
            };
        case "SET_IS_ADDING":
            return {
                ...state,
                isAdding: action.isAdding,
            };
        case "SET_SORT_BUTTON_CLICKED":
            return {
                ...state,
                sortButtonClicked: action.sortButtonClicked,
            };
        case "SET_ID":
            return { ...state, Id: action.Id };
        case "SET_TODOLIST":
            return { ...state, TODOLIST: action.TODOLIST };
        case "SET_UPDATE_BUTTON_CLICK":
            return { ...state, updateButtonClick: action.updateButtonClick };
        default:
            return state;
    }
};
