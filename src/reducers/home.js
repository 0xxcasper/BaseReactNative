import { Home } from 'types'

const HomeReducer = (state = Home.DEFAULT_STATE, action) => {
    switch (action.type) {
        case Home.START_GET_HOME_BANNER:
            return {
              ...state,
              bannersLoading: true,
              bannersError: false
            };
        case Home.GET_HOME_BANNER_SUCCESS:
            return {
              ...state,
              banners: action.data,
              bannersLoading: false,
              bannersError: false
            };
        case Home.GET_HOME_BANNER_FAILED:
            return {
              ...state,
              bannersLoading: false,
              bannersError: true
            };
        case Home.START_GET_NEWS:
            return {
              ...state,
              newsLoading: true,
              newsError: false
            };
        case Home.GET_NEWS_SUCCESS:
            return {
              ...state,
              news: action.data,
              newsLoading: false,
              newsError: false
            };
        case Home.GET_NEWS_FAILED:
            return {
              ...state,
              newsLoading: false,
              newsError: true
            };
        case Home.START_GET_YTB_LINK:
            return {
              ...state,
              ytbLinkLoading: true,
              ytbLinkError: false
            };
        case Home.GET_YTB_LINK_SUCCESS:
            return {
              ...state,
              ytbLink: action.data,
              ytbLinkLoading: false,
              ytbLinkError: false
            };
        case Home.GET_YTB_LINK_FAILED:
            return {
              ...state,
              ytbLinkLoading: false,
              ytbLinkError: true
            };
        default:
            return state;
    }
};

export default HomeReducer;
