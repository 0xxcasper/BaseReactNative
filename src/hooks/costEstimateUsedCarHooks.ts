import {useSelector} from "react-redux";
import {
    selectUsedCarInput,
    selectUsedCarOnSaleGrade,
    selectUsedCarPlateTypes,
    selectUsedCarQualitys
} from "../selectors/costEstimateUsedCarSelectors";
import {selectAuthPhoneNumber} from "../selectors/authSelectors";
import {selectAccountFullName} from "../selectors/accountSelectors";

export const useCostEstimatePlateTypes = () => {
    return useSelector(selectUsedCarPlateTypes)
}

export const useCostEstimateQualitys = () => {
    return useSelector(selectUsedCarQualitys)
}

export const useCostEstimateOnSaleGrade = () => {
    return useSelector(selectUsedCarOnSaleGrade)
}

export const useCostEstimateInput = () => {
    return useSelector(selectUsedCarInput)
}

export const mergeCostEstimate = () => {
    const _userName = useSelector(selectAccountFullName)
    const _phone = useSelector(selectAuthPhoneNumber)
    const _originalObject = useCostEstimateInput()
    return {
        ..._originalObject,
        full_name: _userName,
        phone: _phone
    }
}