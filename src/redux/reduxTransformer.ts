import {createTransform} from 'redux-persist';

const appTransformer = createTransform(
    (inboundState: any, key) => {
        switch (key) {
            // case 'appState':
            //     return appStateToJs(inboundState);
            // case 'authState':
            //     return authToJs(inboundState);
            // case 'accountState':
            //     return accountStateToJs(inboundState);
        }
        return inboundState;
    },
    (outboundState, key) => {
        let result = outboundState;
        switch (key) {
            // case 'appState':
            //     return appStateFromJs(outboundState);
            // case 'authState':
            //     return authFromJs(outboundState);
            // case 'accountState':
            //     return accountStateFromJs(outboundState);
        }
        return result;
    }
);
export default appTransformer
