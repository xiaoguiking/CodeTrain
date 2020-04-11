/**
 * reducers 返回一个新的state
 */

import {
    ACTION_SET_fROM,
    ACTION_SET_TO,
    // 打开城市选择浮层
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    // 所有城市数据 异步按需加载
    ACTION_SET_CITY_DATA,
    // 当前正在加载城市数据'
    ACTION_SET_IS_LOADING_CITY_DATA,
    // 日期选择浮层开关
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    // 高特动车
    ACTION_SET_HIGH_SPEED,
    ACTION_SET_DEPART_DATE,
} from './actions';

export default {
    // 初始值state
    from(state = '北京', action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_fROM:
                return payload;
            default:
        }
        return state;
    },
    to(state = '上海', action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_TO:
                return payload;
            default:
        }
        return state;
    },
    // 打开城市选择浮层
    isCitySelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
                return payload;
            default:
        }
        return state;
    },
    currentSelectingLeftCity(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
                return payload;
            default:
        }
        return state;
    },
    // 所有城市数据 异步按需加载
    cityData(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_CITY_DATA:
                return payload;
            default:
        }
        return state;
    },
    // 当前正在加载城市数据
    isLoadingCityData(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_IS_LOADING_CITY_DATA:
                return payload;
            default:
        }
        return state;
    },
    // 日期选择浮层开关
    isDateSelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
                return payload;
            default:
        }
        return state;
    },
    // 高铁动车
    highSpeed(state = false , action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_HIGH_SPEED:
                return payload;
            default:
        }
        return state;
    },
    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }

        return state;
    },
};