import style from "../../../App.module.css";
import { selectErrorMessage } from "../../../selectors/errorMessageWindow-selector";
import { useDispatch, useSelector } from "react-redux";

export const ErrorMessageWindow = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);
    const closeErrorWindow = () => {
        dispatch({ type: "SET_ERROR_MESSAGE", errorMessage: "" });
    };

    return (
        <div className={style["errorWindow"]}>
            <h2>{errorMessage}</h2>
            <button
                onClick={() => closeErrorWindow()}
                className={style["closeErrorWindow"]}
            >
                OK
            </button>
        </div>
    );
};
