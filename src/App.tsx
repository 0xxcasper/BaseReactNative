import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import _ from 'lodash';
import React, {
    forwardRef,
    memo,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from "redux-persist";
import {createAction} from "./actions";
import {DESTROY_APP, START_APP} from "actionTypes/appActionTypes";
import {TIME_SEC} from "common/const";
import {commonStyles} from "common/styles";
import RootNavigation from "navigation/RootNavigation";
import {default as reduxStore, default as store} from 'redux/store';
import rootSaga from './saga';
import {setNavigationRef} from "saga/navigationSaga";
import {AppContext, AppContextType} from "contexts/appContext";
import {LayoutAnimationCompat, sortCollections} from "Helpers";
import {AlertOptions, AlertPriority} from "widgets/dialog/AlertDialog";
import {OrderedMap} from 'immutable';

let reduxPersistStore;
// @ts-ignore
reduxStore.runSaga(rootSaga);
const App = memo((props) => {
    const [rerenderCounter, setRerenderCounter]
                        = useState<number>(0);
    const _loadingRef   = useRef<LoadingOverlayRef>(null);
    const navigationRef = useRef<NavigationContainerRef | null>(null);
    const _variables    = useMemo(() => {
        return {
            alertStack: OrderedMap<string, AlertOptions>()
        }
    }, [])
    const [dehydrated, setDehydrated]   = useState(false);
    const [size, setSize]               = useState({
        width: 0,
        height: 0
    });
    const _onDehydrated = useCallback(() => {
        setDehydrated(true);
        reduxStore.dispatch(createAction(START_APP));
    }, []);

    const _onLayout = useCallback(event => {
        const _w = event.nativeEvent.layout.width;
        const _h = event.nativeEvent.layout.height;
        if (_w !== size.width || _h !== size.height) {
            setSize({
                width: _w,
                height: _h,
            });
        }
    }, [size]);
    useEffect(() => {
        reduxPersistStore = persistStore(reduxStore, null, _onDehydrated);
        setNavigationRef(navigationRef);
        // @ts-ignore
        Text.defaultProps = Text.defaultProps || {};
        // @ts-ignore
        Text.defaultProps.allowFontScaling = false;
        return () => {
            reduxStore.dispatch(createAction(DESTROY_APP));
            // @ts-ignore
            reduxStore.close();
        }
    }, []);

    const _onSetLoading = useCallback((loading, timeout) => {
        if (_loadingRef.current) {
            _loadingRef.current.setVisible(loading, timeout);
        }
    }, []);

    const _showAlert = useCallback((option: AlertOptions) => {
        LayoutAnimationCompat.easeInEaseOut();
        if (option.priority == null) {
            option = {
                ...option,
                priority: AlertPriority.NORMAL,
            }
        }
        if (!option.id) {
            option = {
                ...option,
                id: _.uniqueId('alert:'),
            }
        }
        const _dismissAlert = () => {
            if (_variables.alertStack.get(option.id || '')) {
                LayoutAnimationCompat.easeInEaseOut();
                _variables.alertStack = _variables.alertStack.delete(option.id || '');
                setRerenderCounter((_currentValue) => _currentValue + 1);
            }
        }
        if (!option.contentView) {
            const {
                title,
                message,
                buttons,
                children
            } = option
            option = {
                ...option,
                contentView: (<View/>)
            }
        }
        _variables.alertStack = sortCollections(_variables.alertStack.set(option.id || '', option), 'priority');
        setRerenderCounter((_currentValue) => _currentValue + 1);
        return _dismissAlert;
    }, []);

    const _appContextValue: AppContextType = useMemo(() => {
        return {
            setLoading: _onSetLoading,
            showAlert: _showAlert,
            width: size.width,
            height: size.height,
        }
    }, [size, _onSetLoading]);

    //-----DONT Write hook below this line--------
    if (!dehydrated) {
        return (<View
            style={commonStyles.fullFlex}
            onLayout={_onLayout}
        />);
    }
    return (
        <>
            <Provider store={store}>
                <AppContext.Provider
                    value={_appContextValue}
                >
                    <NavigationContainer
                        ref={navigationRef}
                    >
                        <RootNavigation />
                    </NavigationContainer>
                </AppContext.Provider>
            </Provider>
            <LoadingOverlay
                ref={_loadingRef}
            />
        </>
    );
})

export default App;

type LoadingOverlayRef = {
    setVisible: (visible: boolean, timeout?: number) => void
}
const LoadingOverlay = forwardRef((
    props,
    ref: Ref<LoadingOverlayRef>
): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const _variable = useMemo(() => {
        return {
            timeoutHandler: 0,
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            setVisible: (_visible, _timout = TIME_SEC * 30) => {
                if (_variable.timeoutHandler) {
                    clearTimeout(_variable.timeoutHandler);
                    _variable.timeoutHandler = 0;
                }
                if (_visible && _timout) {
                    _variable.timeoutHandler = _.delay(() => {
                        setVisible(false);
                        _variable.timeoutHandler = 0;
                    }, _timout);
                }
                setVisible(_visible);
            }
        }
    }, [_variable, setVisible]);

    if (!visible) return null;
    return (
        <View style={[commonStyles.fillFullCenterAll]}>
            <ActivityIndicator
                color={'red'}
                size={"large"}
            />
        </View>
    );
});

