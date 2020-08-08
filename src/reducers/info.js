import { InfoType } from 'types'

const Info = (state = InfoType.DEFAULT_STATE, action) => {
    switch (action.type) {
        case InfoType.SET_HEADER_TITLE:
            return {
                ...state,
                title: action.data
            };
        default:
            return state;
    }
};

export default Info;
