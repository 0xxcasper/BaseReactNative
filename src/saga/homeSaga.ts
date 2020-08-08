import { REQUEST_CONTACT_INFO } from './../actionTypes/homeActionTypes';
import { all, put, select, take, takeLatest } from 'redux-saga/effects';
import {
    ERROR_HOME_BANNERS,
    RECEIVE_HOME_BANNERS,
    REQUEST_HOME_BANNERS,
    REQUEST_HOME_NEWS,
    REQUEST_HOME_YOU_TUBE
} from "../actionTypes/homeActionTypes";
import { getHomeBannersApi, getNewsApi, getVideoApi, getContactInfo } from "../network/index";
import { delay } from "./index";
import { TIME_MIN } from "../common/const";
import { HomeBanner, News, NewsPage, YouTube } from "../types/modelTypes";
import {
    addNews as addNewsAction,
    updateHomeBannerPopup,
    updateHomeYouTube,
    updateNewsPageInfo as updateNewsPageInfoAction,
    updateContactInfo as updateContactInfoAction
} from "../actions/homeActions";
import { selectFcmToken } from "../selectors/appSelectors";
import utils from '../common/utils';
import { isBlank } from '../helpers';
import { updateContactInfo } from '../actions/homeActions';

function* requestHomeNews() {
    try {
        const _news = yield getNewsApi();
        console.log('Get Home News: ', _news);
        const {
            id,
            template,
            name,
            slug,
            parent_recursive,
            content_pagination_meta,
            meta,
            contents
        } = _news;
        const _pageId = id + '';
        const _newsPage: NewsPage = {
            id: _pageId,
            template,
            name,
            slug,
            parent: parent_recursive,
            currentPage: content_pagination_meta?.current_page,
            meta: meta,
        };
        yield put(updateNewsPageInfoAction(_newsPage));
        //replace contents by _news
        yield put(addNewsAction('20000000', _news.map((_content: any): News => {
            return {
                id: (_content?.id || '') + '',
                template: _content?.template,
                name: _content?.name,
                slug: _content?.slug,
                description: _content?.description,
                thumbnail: {
                    title: _content?.thumb?.title,
                    path: _content?.thumb?.path,
                    description: _content?.thumb?.description,
                    originalPath: _content?.thumb?.original_path,
                },
                bottomThumbnail: {
                    title: _content?.bottom_thumb?.title,
                    path: _content?.bottom_thumb?.path,
                    description: _content?.bottom_thumb?.description,
                    originalPath: _content?.bottom_thumb?.original_path,
                },
                publishedTimeMs: new Date(_content?.publish_at).getTime(),
                parentSlug: _content?.parent_recursive,
                content: _content?.content,
                meta: _content?.meta
            }
        })))
    } catch (e) {
        console.log('Get Home News Error: ', e);
    }
}

function* requestHomeBanners() {
    try {
        const token = yield select(selectFcmToken);
        const _result = yield getHomeBannersApi(token);
        if (_result) {
            const _providerId = _result?.slug || _result?.id || '';
            const _banners = _result?.banners?.pc?.map((_banner: any, _index: number): HomeBanner => {
                const {
                    type,
                    startDate,
                    endDate,
                    path,
                    link,
                    source
                } = _banner;
                return {
                    id: _providerId + '-banner-' + _index,
                    type: type,
                    startTimeMs: startDate ? (new Date(startDate)).getTime() : undefined,
                    endTimeMs: endDate ? (new Date(endDate)).getTime() : undefined,
                    imagePath: path,
                    landingPage: link,
                    source: source,
                    order: _index,
                }
            });
            // const {
            //     type,
            //     startDate,
            //     endDate,
            //     path,
            //     link,
            //     source
            // } = _result?.popups?.mb;

            // const _popups = [{
            //     id: _providerId + '-popup-' + 0,
            //     type: type,
            //     startTimeMs: startDate ? (new Date(startDate)).getTime() : undefined,
            //     endTimeMs: endDate ? (new Date(endDate)).getTime() : undefined,
            //     imagePath: path,
            //     landingPage: link,
            //     source: source,
            //     order: 0,
            // }]
            yield put(updateHomeBannerPopup(_banners, null));
        }
    } catch (e) {
    }
}

function* requestHomeYTB() {
    try {
        const _result = yield getVideoApi();
        if (_result) {
            const { data } = _result
            if (data && data.length > 0) {
                yield put(updateHomeYouTube(data.map((_item: any) => {
                    const { link } = _item
                    if (!isBlank(link)) {
                        return {
                            videoId: utils.youTube_parser(link),
                            linkVideo: link
                        }
                    }
                })));
            }
        }
    } catch (e) {
    }
}

function* _requestContactInfo() {
    try {
        const _result = yield getContactInfo();
        if(_result) {
            yield put(updateContactInfoAction(_result))
        }
    } catch (e) {
    }
}

function* watchHomeNews() {
    yield take(REQUEST_HOME_NEWS);
    yield requestHomeNews();
}

function* watchHomeBanner() {
    yield takeLatest(REQUEST_HOME_BANNERS, requestHomeBanners);
}

function* watchHomeYTB() {
    yield take(REQUEST_HOME_YOU_TUBE);
    yield requestHomeYTB();
}

function* watchContactInfo() {
    yield take(REQUEST_CONTACT_INFO);
    yield _requestContactInfo();
}

export default function* () {
    yield all([
        watchHomeBanner(), 
        watchHomeNews(), 
        watchHomeYTB(),
        watchContactInfo()
    ]);
}
