import EventEmitter from 'eventemitter3';
import CONST, { CAR_EDITOR_DEFAULT_ID, FORWARD_SLASH } from '../common/const';
import NetworkUtils from './net/NetworkUtils';
import ServerPath from './net/ServerPath';
import store from "redux/store";
import { selectFcmToken } from "selectors/appSelectors";
import { selectToken } from "selectors/authSelectors";
import utils from 'common/utils';

export const networkEmitter = new EventEmitter();

export const addCars = (body, carId) => {
    if (!body.vin) {
        delete body.vin
    }
    if (!body.image || utils.validURL(body.image)) {
        delete body.image
    }
    const _isEditCar = carId === CAR_EDITOR_DEFAULT_ID
    const _param = _isEditCar ? '' : `/${carId}`
    const _urlPath = ServerPath.add_cars + _param
    const _method = _isEditCar ? NetworkUtils.post : NetworkUtils.put
    console.log(
        'Update car,',
        'URL: ',
        _urlPath,
        'Body: ',
        body,
    );
    return requestApi(_method, null, _urlPath, body);
};

export const deleteCars = (token, uuid) => {
    const _url = ServerPath.delete_car + '/' + uuid;
    return requestApi(NetworkUtils.delete, null, _url, null);
};

export const makeBooking = (params) => {
    return requestApi(
        NetworkUtils.post,
        null,
        ServerPath.make_booking,
        params,
    );
};
export const getAllInsuranceProvidersApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_all_insurance_providers,
        null,
    );
};
export const getAllInsuranceTypesApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_all_insurance_types,
        null,
    );
};
export const getAllCarBrandsApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_all_car_brands,
        null,
    );
};
export const getVideoApi = (perPage = 9, page = 0) => {
    const body = {
        per_page: perPage,
        page
    }
    return requestApi(NetworkUtils.get, null, ServerPath.ytb_link, body);
};
export const getNewsApi = (token, slug = 'lastest/10') => {
    return requestApi(
        NetworkUtils.get,
        null,
        `${ServerPath.news}${slug}`,
        null,
    );
};
export const getHomeBannersApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.home_banner,
        null,
    );
};
export const getDealerLocationsApi = (body) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_dealer_locations,
        body,
    );
};
export const getBookingTaskApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_booking_service_tasks,
        null,
    );
};

export const getBookingServiceTypesApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_booking_service_types,
        null,
    );
};

export const getServiceConsultantsApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_service_consultants,
        null,
    );
};

export const getAllPromotionsApi = (token) => {
    return requestApi(
        NetworkUtils.get,
        null,
        ServerPath.get_all_promotions,
        token,
    );
};

export const refreshToken = (refreshToken) => {
    return requestApi(
        NetworkUtils.put,
        null,
        {
            Authorization: 'Bearer ' + refreshToken,
        },
        ServerPath.login_api,
    );
};

export const loginApi = (phone, token, platform) => {
    return requestApi(NetworkUtils.post, null, ServerPath.login, {
        phone: phone,
        platform: platform,
        token: token,
    });
};

export const loginWithDeviceTokenApi = (token, platform) => {
    return requestApi(NetworkUtils.post, null, ServerPath.login_with_device_token, {
        token: token,
        platform: platform,
    });
};

export const logoutApi = (token, platform) => {
    return requestApi(NetworkUtils.get, null, ServerPath.logout, {
        platform: platform,
        token: token,
    });
};

//get all notification when did login
export const requestNotificationLogin = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_notification_getAll);
};

//get all notification when un login
export const requestNotificationUnLogin = (emailAnonymous) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_anonymousNotification_getAll, {
        login: emailAnonymous,
    });
};

//get notification detail when did login
export const requestNotificationDetailLogin = (notificationId) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_notification_getDetail + '/' + notificationId);
};

//get notification detail when un login
export const requestNotificationDetailUnLogin = (notificationId, emailAnonymous) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_anonymousNotification_getDetail + '/' + notificationId, {
        login: emailAnonymous,
    });
};

//set read notification when did login
export const requestSetMarkNotificationLogin = (notificationId) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_notification_markRead + '/' + notificationId + '/' + 'read');
};

//set read notification when un login
export const requestSetMarkNotificationUnLogin = (notificationId, emailAnonymous) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_anonymousNotification_markRead + '/' + notificationId + '/' + 'read', {
        login: emailAnonymous,
    });
};

//register phone number receive OTP
export const registerPhoneNumber = (phoneNumber) => {
    return requestApi(NetworkUtils.post, null, ServerPath.register_phone_number, {
        phone: phoneNumber,
    });
};

//when register phone number call api check OTP to check exactly OTP
export const checkOtp = (phoneNumber, otp, token, platform) => {
    return requestApi(NetworkUtils.post, null, ServerPath.check_otp, {
        phone: phoneNumber,
        otp: otp,
        token: token,
        platform: platform
    });
}

//Update full name
export const updateProfileFullName = (fullName) => {
    return requestApi(NetworkUtils.put, null, ServerPath.update_profile_full_name, {
        fullname: fullName,
    });
}
export const updateProfilePhoneNumberApi = (phoneNumber) => {
    return requestApi(NetworkUtils.put, null, ServerPath.user_update_phone_api, {
        phone: phoneNumber,
    });
}

export const getUserProfile = (body) => {
    return requestApi(body ? NetworkUtils.put : NetworkUtils.get, null, ServerPath.user_profile_api, body);
}

export const requestJoinMembershipApi = () => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_create_membership, null);
}

//New Car
export const requestNewCarListApi = (params = null) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_new_car_list_getAll, params);
}

export const requestNewCarInfoDetailApi = (carId) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_detail_new_car + '/' + carId, null);
}

