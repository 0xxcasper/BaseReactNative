import {createContext, useContext} from 'react';
// import {AlertOptions} from "../widgets/dialog/AlertDialog";

export type AppContextType = {
    width: number,
    height: number,
    setLoading: (loading: boolean, timeout?: number) => void,
    // showAlert: (option: AlertOptions) => () => void,
    showAlert: (option: any) => () => void,
}
export const AppContext = createContext<AppContextType>({
    width: 0,
    height: 0,
    setLoading: (_loading, _timeout) => {

    },
    showAlert: (option) => {
        return () => {

        }
    }
});

export const useAppContext = () => {
    return useContext(AppContext);
};
export const useSetLoading = (): ((loading: boolean, timeout?: number) => void) => {
    return useAppContext().setLoading;
};
//change
export const useShowAlert = (): (option: any) => () => void => {
    return useAppContext().showAlert;
};
export const useWidth = (): number => {
    return useAppContext().width;
};
export const useHeight = (): number => {
    return useAppContext().height;
};
