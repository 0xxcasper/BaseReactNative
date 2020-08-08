import {useSelector} from "react-redux";
import {selectInsuranceRate} from "../selectors/insuranceSelectors";
import {findBySlug} from "../helpers";
import {InsuranceRate, SimpleObject} from "../types/modelTypes";

export const useInsuranceRateMap = () => {
    return useSelector(selectInsuranceRate)
}

export const getInsuranceProviders = (insuranceRateMap: Map<string, InsuranceRate>) => {
    let providers: SimpleObject[] = []
    insuranceRateMap?.forEach((item) => {
        if (!findBySlug(providers, 'id', item.provider.id)) {
            providers.push(item.provider)
        }
    })
    return providers
}

export const getCarYearsByProvider = (insuranceRateMap: Map<string, InsuranceRate>, providerId: number) => {
    let carYears: SimpleObject[] = []
    insuranceRateMap?.forEach((item) => {
        if (item.provider.id === providerId && !findBySlug(carYears, 'id', item.carYear.id)) {
            carYears.push(item.carYear)
        }
    })
    return carYears
}

export const getPurposes = (insuranceRateMap: Map<string, InsuranceRate>, providerId: number, carYearId: number) => {
    let purposes: SimpleObject[] = []
    insuranceRateMap?.forEach((item) => {
        if (item.provider.id === providerId && item.carYear.id === carYearId && !findBySlug(purposes, 'id', item.purpose.id)) {
            purposes.push(item.purpose)
        }
    })
    return purposes
}

export const getValidPeriods = (insuranceRateMap: Map<string, InsuranceRate>, providerId: number, carYearId: number, purposeId: number) => {
    let validPeriods: SimpleObject[] = []
    insuranceRateMap?.forEach((item) => {
        if (item.provider.id === providerId && item.carYear.id === carYearId && item.purpose.id === purposeId && !findBySlug(validPeriods, 'id', item.validPeriod.id)) {
            validPeriods.push(item.validPeriod)
        }
    })
    return validPeriods
}

export const getInsuranceProduct = (insuranceRateMap: Map<string, InsuranceRate>, providerId: number, carYearId: number, purposeId: number, validPeriodId: number) => {
    let products: InsuranceRate[] = []
    insuranceRateMap?.forEach((item) => {
        if (item.provider.id === providerId && item.carYear.id === carYearId && item.purpose.id === purposeId && item.validPeriod.id === validPeriodId && !findBySlug(products, 'id', item.validPeriod.id)) {
            products.push(item)
        }
    })
    return formatProduct(products)
}

export const formatProduct = (products: InsuranceRate[]) => {
    let _products: { id: number | null; name: string | null; rate: string | null; rateUnit: string | null; type: SimpleObject; carYear: SimpleObject; provider: SimpleObject; purpose: SimpleObject; validPeriod: SimpleObject; }[] = []
    products.forEach((item) => {
        _products.push({
            ...item,
            id: item.type.id,
            name: item.type.name
        })
    })
    return _products
}