import style from "../../../App.module.css";
import { useDispatch } from "react-redux";

export const CloseButton = () => {
    const dispatch = useDispatch();

    const closeModalWindow = () => {
        dispatch({ type: "SET_UPDATE_BUTTON_CLICK", updateButtonClick: false });
        dispatch({ type: "SET_ID", Id: 0 });
    };
    return (
        <button
            onClick={() => {
                closeModalWindow();
            }}
            className={style["modal-button"]}
        >
            &#x2716; Закрыть
        </button>
    );
};
