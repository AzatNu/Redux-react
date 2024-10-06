import style from "../../../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addInputValueSelector } from "../../../selectors/index";

export const UpdateModaInput = () => {
    const dispatch = useDispatch();
    const addInputValue = useSelector(addInputValueSelector);
    const handleClick = (e) => {
        dispatch({
            type: "SET_ADD_INPUT_VALUE",
            addInputValue: e.target.value,
        });
    };
    return (
        <input
            placeholder="Новый текст для задачи"
            className={style["modal-input"]}
            type="text"
            value={addInputValue}
            onChange={(e) => handleClick(e)}
        />
    );
};
