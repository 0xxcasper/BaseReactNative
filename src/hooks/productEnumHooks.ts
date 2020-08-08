import { useSelector } from "react-redux";
import { Map } from 'immutable';
import {ProductEnum} from "../types/productEnum";
import {selectEnumMap} from "../selectors/productEnumSelectors";

export const useProductEnum = (): Map<string, ProductEnum> => {
    return useSelector(selectEnumMap);
}