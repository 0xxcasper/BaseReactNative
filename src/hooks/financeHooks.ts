import {useDispatch, useSelector} from "react-redux";
import {selectTFSDetailFinance, selectTFSFinance, selectTFSFinanceUpdate} from './../selectors/financeSelectors';
import _ from 'lodash';
import {formatCurrency, formatNumber} from "../helpers";
import { Alert } from 'react-native';

export const useTFSFinance = () => {
    return useSelector(selectTFSFinance)
}

export const useTFSFinanceUpdate = () => {
    return useSelector(selectTFSFinanceUpdate)
}

export const getFinanceByGradeId = (gradeId: number) => {
    const tfsFinance = useTFSFinance()
    if (tfsFinance && Array.isArray(tfsFinance)) {
        for (let tfsFinanceKey in tfsFinance) {
            if (gradeIncludes(tfsFinance[tfsFinanceKey].grades, gradeId)) {
                return tfsFinance[tfsFinanceKey].finances
            }
        }
    }
    return null
}

export const getPaymentPeriods = (pays: []): { id: never; name: string }[] => {
    const CONST_YEAR = 'year'
    let _pays: { id: never; name: string; }[] = []
    pays.forEach((_item) => {
        _pays.push({
            id: _item,
            name: _item === CONST_YEAR ? 'Trả theo năm' : 'Trả theo tháng'
        })
    })
    return _pays
}

export const getDuringPayment = (durations : [], type: string) => {
    let _durations: never[] = []
    for (let index in durations) {
        if (durations[index]['payment_period'] === type) {
            let _duration = durations[index]
            const nextFix = _duration['payment_period'] === 'month' ? 'tháng' : 'năm'
            // @ts-ignore
            _duration['name'] = `${_duration['loan_period']} ${nextFix}`
            // @ts-ignore
            _duration['id'] = `${_duration['loan_period']}_${_duration['payment_period']}`
            _durations.push(_duration)
        }
    }
    return _durations
}

const gradeIncludes = (grades: [], gradeId: number): boolean => {
    for (let gradeIndex in grades) {
        if (Number(grades[gradeIndex]['id']) === Number(gradeId)) return true
    }
    return false
}

export const getById = (items: [], id: number) => {
    return _.find(items, function(item) {
        return item['id'] === id;
    });
}

export const getBankLoanStatistics = (loanInfo: { total: number; deposit: number; rate: number; months: number; }) => {
    const {total, deposit, rate, months} = loanInfo
    const credit = total - deposit
    let _month = 0
    let tableStatistical = []
    const _percent = 0.01/months
    while (_month < months) {
        let loanObj = {
            payment_total: 0,       //trả hàng kì
            interest_payment: 0,    //lãi
            principal_payment: 0,   //Gốc
            debit_after_payment: 0  //Dư nợ
        }
        loanObj.principal_payment = credit/months
        if (tableStatistical.length > 0) {
            const loanObjPrev = tableStatistical[_month - 1]
            loanObj.debit_after_payment = loanObjPrev.debit_after_payment - loanObj.principal_payment
            loanObj.interest_payment = loanObjPrev.debit_after_payment * rate * _percent
        } else {
            loanObj.debit_after_payment = credit - credit/months
            loanObj.interest_payment = credit * rate * _percent
        }
        loanObj.payment_total = loanObj.principal_payment + loanObj.interest_payment
        tableStatistical.push(loanObj)
        _month++
    }
    return tableStatistical
}

export const MergeArrayTFS = (_array: any[]) => {
    let _tfs: { id: number; label: string; focus: boolean; data: { label: string; price: string; }[]; }[] = []
    _array.forEach((item: any, index: number) => {
        _tfs.push({
            id: item.period ? item.period : index,
            label: 'Kỳ ' + (item.period ? item.period : (index + 1)),
            focus: true,
            data: [
                {label: 'Trả hàng kỳ', price: formatCurrency(item.payment_total, {original: true})},
                {label: 'Lãi', price: formatCurrency(item.interest_payment, {original: true})},
                {label: 'Gốc', price: formatCurrency(item.principal_payment, {original: true})},
                {label: 'Dư nợ', price: formatCurrency(item.debit_after_payment, {original: true})}
            ]
        })
    })
    return _tfs
}

export const setFocusTableTFS = (_array: any[], item: any) => {
    const {id} = item
    for (let index in _array) {
        if (_array[index]['id'] === id) {
            _array[index]['focus'] = !_array[index]['focus']
        }
    }
    return _array
}

export const setFocusAllTableTFS = (_array: any[], focus: boolean) => {
    for (let index in _array) {
        _array[index]['focus'] = focus
    }
    return _array
}

export const useTFSDetailFinance = () => {
    return useSelector(selectTFSDetailFinance)
}

export const getTFSDetailByCarColorId = (_tfsDetail: [], colorId: number | null | undefined): {} | null | undefined => {
    if (_tfsDetail && _tfsDetail?.length > 0) {
        if (colorId) {
            return findBySlug(_tfsDetail, colorId, 'color_id')
        } else {
            // @ts-ignore
            return _tfsDetail[0]
        }
    }
    return null
}

export const findBySlug = (_array: [], _match: number, slug: string): {} | null => {
    for (let index in _array) {
        if (Number(_array[index][slug]) === Number(_match)) {
            return _array[index]
        }
    }
    return null
}

export const splitCommonStatistics = (_finance: {}): [{ price: any; label: string }, { price: any; label: string }, { price: any; label: string }, { price: any; label: string }] => {
    // @ts-ignore
    const { total_price, prepaid_amount, first_month_payment, debit } = _finance
    return [
        {label: 'Tổng giá gồm phụ kiện', price: formatCurrency(total_price, {original: true})},
        {label: 'Số tiền trả trước', price: formatCurrency(prepaid_amount, {original: true})},
        {label: 'Tháng đầu tiên', price: formatCurrency(first_month_payment, {original: true})},
        {label: 'Khoản tín dụng', price: formatCurrency(debit, {original: true})}
    ]
}