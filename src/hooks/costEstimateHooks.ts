import {CalculateCostEstimate, CostEstimate, Location, Province} from './../types/modelTypes';
import { useSelector } from "react-redux";
import {
    selectCalculateCostEstimate,
    selectCostEstimate,
    selectLocationsMap,
    selectProvinceMap
} from '../selectors/costEstimateSelectors';
import { Map } from 'immutable';
import {formatCurrency} from "../helpers";

export const useLocationsMap = (): Map<string, Location> | undefined => {
    return useSelector(selectLocationsMap);
}

export const useProvinceMap = (): Map<string, Province> => {
    return useSelector(selectProvinceMap);
}

export const useCostEstimate = (): CostEstimate => {
    return useSelector(selectCostEstimate);
}

export const useCalculateCostEstimate = (): CalculateCostEstimate => {
    return useSelector(selectCalculateCostEstimate);
}

const getColor = (_colors: [] | null | undefined, _colorId: number | null | undefined) => {
    if (_colors && _colors.length > 0) {
        if (_colorId) {
            for (const color of _colors) {
                if (Number(_colorId) === Number(color['id'])) return color
            }
        }
        // @ts-ignore
        return _colors[0]
    }
    return {priceWithAccessory: 0}
}

export const getCalculateCostEstimate = (calcDetail: CalculateCostEstimate, colorId: number | null | undefined) => {
    const { fees } = calcDetail
    let cals = []
    // @ts-ignore
    const { priceWithAccessory, totalPrice } = calcDetail

    if(priceWithAccessory) {
        const _priceWithAccessory = {
            label: 'Tổng giá sau Phụ kiện',
            price: formatCurrency(priceWithAccessory, {original: true}), 
            itemRightStyle: {fontSize: 18}}
        cals.push(_priceWithAccessory)
    }
    if (fees) {
        fees.forEach((_fee) => {
            let _obj = {label: '', price: ''}
            _obj.label = _fee['title']
            if (_fee['unit'] === 'percent') {
                _obj.label += ` (${_fee['value']}%)`
            }
            _obj.price = formatCurrency(_fee['fee'], {original: true})
            cals.push(_obj)
        })
    }
    if(priceWithAccessory && totalPrice) {
        const _totalFeeRegister = {
            label: 'Tổng chi phí đăng ký',
            price: formatCurrency(totalPrice - priceWithAccessory, {original: true})
        }
        cals.push(_totalFeeRegister)
    }

    return cals
}