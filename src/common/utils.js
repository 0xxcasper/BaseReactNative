import React, { Component } from 'react';
import {
  Platform,
} from "react-native";
import DeviceInfo from 'react-native-device-info';
import Const from "./const";
import Config from "./config";
import moment from "moment/min/moment-with-locales";
import AsyncStorage from '@react-native-community/async-storage';
import { isBlank } from '../helpers';
import labels from '../i18n/labels';
import AppConfig from 'react-native-config';

function convertUnicode(string) {
  if (!string) { return '' }
  for (var key in map) {
    string = string.replace(new RegExp(key, "g"), map[key]);
  }
  return string;
}
export default Object.freeze({
  updateUIWhenShowKeyboard: function (refStr, component) {
    if (Platform.OS === "ios") {
      let heightKeyboard = this.isBunnyEarDevice() ?
        Const.HEIGHT_KEYBOARD_IOS_X :
        Const.HEIGHT_KEYBOARD_IOS;
      var spaceScreen = Const.HEIGHT_SCREEN - heightKeyboard;
      refStr.measure((x, y, width, height, pageX, pageY) => {
        if (spaceScreen < pageY + height) {
          component.setState({ containerMarginTop: (pageY - spaceScreen + height) * -1 });
        }
      });
    }
  },
  updateUIWhenShowKeyboardWithContext: function (refStr, component) {
    if (!refStr || !component) return;
    if (Platform.OS === "ios") {
      let heightKeyboard = this.isBunnyEarDevice() ?
        Const.HEIGHT_KEYBOARD_IOS_X :
        Const.HEIGHT_KEYBOARD_IOS;
      var spaceScreen = Const.HEIGHT_SCREEN - heightKeyboard;
      refStr.measure((x, y, width, height, pageX, pageY) => {
        if (spaceScreen < pageY + height) {
          component.setState({ containerMarginTop: (pageY - spaceScreen + height) * -1 });
        }
      });
    }
  },
  updateUIWhenHideKeyboard: function (component) {
    if (Platform.OS === "ios") {
      component.setState({ containerMarginTop: 0 });
    }
  },
  getValueByKey: function (key) {
    if (key === Const.DEVICE_TOKEN_STORE_ID) {
      return new Promise(function (resolve, reject) {
        AsyncStorage.getItem(key)
          .then(value => {
            resolve(value);
          })
          .done();
      });
    } else {
      return new Promise(function (resolve, reject) {
        AsyncStorage.getItem(key)
          .then(value => {
            resolve(JSON.parse(value));
          })
          .done();
      });
    }
  },
  getImageAppLogo: function () {
    switch (AppConfig.APP_SLUG) {
      case "TESC":
        return require("assets/images/ic_logo.png")
      case "ITP":
        return require("assets/images/icon_logo_ITP.png")
      default:
        return require("assets/images/icon_logo_TBG.png")
    }
  },
  showLocationDealer: function () {
    switch (AppConfig.APP_SLUG) {
      case "TESC", "TBG":
        return true
      case "ITP":
        return false
      default:
        return true
    }
  },
  showRankUser: function () {
    switch (AppConfig.APP_SLUG) {
      case "TESC", "TBG":
        return true
      case "ITP":
        return false
      default:
        return true
    }
  },
  showSurvey: function () {
    switch (AppConfig.APP_SLUG) {
      case "TESC", "TBG":
        return false
      case "ITP":
        return true
      default:
        return false
    }
  },
  getDealerId: function () {
    switch (AppConfig.APP_SLUG) {
      case "TESC":
        return 34
      case "ITP":
        return 62
      default:
        return 34
    }
  },
  setValueByKey: function (key, value) {
    AsyncStorage.setItem(key, value);
  },
  removeValueByKey: function (key) {
    AsyncStorage.removeItem(key);
  },
  checkNumberInput: function (text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    return newText;
  },
  b64DecodeUnicode: function (str) {
    var Base64 = require("base-64");
    // return Base64.decode(str);
    return decodeURIComponent(
      Base64.decode(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  },
  convertVietnameseLetter: function (alias) {
    var str = convertUnicode(alias);
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  },
  convertSolar2Lunar: function (dd, mm, yy) {
    var k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;
    dayNumber = jdFromDate(dd, mm, yy);
    k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = getNewMoonDay(k + 1, 7);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, 7);
    }
    a11 = getLunarMonth11(yy, 7);
    b11 = a11;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, 7);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, 7);
    }
    lunarDay = dayNumber - monthStart + 1;
    diff = Math.floor((monthStart - a11) / 29);
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, 7);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return {
      year: lunarYear,
      month: lunarMonth,
      day: lunarDay,
      yearLunarTitle: tgString[(lunarYear - 4) % 10] + " " + sx[(lunarYear - 4) % 12]
    };
  },
  checkEmailInput: function (text) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(text);
  },
  generateFormUrlEncoded: function (data) {
    let formBody = [];

    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join("&");
  },
  formatBytes: function (bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  isArrayAvaiable: function (obj) {
    return obj && Array.isArray(obj) && obj.length > 0;
  },
  containArray: function (_array, _obj, _key) {
    if (this.isArrayAvaiable(_array) && _obj && _key) {
      for (let i = 0; i < _array.length; i++) {
        if (_array[i][_key] == _obj[_key]) {
          return true;
        }
      }
    }
    return false;
  },
  getDealerName: function () {
    return `${AppConfig.BRAND_NAME} ${AppConfig.APP_NAME}`
  },
  getPrefixVersionAPI: function () {
    if (Config.VERSION_API == 1) {
      return '';
    }
    return 'v' + Config.VERSION_API + '.0/';
  },
  getDecimal: function (value, reg, isRemove) {
    value = value.toString();
    if (isRemove) {
      return this.replaceAll(value, reg);
    } else {
      let first = false;
      var temp = [];
      var _value = value.split('');
      for (let i = 0; i < _value.length; i++) {
        if (reg.includes(_value[i]) && !first) {
          _value[i] = '.';
          first = true;
          continue;
        }
        if (first && reg.includes(_value[i])) {
          temp.push(i);
        }
      }
      for (let i = 0; i < temp.length; i++) {
        _value.splice(temp[i] - i, 1);
      }
      return _value.join("");
    }
  },
  addDots: function (nStr) {
    var inputElement = nStr;
    inputElement = inputElement.replace(/\D/g, '');
    var inputValue = inputElement.replace('.', '').split("").reverse().join(""); // reverse
    var newValue = '';

    for (var i = 0; i < inputValue.length; i++) {
      if (i % 3 === 0) {
        newValue += '.';
      }
      newValue += inputValue[i];
    }
    return newValue.split("").reverse().join("")
  },
  formatNumber: function (num, fixed) {
    var decimalPart;
    var array = Math.floor(num).toString().split('');
    var index = -3;
    while (array.length + index > 0) {
      array.splice(index, 0, '.');
      index -= 4;
    }

    if (fixed > 0) {
      decimalPart = num.toFixed(fixed).split(".")[1];
      return array.join('') + "," + decimalPart;
    }
    return array.join('');
  },
  formatBillion: function (number) {
    if (number > 1000000000) {
      return number / 1000000
    }
    return number / 1000000
  },
  clearHTMLTags: function (returnText) {
    if (!returnText) return '';
    returnText = returnText.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
    returnText = returnText.replace(/\r?\n|\r/g, '');
    return returnText
  },
  getInteger: function (value) {
    value = value.toString();
    let str = value.replace(/[^0-9]/g, '');
    return Number(str);
  },
  getDateFormat: function (time, keep) {
    if (time) {
      var date = new Date(time);
      var day = Number(date.getDate());
      var month = Number(date.getMonth() + 1);
      var year = Number(date.getFullYear());
      return this.addZero(day) + '/' + this.addZero(month) + '/' + year;
    } else {
      if (keep) {
        return time;
      } else {
        return this.getDateFormat(new Date(), true);
      }
    }
  },
  addZero: function (n) { return (n < 10 ? '0' + n : n); },
  removeItemByKey: function (array, obj, key) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] == obj[key]) {
        array.splice(i, 1);
      }
    }
    return array;
  },
  removeItemArrayStringByKey: function (array, key) {
    for (var i in array) {
      if (array[i] === key) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  },
  removeAttr: function (obj, attrs) {
    if (this.isArrayAvaiable(attrs)) {
      for (let i = 0; i < attrs.length; i++) {
        if (Object.prototype.hasOwnProperty.call(obj, attrs[i])) {
          delete obj[attrs[i]];
        }
      }
      return obj;
    }
    if (attrs) {
      if (Object.prototype.hasOwnProperty.call(obj, attrs)) {
        delete obj[attrs];
      }
    }
    return obj;
  },
  getDateTimeInfo: function (_date) {
    let date = new Date(moment(_date));
    let dayInWeek = 'Thứ ';
    let hours = this.addZero(date.getHours());
    let minutes = this.addZero(date.getMinutes());
    let day = this.addZero(date.getDate());
    let month = this.addZero(date.getMonth() + 1);
    let year = this.addZero(date.getFullYear());
    let _day = date.getDay();
    if (_day == 0) {
      dayInWeek = 'Chủ nhật';
    } else {
      dayInWeek += (++_day);
    }
    return {
      hours: hours,
      minutes: minutes,
      date: dayInWeek,
      day: day,
      month: month,
      year: year,
      hour12: moment(date).format('hh:mm A')
    }
  },
  getUnreadCount: function (notifys) {
    let count = 0;
    for (let key in notifys) {
      if (!notifys[key]['statusRead']) {
        count++;
      }
    }
    return count;
  },
  getDurationTime: function (time) {
    let obj = {};
    obj.day = time.substring(0, 2);
    obj.month = time.substring(3, 5);
    obj.year = time.substring(6, 10);
    obj.hour = time.substring(11, 13);
    obj.minute = time.substring(14, 16);
    obj.second = time.substring(17, 19);
    let activity = this.getLasted(obj);
    return activity ? (activity + ' trước') : '';
  },
  getLastedActivity: function (date, format = null, prefix = ' trước') {
    if (!date) return '';
    date = format ? moment(this.refactorDateTime(date)).format(format) : moment(this.refactorDateTime(date));
    let activity = this.getLasted(this.getNow(new Date(date)));
    return activity !== '' ? (activity + prefix) : '';
  },
  refactorDateTime: function (dateStr) {
    let _str = dateStr.split(' ');
    return _str.length > 1 ? dateStr : (dateStr + ' 00:00:00')
  },
  refactorToken: function (token) {
    return token.replace(/"/g, '');
  },
  getHeightHeader: function () {
    let header = {
      height: 50,
      top: 0
    };
    if (this.isBunnyEarDevice()) {
      header.height = 80;
      header.top = 30;
    }
    return header;
  },
  isBunnyEarDevice: function () {
    let modelStr = DeviceInfo.getModel();
    if (Platform.OS == 'ios') {
      return modelStr && (modelStr.includes('X') || modelStr.includes('Max') || modelStr.includes('Pro') || modelStr.includes('11'))
    }
    return false
  },
  isFuncExist: function (context, funcName) {
    return context && context.props && context.props[funcName] && typeof context.props[funcName] === 'function'
  },
  getTimeDigital: function (date) {
    let _time = date.trim().split(" ")[1].split(":")
    let _hour = _time[0] > 12 ? (_time[0] - 12) : _time[0]
    let _type = _time[0] > 12 ? 'pm' : 'am'
    return _hour + ':' + _time[1] + _type
  },
  getViewHeight: function (height = 100) {
    return Const.HEIGHT_SCREEN - height - this.getTabBarHeight()
  },
  getTabBarHeight: function () {
    return this.isBunnyEarDevice() ? 94 : 55
  },
  cloneDeep: function (value) {
    return JSON.parse(JSON.stringify(value))
  },
  getDateTimeString: function (dateTime, format = 'DD/MM/YYYY') {
    if (dateTime) {
      return moment(dateTime).locale('vi').format(format)
    }
    return dateTime;
  },
  getDateFormatDate: function (date, key = '-', format = 'YYYY-MM-DD HH:mm') {
    let _date = moment(moment(date).format(format), format).toDate();
    return this.addZero(_date.getDate()) + key + this.addZero(_date.getMonth()) + key + _date.getFullYear()
  },
  upperFirstChar: function (str) {
    return str.replace(/^\w/, c => c.toUpperCase())
  },
  covertMinToTimeText: function (min) {
    const str_min = 'phút';
    const str_hour = 'giờ'
    if (!min) return '0' + labels.spacing + str_min;
    min = parseInt(min)
    if (min < 60) {
      return min + labels.spacing + str_min
    } else {
      const _hour = parseInt(min / 60)
      const _min = parseInt(min % 60)
      return _hour + labels.spacing + str_hour + labels.spacing + _min + labels.spacing + str_min
    }
  },
  covertKmFormatter: function (met) {
    met = met.toFixed(1);
    if (!met) return '';
    if (met < 1) {
      return parseInt(met * 100) + labels.spacing + 'met'
    }
    return met + labels.spacing + 'km'
  },
  getNow: function (now = new Date()) {
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear()
    };
  },
  getLasted: function (obj) {
    let now = this.getNow();
    if (now.year > obj.year) {
      return (now.year - obj.year) + ' năm';
    }
    if (now.year == obj.year) {
      if (now.month > obj.month) {
        return (now.month - obj.month) + ' tháng';
      }
      if (now.month == obj.month) {
        if (now.day > obj.day) {
          return (now.day - obj.day) + ' ngày';
        }
        if (now.day == obj.day) {
          if (now.hour > obj.hour) {
            return (now.hour - obj.hour) + ' giờ';
          }
          if (now.hour == obj.hour) {
            if (now.minute > obj.minute) {
              return (now.minute - obj.minute) + ' phút';
            }
            if (now.minute == obj.minute) {
              if (now.second > obj.second) {
                return (now.second - obj.second) + ' giây';
              }
            }
          }
        }
      }
    }
    return ''
  },
  ignoreSpace: function (str, isNumber = false) {
    if (str) {
      return isNumber ? Number(str.replace(/\s/g, '')) : str.replace(/\s/g, '');
    }
    return str;
  },
  strToSlug: function (str) {
    let _arr = str.split(' ');
    return _arr.join('_');
  },
  getCurrencyFormat: function (value) {
    let val = (value / 1).toFixed(0).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },
  isCallApiFunny: function (status, response) {
    return status === Const.SUCCESS && response && response.data
  },
  decode: function (t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0,
      a = null, c = Math.pow(10, e || 5);
      u < t.length
      ;
    ) {

      a = null, h = 0, i = 0

      do
        a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32)

      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0

      do
        a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32)

      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o,
        d.push([l / c, r / c])
    }
    return d.map(function (t) { return { latitude: t[0], longitude: t[1] } })
  },
  youTube_parser: function (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  },
  validURL: function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  },
  validPhoneNumber: function (str) {
    if (!isBlank(str)) {
      var keyCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (str.match(keyCheck)) {
        return true
      }
    }
    return false
  }
});

