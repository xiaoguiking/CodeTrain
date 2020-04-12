/**
 * actions工厂
 */
export const ACTION_SET_fROM= 'SET_FROM';
export const ACTION_SET_TO= 'SET_TO';
// 打开城市选择浮层
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE= 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY= 'SET_CURRENT_SELECTING_LEFT_CITY';
// 所有城市数据 异步按需加载
export const ACTION_SET_CITY_DATA= 'SET_CITY_DATA';
// 当前正在加载城市数据'
export const ACTION_SET_IS_LOADING_CITY_DATA= 'SET_IS_LOADING_CITY_DATA';
// 日期选择浮层开关
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE= 'SET_IS_DATE_SELECTOR_VISIBLE';
// 高特动车
export const ACTION_SET_HIGH_SPEED= 'SET_HIGH_SPEED';

export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export function setFrom(from) {
    return {
        type: ACTION_SET_fROM,
        payload: from
    };
}

export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to
    };
}


export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData
    }
}

export function setCityData(cityData) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityData
    }
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState;
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed
        })
    }
}

// 异步action 城市选择
export function showCitySelector(currentSelectingLeftCity) {
    return (dispatch) => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true
        });
        dispatch({
            type:  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity
        })
    }
}

// 城市浮层切换
export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    }
}

// 封装始发逻辑 异步action
export function setSelectorCity(city) {
    return (dispatch ,getState) => {
        const {currentSelectingLeftCity} = getState();
        if(currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }
    }
}

// 日期选择浮层
export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    }
}

export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    }
}

// 始发站和终点站可以互换
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to} = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from))
    }
}

export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

// 异步 fetchCityData
export function fetchCityData() {
    return (dispatch, getState) => {
        const {isLoadingCityData} = getState();
        if(isLoadingCityData) {
            return;
        }
        // 使用缓存数据
        const cache = JSON.parse(localStorage.getItem('city_data_cache' || '{}'));

        if(Date.now < cache.expires) {
            dispatch(setCityData(cache.data))
            return;
        }
        dispatch(setIsLoadingCityData(true));
        fetch('/rest/cities?_' + Date.now())
            .then(res => res.json())
            .then(cityData => {
                dispatch(setCityData(cityData));

                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires: Date.now() * 60 * 1000,
                        data: cityData
                    })
                )
                dispatch(setIsLoadingCityData(false));
            })
            .catch(err => {
                dispatch(setIsLoadingCityData(false));
            })
    }; 
}