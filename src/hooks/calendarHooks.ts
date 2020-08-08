import {selectCalendars} from "../selectors/calendarSelectors";
import {useSelector} from "react-redux";

export const useCalendars = () => {
    return useSelector(selectCalendars)
}