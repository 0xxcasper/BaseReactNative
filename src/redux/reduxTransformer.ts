import {createTransform} from 'redux-persist';
import {authFromJs, authToJs} from "reducers/authReducer";
import {appStateFromJs, appStateToJs} from "reducers/appReducer";
import {accountStateFromJs, accountStateToJs} from "reducers/accountReducer";

const appTransformer = createTransform(
    (inboundState: any, key) => {
        switch (key) {
            case 'appState':
                return appStateToJs(inboundState);
            case 'authState':
                return authToJs(inboundState);
            case 'accountState':
                return accountStateToJs(inboundState);
        }
        return inboundState;
    },
    (outboundState, key) => {
        let result = outboundState;
        switch (key) {
            case 'appState':
                return appStateFromJs(outboundState);
            case 'authState':
                return authFromJs(outboundState);
            case 'accountState':
                return accountStateFromJs(outboundState);
        }
        return result;
    }
);
export default appTransformer