var tgString = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
var sx = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
var map = {
  ẻ: "\u1EBB", //ẻ
  é: "\u00E9", //é
  è: "\u00E8", //è
  ẹ: "\u1EB9", //ẹ
  ẽ: "\u1EBD", //ẽ
  ể: "\u1EC3", //ể
  ế: "\u1EBF", //ế
  ề: "\u1EC1", //ề
  ệ: "\u1EC7", //ệ
  ễ: "\u1EC5", //ễ
  ỷ: "\u1EF7", //ỷ
  ý: "\u00FD", //ý
  ỳ: "\u1EF3", //ỳ
  ỵ: "\u1EF5", //ỵ
  ỹ: "\u1EF9", //ỹ
  ủ: "\u1EE7", //ủ
  ú: "\u00FA", //ú
  ù: "\u00F9", //ù
  ụ: "\u1EE5", //ụ
  ũ: "\u0169", //ũ
  ử: "\u1EED", //ử
  ứ: "\u1EE9", //ứ
  ừ: "\u1EEB", //ừ
  ự: "\u1EF1", //ự
  ữ: "\u1EEF", //ữ
  ỉ: "\u1EC9", //ỉ
  í: "\u00ED", //í
  ì: "\u00EC", //ì
  ị: "\u1ECB", //ị
  ĩ: "\u0129", //ĩ
  ỏ: "\u1ECF", //ỏ
  ó: "\u00F3", //ó
  ò: "\u00F2", //ò
  ọ: "\u1ECD", //ọ
  õ: "\u00F5", //õ
  ở: "\u1EDF", //ở
  ớ: "\u1EDB", //ớ
  ờ: "\u1EDD", //ờ
  ợ: "\u1EE3", //ợ
  ỡ: "\u1EE1", //ỡ
  ổ: "\u1ED5", //ổ
  ố: "\u1ED1", //ố
  ồ: "\u1ED3", //ồ
  ộ: "\u1ED9", //ộ
  ỗ: "\u1ED7", //ỗ
  ả: "\u1EA3", //ả
  á: "\u00E1", //á
  à: "\u00E0", //à
  ạ: "\u1EA1", //ạ
  ã: "\u00E3", //ã
  ẳ: "\u1EB3", //ẳ
  ắ: "\u1EAF", //ắ
  ằ: "\u1EB1", //ằ
  ặ: "\u1EB7", //ặ
  ẵ: "\u1EB5", //ẵ
  ẩ: "\u1EA9", //ẩ
  ấ: "\u1EA5", //ấ
  ầ: "\u1EA7", //ầ
  ậ: "\u1EAD", //ậ
  ẫ: "\u1EAB", //ẫ
  Ẻ: "\u1EBA", //Ẻ
  É: "\u00C9", //É
  È: "\u00C8", //È
  Ẹ: "\u1EB8", //Ẹ
  Ẽ: "\u1EBC", //Ẽ
  Ể: "\u1EC2", //Ể
  Ế: "\u1EBE", //Ế
  Ề: "\u1EC0", //Ề
  Ệ: "\u1EC6", //Ệ
  Ễ: "\u1EC4", //Ễ
  Ỷ: "\u1EF6", //Ỷ
  Ý: "\u00DD", //Ý
  Ỳ: "\u1EF2", //Ỳ
  Ỵ: "\u1EF4", //Ỵ
  Ỹ: "\u1EF8", //Ỹ
  Ủ: "\u1EE6", //Ủ
  Ú: "\u00DA", //Ú
  Ù: "\u00D9", //Ù
  Ụ: "\u1EE4", //Ụ
  Ũ: "\u0168", //Ũ
  Ử: "\u1EEC", //Ử
  Ứ: "\u1EE8", //Ứ
  Ừ: "\u1EEA", //Ừ
  Ự: "\u1EF0", //Ự
  Ữ: "\u1EEE", //Ữ
  Ỉ: "\u1EC8", //Ỉ
  Í: "\u00CD", //Í
  Ì: "\u00CC", //Ì
  Ị: "\u1ECA", //Ị
  Ĩ: "\u0128", //Ĩ
  Ỏ: "\u1ECE", //Ỏ
  Ó: "\u00D3", //Ó
  Ò: "\u00D2", //Ò
  Ọ: "\u1ECC", //Ọ
  Õ: "\u00D5", //Õ
  Ở: "\u1EDE", //Ở
  Ớ: "\u1EDA", //Ớ
  Ờ: "\u1EDC", //Ờ
  Ợ: "\u1EE2", //Ợ
  Ỡ: "\u1EE0", //Ỡ
  Ổ: "\u1ED4", //Ổ
  Ố: "\u1ED0", //Ố
  Ồ: "\u1ED2", //Ồ
  Ộ: "\u1ED8", //Ộ
  Ỗ: "\u1ED6", //Ỗ
  Ả: "\u1EA2", //Ả
  Á: "\u00C1", //Á
  À: "\u00C0", //À
  Ạ: "\u1EA0", //Ạ
  Ã: "\u00C3", //Ã
  Ẳ: "\u1EB2", //Ẳ
  Ắ: "\u1EAE", //Ắ
  Ằ: "\u1EB0", //Ằ
  Ặ: "\u1EB6", //Ặ
  Ẵ: "\u1EB4", //Ẵ
  Ẩ: "\u1EA8", //Ẩ
  Ấ: "\u1EA4", //Ấ
  Ầ: "\u1EA6", //Ầ
  Ậ: "\u1EAC", //Ậ
  Ẫ: "\u1EAA" //Ẫ
};

