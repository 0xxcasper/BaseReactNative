import { Car } from 'types'

const CarReducer = (state = Car.DEFAULT_STATE, action) => {
    switch (action.type) {
        case Car.START_GET_ALL_CAR_BRANDS:
            return {
              ...state,
              carBrandsLoading: true,
              carBrandsError: false
            };
        case Car.GET_ALL_CAR_BRANDS_SUCCESS:
            return {
              ...state,
              carBrands: action.data,
              carBrandsLoading: false,
              carBrandsError: false
            };
        case Car.GET_ALL_CAR_BRANDS_FAILED:
            return {
              ...state,
              carBrandsLoading: false,
              carBrandsError: true
            };
        default:
            return state;
    }
};

export default CarReducer;
