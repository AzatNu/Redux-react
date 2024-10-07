import style from "../../../App.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
    addInputValueSelector,
    isAddingSelector,
    TODOLISTSelector,
} from "../../../selectors/index";

export const AddButton = () => {
    const dispatch = useDispatch();
    const addInputValue = useSelector(addInputValueSelector);
    const isAdding = useSelector(isAddingSelector);
    const TODOLIST = useSelector(TODOLISTSelector);

    const handleClick = () => {
        dispatch({ type: "SET_ADD_INPUT_VALUE", addInputValue: "" });
    };

    const requestAddTodo = async (addInputValue) => {
        dispatch({ type: "SET_IS_ADDING", isAdding: true });
        if (addInputValue.trim() === "") {
            dispatch({
                type: "SET_ERROR_MESSAGE",
                errorMessage: "Задача не может быть пустой",
            });
            dispatch({ type: "SET_IS_ADDING", isAdding: false });
            return;
        } else if (
            TODOLIST.some((todo) => todo.title === addInputValue.trim())
        ) {
            dispatch({ type: "SET_IS_ADDING", isAdding: false });
            dispatch({
                type: "SET_ERROR_MESSAGE",
                errorMessage: "Такая задача уже есть",
            });
            return;
        }
        const response = await fetch("http://localhost:3005/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: addInputValue }),
        });
        const data = await response.json();

        dispatch({ type: "SET_TODOLIST", TODOLIST: [...TODOLIST, data] });

        dispatch({ type: "SET_IS_ADDING", isAdding: false });
    };

    return (
        <button
            onMouseOver={(e) => (e.currentTarget.title = "Добавить задачу")}
            onMouseOut={(e) => (e.currentTarget.title = "")}
            disabled={isAdding}
            onClick={() => {
                requestAddTodo(addInputValue);
                handleClick();
            }}
            className={style["add"]}
        >
            +
        </button>
    );
};
