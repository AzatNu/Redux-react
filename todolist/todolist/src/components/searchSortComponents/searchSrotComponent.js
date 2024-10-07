import style from "../../App.module.css";
import { SearchInput } from "../../components/searchSortComponents/searchInput/searchInput";
import { SearchButtons } from "../../components/searchSortComponents/searchButtons/searchButtons";
import { AddButton } from "../../components/searchSortComponents/addButton/addButton";
export const SearchSort = () => {
    return (
        <>
            <div className={style["serch-sort-module"]}>
                <SearchInput />
                <SearchButtons />
                <AddButton />
            </div>
        </>
    );
};