function jdFromDate(dd, mm, yy) {
  var a, y, m, jd;
  a = Math.floor((14 - mm) / 12);
  y = yy + 4800 - a;
  m = mm + 12 * a - 3;
  jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}
function jdToDate(jd) {
  var a, b, c, d, e, m, day, month, year;
  if (jd > 2299160) {
    // After 5/10/1582, Gregorian calendar
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor(b * 146097 / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  d = Math.floor((4 * c + 3) / 1461);
  e = c - Math.floor(1461 * d / 4);
  m = Math.floor((5 * e + 2) / 153);
  day = e - Math.floor((153 * m + 2) / 5) + 1;
  month = m + 3 - 12 * Math.floor(m / 10);
  year = b * 100 + d - 4800 + Math.floor(m / 10);
  return new Array(day, month, year);
}
function getNewMoonDay(k, timeZone) {
  var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
  T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
  T2 = T * T;
  T3 = T2 * T;
  dr = Math.PI / 180;
  Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
  M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
  Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
  F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
  C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  JdNew = Jd1 + C1 - deltat;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
}
function getSunLongitude(jdn, timeZone) {
  var T, T2, dr, M, L0, DL, L;
  T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  T2 = T * T;
  dr = Math.PI / 180; // degree to radian
  M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  L = L0 + DL; // true longitude, degree
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2)); // Normalize to (0, 2*Math.PI)
  return Math.floor(L / Math.PI * 6);
}
function getLunarMonth11(yy, timeZone) {
  var k, off, nm, sunLong;
  off = jdFromDate(31, 12, yy) - 2415021;
  k = Math.floor(off / 29.530588853);
  nm = getNewMoonDay(k, timeZone);
  sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}
function getLeapMonthOffset(a11, timeZone) {
  var k, last, arc, i;
  k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  last = 0;
  i = 1; // We start with the month following lunar month 11
  arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc != last && i < 14);
  return i - 1;
}

function getDateFormatDayTimeDate(date, format = 'YYYY-MM-DD HH:mm') {
  let _date = moment(moment(date).format(format), format).toDate();
  let nameDate = ''
  switch (_date.getDay()) {
    case 1:
      nameDate = 'Thứ hai'
      break;
    case 2:
      nameDate = 'Thứ ba'
      break;
    case 3:
      nameDate = 'Thứ tư'
      break;
    case 4:
      nameDate = 'Thứ năm'
      break;
    case 5:
      nameDate = 'Thứ sáu'
      break;
    case 6:
      nameDate = 'Thứ bảy'
      break;
    default:
      nameDate = 'Chủ nhật'
  }
  return nameDate + ', ' + this.addZero(_date.getHours()) + ':' + this.addZero(_date.getMinutes()) + ' ' + this.addZero(_date.getDate()) + '-' + this.addZero(_date.getMonth()) + '-' + _date.getFullYear()
}
