import style from "../../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    addInputValueSelector,
    refreshPageSelector,
    IdSelector,
    TODOLISTSelector,
} from "../../../selectors/index";
export const UpdateButton = () => {
    const dispatch = useDispatch();
    const addInputValue = useSelector(addInputValueSelector);
    const Id = useSelector(IdSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const TODOLIST = useSelector(TODOLISTSelector);
    const requestUpdateTodo = async (id, title) => {
        if (title.trim() === "") {
            dispatch({
                type: "SET_ERROR_MESSAGE",
                errorMessage: "Задача не может быть пустой",
            });
            return;
        } else if (TODOLIST.some((todo) => todo.title === title.trim())) {
            dispatch({
                type: "SET_ERROR_MESSAGE",
                errorMessage: "Задача уже существует",
            });
            return;
        }
        const response = await fetch(`http://localhost:3005/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title }),
        });
        const data = await response.json();
        dispatch({ type: "SET_TODOLIST", TODOLIST: data });
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: !refreshPage });
    };
    const handleClick = () => {
        dispatch({ type: "SET_UPDATE_BUTTON_CLICK", updateButtonClick: false });
        dispatch({ type: "SET_ADD_INPUT_VALUE", addInputValue: "" });
    };

    return (
        <button
            onClick={() => {
                requestUpdateTodo(Id, addInputValue);
                handleClick();
            }}
            className={style["modal-button"]}
        >
            &#x2714; Обновить
        </button>
    );
};
