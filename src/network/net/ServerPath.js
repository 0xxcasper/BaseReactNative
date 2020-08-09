import Const from 'common/const';
import Utils from 'common/utils';
import AppConfig from 'react-native-config';
import {API, FORWARD_SLASH, COLON, HTTPS_PROTOCOL} from '../../common/const';

export const DOMAIN = `${AppConfig.ENDPOINT}${API}${FORWARD_SLASH}${AppConfig.SUFFIX_DEALER_SLUG}`;
export const VERSION_API = Utils.getPrefixVersionAPI();
export const CHAT_DOMAIN = `${HTTPS_PROTOCOL}${AppConfig.CHAT_SERVER_ADDRESS}${COLON}${AppConfig.CHAT_HTTPS_SERVER_PORT}`;

export default Object.freeze({
    Domain: DOMAIN,
    //Auth login logout register
    register_phone_number: `${DOMAIN}/auth/register-v2`,
    check_otp: `${DOMAIN}/auth/activation-v2`,
    update_profile_full_name: `${DOMAIN}/user/profile/fullname`,
    login_with_device_token: `${DOMAIN}/auth/start-a-new-journey`,
    login: `${DOMAIN}/auth/login-v2`,
    login_api: DOMAIN + `api/${VERSION_API}authenticate`,
    user_profile_api: `${DOMAIN}/user/profile`,
    user_update_phone_api: `${DOMAIN}/user/profile/phone`,
    //
    price_all: `${DOMAIN}/price/all`,
    home_banner: `${DOMAIN}/home-banners`,
    news: `${DOMAIN}/content/`,
    ytb_link: `${DOMAIN}/video-content/all`,
    google_api_derection: `${Const.MAPS_DOMAIN}/directions/json?`,
    all_car_brands: `${DOMAIN}/product/all-brands`,
    get_service_consultants: `${DOMAIN}/service-booking/staffs`,
    get_booking_service_types: `${DOMAIN}/service-booking/service-types`,
    get_booking_service_tasks: `${DOMAIN}/service-booking/tasks`,
    get_dealer_locations: `${DOMAIN}/contact/dealers`,
    get_all_car_brands: `${DOMAIN}/car/all-info`,
    get_all_promotions: `${DOMAIN}/user/promotions`,
    get_all_insurance_types: `${DOMAIN}/insurance-type`,
    get_all_insurance_providers: `${DOMAIN}/insurance-provider`,
    make_booking: `${DOMAIN}/service-booking/register`,
    add_cars: `${DOMAIN}/user/cars`,
    delete_car: `${DOMAIN}/user/cars`,
    logout: `${DOMAIN}/auth/logout`,
    contact_info: `${DOMAIN}/contact-info`,

    //Get Notification did login
    api_notification_getAll: `${DOMAIN}/user/notification/all`,
    api_notification_getDetail: `${DOMAIN}/user/notification/detail`,
    api_notification_markRead: `${DOMAIN}/user/notification`,

    //Get Notification un login
    api_anonymousNotification_getAll: `${DOMAIN}/anonymous/notification/all`,
    api_anonymousNotification_getDetail: `${DOMAIN}/anonymous/notification/detail`,
    api_anonymousNotification_markRead: `${DOMAIN}/anonymous/notification`,

    //Membership
    api_create_membership: `${DOMAIN}/user/card/create`,

    //New Car
    api_new_car_list_getAll: `${DOMAIN}/product/filter-grades`,
    api_get_detail_new_car: `${DOMAIN}/product/grade-detail`, // pass carId to to get CarDetail
    api_get_enum_filter: `${DOMAIN}/product/enums`,
    api_request_compare_cars: `${DOMAIN}/carcomparision/comparecars`,

    //Download
    api_download_price: `${DOMAIN}/price/download`,
    api_download_specifications: `${DOMAIN}/product/grade/`,

    //Car Compare
    api_suggestion_car_compare: `${DOMAIN}/carcomparision/suggestions`,
    api_get_locations_cost_estimate: `${DOMAIN}/cost-estimator/locations`,
    api_request_booking_test_drive: `${DOMAIN}/test_drive/register-wo-code`,
    api_test_drive_avail_cars: `${DOMAIN}/test_drive/availcars`,
    api_test_drive_avail_location: `${DOMAIN}/test_drive/availdealers`,

    //Finance
    api_services_tfs_finances: `${DOMAIN}/services/tfs/finances`,
    api_get_tfs_finances: `${DOMAIN}/services/tfs/calculate`,

    //Insurance
    api_get_rate_insurance: `${DOMAIN}/insurance-consultancy/rates`,

    //used car
    api_used_car_listing: `${DOMAIN}/used_car/filter-v2`,
    api_used_car_detail: `${DOMAIN}/used_car/detail/`,

    //Cost Estimate
    api_get_provinces: `${DOMAIN}/provinces`,
    api_get_product_enum: `${DOMAIN}/product/enums`,

    //Map
    api_get_location_nearly: `${Const.MAPS_DOMAIN}/place/nearbysearch/json`,
    api_get_location_search: `${Const.MAPS_DOMAIN}/place/textsearch/json`,
    api_cost_estimate_calculate: `${DOMAIN}/cost-estimator/calculate`,

    //Price Estimate Old Car
    api_used_car_onsale_grade: `${DOMAIN}/product/onsale-grades`,
    api_used_car_plate_types: `${DOMAIN}/usedcarcostestimation/platetypes`,
    api_used_car_qualitys: `${DOMAIN}/usedcarcostestimation/qualitys`,
    api_used_car_cost_estimate: `${DOMAIN}/usedcarcostestimation`,

    //Calendar
    api_get_calendar_list: `${DOMAIN}/user/calendars`,

    accessory_detail: `${DOMAIN}/product/accessory/list`,

    login_chat: `${CHAT_DOMAIN}/api/login`,
    get_conversations_chat: `${CHAT_DOMAIN}/api/conversations`,
    get_chat_user: `${CHAT_DOMAIN}/api/user`,
    get_chat_support: `${CHAT_DOMAIN}/api/conversations/support`,
    upload_file_chat: `${CHAT_DOMAIN}/api/upload`,

    //account
    update_avatar: `${DOMAIN}/user/profile/avatar`,

    //Survey
    get_survey_list: `${DOMAIN}/feedback/surveys`,
});
