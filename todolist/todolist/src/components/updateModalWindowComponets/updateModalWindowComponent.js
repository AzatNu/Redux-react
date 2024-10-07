import style from "../../App.module.css";
import { UpdateModaInput } from "./updateModaInput/updateModalInput";
import { UpdateButton } from "./updateButton/updateButton";
import { CloseButton } from "./closeButton/closeButton";

export const UpdateModalWindow = () => {
    return (
        <>
            <div className={style["modal"]}>
                <div className={style["modal-content"]}>
                    <h2>Введите новый текст для задачи</h2>
                    <UpdateModaInput />
                    <UpdateButton />
                    <CloseButton />
                </div>
            </div>
        </>
    );
};
