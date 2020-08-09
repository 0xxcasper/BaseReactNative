import {useSelector} from "react-redux";
import {selectAccountState} from "selectors/accountSelectors";

export const useAccountInfo = () => {
    return useSelector(selectAccountState);
};