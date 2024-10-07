import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    TODOLISTSelector,
    refreshPageSelector,
    selectErrorMessage,
    updateButtonSelector,
} from "./selectors/index";

import { ErrorMessageModalWindow } from "./components/errorMessageWindowComponents/errorMessageModalWinowComponent.js";
import { UpdateModalWindow } from "./components/updateModalWindowComponets/updateModalWindowComponent";
import { SearchSort } from "./components/searchSortComponents/searchSrotComponent.js";

export const App = () => {
    const dispatch = useDispatch();
    const TODOLIST = useSelector(TODOLISTSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const errorMessage = useSelector(selectErrorMessage);

    const updateButtonClick = useSelector(updateButtonSelector);

    const requestGetTodos = () => {
        return async (dispatch) => {
            const response = await fetch("http://localhost:3005/todos");
            const data = await response.json();
            dispatch({ type: "SET_TODOLIST", TODOLIST: data });
        };
    };
    useEffect(() => {
        dispatch(requestGetTodos());
    }, [refreshPage]);

    const requestDeleteTodo = (id) => (dispatch) => {
        dispatch({ type: "SET_IS_DELEITING", isDeleiting: true });
        fetch(`http://localhost:3005/todos/${id}`, {
            method: "DELETE",
        }).then((response) => {
            return response.json();
        });
        dispatch({ type: "SET_IS_DELEITING", isDeleiting: false });
        dispatch({
            type: "SET_REFRESH_PAGE",
            refreshPage: !refreshPage,
        });
    };

    const openUpdateModalWindow = (id) => {
        dispatch({ type: "SET_ID", Id: id });
        dispatch({ type: "SET_UPDATE_BUTTON_CLICK", updateButtonClick: true });
    };

    return (
        <div className={style["App"]}>
            {errorMessage && <ErrorMessageModalWindow />}
            <h1 className={style["title"]}>TODOLIST</h1>
            <div className={style["content"]}>
                <SearchSort />

                {TODOLIST.length === 0 && (
                    <h2 className={style["empty"]}>Задачи отсутствуют</h2>
                )}
                {Object.keys(TODOLIST).map((item, index) => (
                    <div className={style["item"]} key={index}>
                        <button
                            className={style["delete"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Удалить задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                dispatch(requestDeleteTodo(TODOLIST[item].id));
                            }}
                        >
                            X
                        </button>
                        <button
                            className={style["update"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Редактировать задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                openUpdateModalWindow(TODOLIST[item].id);
                            }}
                        >
                            &#x270E;
                        </button>
                        {`Задача: ${TODOLIST[item].id}`} —{" "}
                        {TODOLIST[item].title}
                    </div>
                ))}
                {updateButtonClick && <UpdateModalWindow />}
            </div>
        </div>
    );
};