export const requestEnumFilterType = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_enum_filter, null);
}

export const requestCarCompareApi = (params = null) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_request_compare_cars, {
        car_ids: params
    });
}

//Download
export const requestDownloadPriceApi = (optional) => {
    return requestApi(NetworkUtils.download, null, ServerPath.api_download_price, null, optional);
}

export const requestDownloadSpecificationsApi = (carGrade, optional) => {
    const _path = ServerPath.api_download_specifications + carGrade + "/download"
    return requestApi(NetworkUtils.download, null, _path, null, optional);
}

//CarCompare
export const requestCarCompareSuggestionApi = (carId = null) => {
    const body = carId ? { car_id: carId } : null
    return requestApi(NetworkUtils.post, null, ServerPath.api_suggestion_car_compare, body);
}

export const requestCostEstimateLocationsApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_locations_cost_estimate, null);
}

export const requestCarBrandDealerApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.all_car_brands, null);
}

export const requestBookingTestDriveApi = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_request_booking_test_drive, body);
}

export const requestAvailCarTestDriveApi = (body) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_test_drive_avail_cars, body);
}

export const requestAvailDealerTestDriveApi = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_test_drive_avail_location, body);
}

export const requestServicesTFSFinanceApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_services_tfs_finances, null);
}

export const getTFSFinanceApi = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_get_tfs_finances, body);
}
export const getInsuranceRateApi = (carId) => {
    const insuranceRateEndpoint = `${ServerPath.api_get_rate_insurance}/${carId}`
    return requestApi(NetworkUtils.get, null, insuranceRateEndpoint, null);
}

export const getUsedCarListApi = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_used_car_listing, body, {
        hasMeta: true
    });
}

export const getUsedCarDetailApi = (body) => {
    let _path = ServerPath.api_used_car_detail
    if (body && body.carId) {
        _path += body.carId
    }
    return requestApi(NetworkUtils.get, null, _path, null);
}

export const getProvincesApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_provinces, null);
}

export const getProductEnumApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_product_enum, null);
}

export const getLocationNearlyApi = (body, options) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_location_nearly, body, options);
}

export const calculateCostEstimateApi = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_cost_estimate_calculate, body)
}

export const getLocationBySearchApi = (body, options) => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_location_search, body, options);
}

export const getUsedCarPlateTypeApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_used_car_plate_types, null);
}

export const getUsedCarQualityApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_used_car_qualitys, null);
}

export const usedCarCostEstimate = (body) => {
    return requestApi(NetworkUtils.post, null, ServerPath.api_used_car_cost_estimate, body);
}

export const getOnSaleGradeApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_used_car_onsale_grade, null);
}

export const getCalendarListApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.api_get_calendar_list, null);
}

export const getAccessoryDetail = (carId) => {
    return requestApi(NetworkUtils.post, null, ServerPath.accessory_detail, {
        carGradeId: carId
    });
}

//Chat
export const requestLoginChat = (options) => {
    return requestApi(NetworkUtils.chat, null, ServerPath.login_chat, null, options);
}

export const requestConversationsChat = (options) => {
    let path = ServerPath.get_conversations_chat
    const { conversationId } = options
    if (conversationId) {
        path += FORWARD_SLASH + conversationId
    }
    return requestApi(NetworkUtils.chat, null, path, null, options);
}

export const getChatUser = (body, options) => {
    //POST
    return requestApi(NetworkUtils.chat, {"Content-Type":"application/json"}, ServerPath.get_chat_user, body, options);
}

export const getChatSupport = (options) => {
    //GET
    return requestApi(NetworkUtils.chat, null, ServerPath.get_chat_support, null, options);
}

export const updateAvatar = (base64Image) => {
    return requestApi(NetworkUtils.put, null, ServerPath.update_avatar, {
        avatar: base64Image
    });
}

export const uploadFileChatApi = (formData, options) => {
    return requestApi(NetworkUtils.uploadFileChat, null, ServerPath.upload_file_chat, formData, options);
}

export const getContactInfo = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.contact_info, null)
}

export const getSurveyListApi = () => {
    return requestApi(NetworkUtils.get, null, ServerPath.get_survey_list, null)
}


const requestApi = (api, header = {}, url, body, options = {}) => {
    const {
        hasMeta,
        hideHeader
    } = options
    return new Promise((resolve, reject) => {
        const state = store.getState();
        const _fcmToken = selectFcmToken(state);
        const _accessToken = selectToken(state);
        if (_accessToken) {
            header = {
                ...header,
                Authorization: `Bearer ${_accessToken}`,
            };
        }
        if (_fcmToken) {
            header = {
                ...header,
                "tracking-id": _fcmToken
            };
        }
        api(header, url, body, (status, response) => {
            console.log('METHOD', api.name);
            console.log('API: ', url);
            console.log('HEADER: ', header);
            console.log('BODY: ', body);
            console.log('RESPONSE: ', response);

            switch (status) {
                case CONST.SUCCESS: {
                    const { code, status_code, data, meta } = response;
                    if (status_code != null && status_code !== CONST.API_CODE_OK && status_code !== CONST.API_CODE_OK_200) {
                        reject(response);
                    }
                    else if (data && meta) {
                        if (hasMeta) {
                            resolve(response, meta)
                        } else {
                            resolve(response)
                        }
                    }
                    else if (data) {
                        resolve(data);
                        return
                    } else {
                        resolve(response);
                    }
                }
                    break;
                case CONST.TOKEN_ERROR:
                    networkEmitter.emit(CONST.TOKEN_ERROR, {
                        response: response,
                    });
                    reject(response);
                    break;
                default:
                    reject(response);
                    break;
            }
        }, options);
    });
};
