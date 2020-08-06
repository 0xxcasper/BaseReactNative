import { Dimensions } from "react-native";

/**
|--------------------------------------------------
| Timer value
|--------------------------------------------------
*/
export const TIME_SEC       = 1000;
export const TIME_MIN       = TIME_SEC    *   60;
export const TIME_HOUR      = TIME_MIN    *   60;
export const TIME_DAY       = TIME_HOUR   *   24;
export const TIME_WEEK      = TIME_DAY    *   7;
export const TIME_MONTH     = TIME_WEEK   *   4;
export const TIME_YEAR      = TIME_MONTH  *   12;

/**
|--------------------------------------------------
| Screen Size
|--------------------------------------------------
*/
export const HEIGHT_SCREEN  = Dimensions.get("window").height;
export const WIDTH_SCREEN   = Dimensions.get("window").width;


/**
|--------------------------------------------------
| More const
|--------------------------------------------------
*/
export default Object.freeze({
    SUCCESS: 1,
    FAILURE: 0,
    WIDTH_SCREEN: Dimensions.get("window").width,
    HEIGHT_SCREEN: Dimensions.get("window").height,
    HEIGHT_KEYBOARD_IOS: 350,
    HEIGHT_KEYBOARD_IOS_X: 400,
    OTP_ITEM_CONFIG: 6,
    API_CODE_OK: "OK",
    API_CODE_OK_200: 200,
    TOKEN_ERROR: "error.unauthorized",
});