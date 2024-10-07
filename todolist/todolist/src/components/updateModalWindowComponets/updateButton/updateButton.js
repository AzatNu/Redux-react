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
    const TODOLIST = useSelector(TODOLISTSelector);
    const refreshPage = useSelector(refreshPageSelector);

    const requestUpdateTodo = (id, title) => {
        return (dispatch) => {
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

            fetch(`http://localhost:3005/todos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title }),
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch({
                        type: "SET_TODOLIST",
                        TODOLIST: [...TODOLIST, data],
                    });
                    dispatch({
                        type: "SET_REFRESH_PAGE",
                        refreshPage: !refreshPage,
                    });
                });
        };
    };
    const handleClick = () => {
        dispatch({ type: "SET_UPDATE_BUTTON_CLICK", updateButtonClick: false });
        dispatch({ type: "SET_ADD_INPUT_VALUE", addInputValue: "" });
    };

    return (
        <button
            onClick={() => {
                dispatch(requestUpdateTodo(Id, addInputValue));
                handleClick();
            }}
            className={style["modal-button"]}
        >
            &#x2714; Обновить
        </button>
    );
};
