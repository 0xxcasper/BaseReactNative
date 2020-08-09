import {useSelector} from "react-redux";
import {selectAuthState} from "selectors/authSelectors";
import {AuthStateType} from "types/reducerStateTypes";

export const useAuthState = () => {
    return useSelector(selectAuthState);
};