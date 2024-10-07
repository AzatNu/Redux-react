import style from "../../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    refreshPageSelector,
    sortButtonClickedSelector,
    TODOLISTSelector,
    addInputValueSelector,
} from "../../../selectors/index";

export const SearchButtons = () => {
    const dispatch = useDispatch();
    const refreshPage = useSelector(refreshPageSelector);
    const sortButtonClicked = useSelector(sortButtonClickedSelector);
    const TODOLIST = useSelector(TODOLISTSelector);
    const addInputValue = useSelector(addInputValueSelector);

    const sortButtonClickedHandler = () => {
        dispatch({
            type: "SET_SORT_BUTTON_CLICKED",
            sortButtonClicked: !sortButtonClicked,
        });
    };
    const sortTODOLIST = () => {
        if (!sortButtonClicked) {
            const sortedTODOLIST = [...TODOLIST].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            dispatch({
                type: "SET_TODOLIST",
                TODOLIST: sortedTODOLIST,
            });
        } else {
            const sortedTODOLIST = [...TODOLIST].sort((a, b) =>
                b.title.localeCompare(a.title)
            );
            dispatch({
                type: "SET_TODOLIST",
                TODOLIST: sortedTODOLIST,
            });
        }
    };
    const serchInTODOLIST = () => {
        if (addInputValue === "") {
            dispatch({
                type: "SET_ERROR_MESSAGE",
                errorMessage: "Введен пустой поисковой запрос",
            });
            return;
        } else {
            const newTODOLIST = TODOLIST.filter((todo) =>
                todo.title
                    .toLowerCase()
                    .trim()
                    .includes(addInputValue.toLowerCase().trim())
            );
            dispatch({ type: "SET_TODOLIST", TODOLIST: newTODOLIST });
        }
    };
    const handleClick = () => {
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: !refreshPage });
        dispatch({ type: "SET_ADD_INPUT_VALUE", addInputValue: "" });
    };
    return (
        <>
            <button className={style["serch-button"]} onClick={serchInTODOLIST}>
                Найти
            </button>
            <button onClick={handleClick} className={style["serch-button"]}>
                Сбросить
            </button>
            <button
                onClick={() => {
                    sortButtonClickedHandler();
                    sortTODOLIST();
                }}
                className={style["serch-button"]}
            >
                {sortButtonClicked ? "A — я" : "я — A"}
            </button>
        </>
    );
};
