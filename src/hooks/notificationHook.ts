import { isBlank, sortCollections } from './../helpers';
import { Map } from 'immutable';
import { useSelector, useDispatch } from "react-redux";
import { selectNotifications, selectNotificationDetail } from './../selectors/notificationSelector';
import { Notification, Promotion } from './../types/modelTypes';
import { push as pushAction} from '../actions/navigationActions';
import { ROUTE_NOTIFICATION_DETAIL_HTML } from '../navigation/routeNames';
import { ENUM_NOTIFICATION } from '../common/const';

export const useNotificationMap = (): Map<number, Notification> | null | undefined => {
    return useSelector(selectNotifications);
};

export const useListNotificationIds = (): number[] | null | undefined => {
    const _notificationMap = useSelector(selectNotifications)
    if(_notificationMap && _notificationMap.size > 0) {
        const _result = sortCollections(_notificationMap.valueSeq().toArray(), "createTimeMs", false)
        return _result.map((item: Notification) => item.id)
    }
    return null
};

export const useNotificationId = (notificationId: number): Notification | null | undefined => {
    const _notificationMap = useSelector(selectNotifications)
    if (_notificationMap && _notificationMap.size > 0) {
        return _notificationMap.get(notificationId)
    }
    return null
};

export const useNotificationDetail = (): Notification | null | undefined => {
    return useSelector(selectNotificationDetail)
};
