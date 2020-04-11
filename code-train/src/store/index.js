/**
 * store仓库
 */
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from  './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        // 初始值state
        from: '北京',
        to: '上海',
        // 打开城市选择浮层
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        // 所有城市数据 异步按需加载
        cityData: null,
        // 当前正在加载城市数据
        isLoadingCityData: false,
        // 日期选择浮层开关
        isDateSelectorVisible: false,
        // 高特动车
        highSpeed: false, 
        departDate: Date.now(),  
    },
    applyMiddleware(thunk)
)