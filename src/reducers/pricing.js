import { Pricing } from 'types'

const PricingReducer = (state = Pricing.DEFAULT_STATE, action) => {
    switch (action.type) {
        case Pricing.START_GET_PRICE_ALL:
            return {
              ...state,
              pricings: [],
              pricingLoading: true,
              pricingError: false
            };
        case Pricing.GET_PRICE_ALL_SUCCESS:
            return {
              ...state,
              pricings: action.data,
              pricingLoading: false,
              pricingError: false
            };
        case Pricing.GET_PRICE_ALL_FAILED:
            return {
              ...state,
              pricings: [],
              pricingLoading: false,
              pricingError: true
            };
        default:
            return state;
    }
};

export default PricingReducer;
