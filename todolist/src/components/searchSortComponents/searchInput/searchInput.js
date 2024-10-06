import style from "../../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addInputValueSelector } from "../../../selectors/index";

export const SearchInput = () => {
    const dispatch = useDispatch();
    const addInputValue = useSelector(addInputValueSelector);
    const setAddInputValueHandler = (e) => {
        dispatch({
            type: "SET_ADD_INPUT_VALUE",
            addInputValue: e.target.value,
        });
    };

    return (
        <input
            className={style["search-input"]}
            placeholder="Найти задачу или добавить её"
            type="text"
            value={addInputValue}
            onChange={(e) => setAddInputValueHandler(e)}
        />
    );
};
