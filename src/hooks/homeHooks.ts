import {useSelector} from "react-redux";
import {selectHomeState} from 'selectors/homeSelectors';

export const useHomeState = () => {
    return useSelector(selectHomeState)
};