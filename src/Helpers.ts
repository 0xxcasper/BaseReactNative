import _ from 'lodash';
import {LayoutAnimation} from 'react-native';
import _const from "./common/const";
import utils from './common/utils';
import labels from './i18n/labels';


export const isBlank = (text: string | null | undefined): boolean => {
    if (text) {
        return _.trim(text + '').length === 0;
    }
    return true;
};
export const toVnNoSign = (vietnameseText: string | null | undefined): string | null | undefined => {
    if (vietnameseText) {
        let str = vietnameseText;
        str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
        str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A");
        str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
        str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E");
        str = str.replace(/[ìíịỉĩ]/g, "i");
        str = str.replace(/[ÌÍỊỈĨ]/g, "I");
        str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
        str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O");
        str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
        str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U");
        str = str.replace(/[ỳýỵỷỹ]/g, "y");
        str = str.replace(/[ỲÝỴỶỸ]/g, "Y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/Đ/g, "D");
        return _.trim(str);
    }
    return vietnameseText;
};

export const filterSearch = (
    _collections: any,
    field: string | null | undefined,
    searchingText: string | null | undefined): any => {
    const _MATCH_FULL = 1000000;
    const _MATCH_START = 100000;
    if (!_collections) return []
    if (isBlank(searchingText) || isBlank(field)) {
        return _collections.sort((l: any, r: any) => {
            const _lValue = _.toLower(toVnNoSign(l[field || '']) || '');
            const _rValue = _.toLower(toVnNoSign(r[field || '']) || '');
            if (_lValue < _rValue) {
                return -1;
            }
            if (_lValue > _rValue) {
                return 1;
            }
            return 0;
        });
    }
    searchingText = _.toLower(toVnNoSign(searchingText || '') || '');
    return _collections.filter((_entry: any) => {
        const _label = _.toLower(toVnNoSign(_entry[field || '']) || '');
        let _sortValue = 0;
        if (_label) {
            if (_label === searchingText) {
                _sortValue = _MATCH_FULL;
            } else if (_.startsWith(_label, searchingText || '')) {
                _sortValue = _MATCH_START + (searchingText?.length || 0);
            } else if (searchingText && _label.indexOf(searchingText) > 0) {
                _sortValue = searchingText.length;
            }
        }
        if (_sortValue) {
            _entry._sortValue = _sortValue;
            return true;
        }
        return false;
    });
};
export const sortCollections = (
    _collections: any,
    field: string | null | undefined,
    ascending = true): any => {
    if (_collections && field) {
        return _collections.sort((l: any, r: any) => {
            if (l[field] > r[field]) {
                return ascending ? 1 : -1
            }
            if (l[field] < r[field]) {
                return ascending ? -1 : 1
            }
            return 0;
        })
    }
    return _collections;
};

export const LayoutAnimationCompat = {
    easeInEaseOut: () => {
        LayoutAnimation.easeInEaseOut();
    }
};

export const setLastTimeFetch = (key: string): any => {
    utils.setValueByKey(key, JSON.stringify(Date.now()))
};

export const getLastTimeFetch = (key: string) => {
    return utils.getValueByKey(key).then((result) => {
        return result ? result : 0
    }).catch((error: any) => {
        return 0
    })
};

export const isOverTimeFetch = (lastTime: number, cacheType: number): boolean => {
    return (Date.now() - lastTime) > cacheType
};

export const AuthXKeys = () => {
    return {
        // "X-AUTH-ID": AppConfig.ID_VALUE,
        // "X-AUTH-SECRET": AppConfig.SECRET_VALUE
    }
};

export const scaleSize = (size: number, optional: any = {
    screenScale: 375 // IPhone X is Base
}) => {
    const { screenScale } = optional
    const ratio = size / screenScale;
    return Math.round(ratio * _const.WIDTH_SCREEN);
};

export const capitalize = (str: string | null | undefined, lower: boolean = false): string => {
    if (!str) return '';
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
};

export const isValidEmailAddress = (address: string | null | undefined): boolean => {
    if (!address) return false;
    return !!address.match(/.+@.+/);
}