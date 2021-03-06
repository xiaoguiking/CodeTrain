

[TOC]

## 第六章项目重点火车票业务架构(video)

###  1.项目业务选型以及演示分析 

###   2.项目模块交互设计演示与分析 

###   3.项目工程初始化 

**项目改造**

- 移除无关代码
- 创建必要的4个页面文件
- 改写webpackconfig编译多个页面

+ src下创建 mkdir index
  - touch actions.js
  - touch App.css
  - touch App.jsx
  - touch index.css
  - touch index.js
  - touch reducers.js
  - touch store.js



`src/index/index.js`

**安装包**

| yarn add normalize.css | 清除全局样式   |
| ---------------------- | -------------- |
| yarn add react-redux   |                |
| yarn add  redux        | 全局状态管理   |
| yarn add redux-thunk   | 处理异步action |

```react
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/';  // 清除浏览器全局样式
import store from './store';
import './index.css';
import App from './App';

ReactDom.render(
<Provider store={store}><App /></Provider>, 
document.getElementById('root')
);

```


`src/index/index.css`

```css
html {
    background: #f5f5f5;
    color: #333;
    font-size: 32px;
}

body,
ul,
ol,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
figure,
form,
fieldset,
legend,
input,
textarea,
button,
p,
blockquote,
th,
td,
pre,
xmp {
    margin: 0;
    padding: 0;
}
body,
input,
textarea,
button,
select,
pre,
tt,
code,
kbd,
samp,
optgroup,
option {
    line-height: 1.5;
    font-family: arial, '\5B8B\4F53', '\5FAE\8F6F\96C5\9ED1', verdana, helvetica,
        sans-serif;
}

body {
    min-width: 320px;
    max-width: 540px;
    font-size: 16px;
    margin: 0 auto;
    padding-top: 44px;
}

.hidden,
[hidden] {
    display: none !important;
}

::-webkit-input-placeholder {
    color: #c7ced4;
}

button {
    -webkit-appearance: none;
}

```

`src/index/App.jsx`

```react
import { connect } from 'react-redux';

import './App.css';
function App(props) {

}

export default connect(
    function mapStateToProps(state) {},
    function mapDispatchToProps(dispatch) {}
)(App);
```

`src/index/reducers.js`

```js
export default {
    
}; 
```

`src/index/store.js`

```react
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import reducers from './reducers';
import thunk from 'react-thunk';

export  default createStore(
	combineReducers(reducers),
    {
        // 初始值 state code
    },
    applyMiddlewart(thunk)
)
```



**建立页面文件**

- src/query/index.js  车次列表
- src/ticket/index.js  选择车票
- src/order/index.js   订单页
- public/index.html  修改原本title 火车票
- public/query.html    title 搜索结果
- public/ticket.html     坐席选择
- public/order.html   订单填写

**修改webpack配置**

- config/webpack.config.js

  ```js
      entry:{
          index:[paths.appIndexJs,isEnvDevelopment &&require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
          query:[paths.appQueryJs,isEnvDevelopment &&require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
          order:[paths.appOrderJs,isEnvDevelopment &&require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
          ticket:[paths.appTicketJs,isEnvDevelopment &&require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
      },
          
          
   搜索HtmlWebpackPlugin---- apphtml
   
         new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              template: paths.appHtml,
              fileName: 'index.html',
              chunks: ['index']
            },
            isEnvProduction
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        ),
        // query.html
        new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              template: paths.appQueryHtml,
              fileName: 'query.html',
              chunks: ['query']
            },
            isEnvProduction
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        ),
        // order.html
        new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              template: paths.appOrderHtml,
              fileName: 'order.html',
              chunks: ['order']
            },
            isEnvProduction
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        ),
        // ticket.html
        new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              template: paths.appTicketHtml,
              fileName: 'ticket.html',
              chunks: ['ticket']
            },
            isEnvProduction
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        ),
          
  ```

- 搜索entry----定义在paths.js

- 修改paths.js

  ```js
    appHtml: resolveApp('public/index.html'),
    appQueryHtml: resolveApp('public/query.html'),
    appOrderHtml: resolveApp('public/order.html'),
    appTicketHtml: resolveApp('public/ticket.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index/index'),
    appQueryJs: resolveModule(resolveApp, 'src/query/index'),
    appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),
    appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  ```

- 打包 yarn build 查看


### 4.为项目搭建Mock Server 

`CodeTranin/train-mock`

- npm init - y
- touch index.js
   ```js
   const express = require('express');
   const app = express();
   
   app.get('/', (request, response) => {
       response.status(200);
       response.send('hello');
       response.end();
   });
   
   app.get('/rest', (request, response) => {
       response.json({
           result: 1,
           msg: 'hello world'
       })
   });
   
   app.listen(5000, () => {console.log('express port is 5000')});
   ```

   ```js
`train-ticket-hooks/package.json`
​```js
"proxy": "http://localhost:5000"
   ```
- 控制台`fetch('/rest')`
    ```
    查看Network
    ```

### 5.code-train项目改造通过路由单页面应用

- 安装路由
    ```js
    yarn add react-router react-router-dom react-router
    ```
    
- `src/index.index`
  
  ```
  安装 yarn add normalize.css
  import 'normalize.css/';  // 清除浏览器全局样式
  ```
  
- 编写路由`src/routes/index.js`
   ```react
import React from 'react'
   import { Redirect } from 'react-router-dom';
   import Home from '../pages/Home';
   import Order from '../pages/order';
   import Query from '../pages/query';
   import Ticket from '../pages/ticket';
   
   export default [
       {
           path: "/",
           component: Home,
           routes: [
               {
                   path: "/",
                   exact: true,
                   render: () => (
                       <Redirect to={"/home"} />
                   ),
               },
               {
                   path: "/order",
                   component: Order
               },
               {
                   path: '/ticket',
                   component: Ticket
               },
               {
                   path: "/query",
                   component: Query
               }
           ]
       },
   ]
   ```
   
- 配置状态管理`src/store/index.js` `src/store/actions.js` `src/store/reducers.js`

   yarn add normalize.css  清除全局样式 

    yarn add react-redux    

   yarn add  redux  全局状态管理  

   yarn add redux-thunk  处理异步action

   ```react
   // 仓库 store
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
       },
       applyMiddleware(thunk)
   )
   
   ```

   

### 目录结构

- src

  - asset 存放资源
  - components 组件
- routes 路由配置
  - store 全局仓库



## 第七章 项目火车篇首页

### 1数据结构设计

- React 视觉组件拆分

- redux store状态涉及`src/store/index.js`

  ```react
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
  ```

  

- redux action/reducer

  ```react
  /src/store/reducers.js
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
      // 高特动车
      highSpeed(state false, action) {
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
  ```

  ```react
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
  
  export function setCityData(cityDate) {
      return {
          type: ACTION_SET_CITY_DATA,
          payload: cityDate
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
  
  export function hideCitySelector() {
      return {
          type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
          payload: false,
      }
  }
  
  // 封装始发逻辑 异步action 回填数据 + 关闭城市选择浮层
  export function setSelectorCity(city) {
      return (dispatch ,getState) => {
          const {currentSelectingLeftCity} = getState();
          if(currentSelectingLeftCity) {
              dispatch(setFrom(city));
          } else {
              dispatch(setTo(city));
          }
          dispatch(hideCitySelector());
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
  ```
```
  
  

`公共组件components`

- Header.jsx

  ```react
  import React from 'react'
  import './Header.css';
  
  export default function Header() {
      return (
          <div>Header</div>
      )
  }
```

  

- Header.css

  


### 2顶部导航栏

- 动态校验传入的类型

  ```react
  yarn add prop-types
  ```

- components/Header.jsx 
	```react
	import React from 'react'
	import PropTypes from 'prop-types';
	import './Header.css';
	
	export default function Header(props) {
	    const { onBack, title } = props;
	    console.log(onBack, 'on');
	    return (
	        <div className="header">
	            <div className="header-back" onClick={onBack}>
	                 <svg width="42" height="42">
	                    <polyline 
	                        points="25, 13, 16, 21, 25, 29"
	                        stroke="#fff"
	                        strokeWidth="2"
	                        fill="none"
	                    />
	                 </svg>
	            </div>
	            <h1 className="header-title">
	                {title}
	            </h1>
	        </div>
	    )
	}
	
	Header.protoTypes = {
	    onBack: PropTypes.func.isRequired,
	    title: PropTypes.string.isRequired,
	}
	```

- Header.css

  ```css
  .header {
      height: 44px;
      line-height: 44px;
      min-width: 240px;
      background: #1ba9ba;
      color: #fff;
      font-size: 18px;
      text-align: center;
      position: relative;
      padding: 0 15px;
  }
  
  .header-back {
      position: absolute;
      left: 0;
      width: 42px;
      height: 42px;
  }
  .header-title {
      max-width: 216px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      font-size: 100%;
      margin: 0;
  }
  ```

  

- pages/Home/index.js

  ```react
  import React, {useCallback} from 'react';
  import { renderRoutes } from "react-router-config";
  import { connect } from 'react-redux';
  import './index.css';
  import Header from '../../components/Header';
  import DepartDate from './DepartDate.jsx';
  import HighSpeed from './HighSpeed.jsx';
  import Journey from './Journey.jsx';
  import Submit from './Submit.jsx';
  
  
  function Home (props) {
    const { route } = props;
  
   // 子组件传函数
    const onBack = useCallback(() => {
      window.history.back();
    }, []);
  
    return (
      <div>
        <div>
          <div className="header-wrapper">
          <Header title="火车票" onBack={onBack}/>
          </div>
        <DepartDate />
        <HighSpeed />
        <Journey />
        <Submit />
        </div>
        { renderRoutes (route.routes) }
      </div>
    )
  }
  
  // export default React.memo (connect 
  //   (mapStateToProps, mapDispatchToProps, mergeProps)
  // (component)(Home));
  export default React.memo(connect(
    function mapStateToProps(state) {
      return {}
    },
    function mapDispatchToProps(dispatch) {
      return {}
    }
  )(Home));
  ```

- pages/Home.index.css

  ```css
  .header-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 2;
  }
  ```

  

###  3始发终到站

- src/pages/Home.js

```react
import React, { useCallback } from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import './index.css';
import Header from '../../components/Header';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import {
  exchangeFromTo,
  showCitySelector
} from '../../store/actions';

function Home(props) {
  const { route, from, to, dispatch } = props;

  console.log(props, 'props');
  // 子组件传函数
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const doExchangeFromTo = useCallback(() => {
    dispatch(exchangeFromTo());
  },[dispatch])

  const doShowCitySelector = useCallback((m) => {
    dispatch(showCitySelector(m))
  },[dispatch])


  return (
    <div>
      <div>
        <div className="header-wrapper">
          <Header title="火车票" onBack={onBack} />
        </div>
        <Journey
          from={from}
          to={to}
          exchangeFromTo={doExchangeFromTo}
          showCitySelector={doShowCitySelector}
        />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch};
  }
)(Home));
```

合并改写

```react
import React, { useCallback, useMemo } from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import Header from '../../components/Header';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import {
  exchangeFromTo,
  showCitySelector
} from '../../store/actions';

function Home(props) {
  const { route, from, to, dispatch } = props;

  console.log(props, 'props');
  // 子组件传函数
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // },[dispatch])

  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(showCitySelector(m))
  // },[dispatch])
  
  /**
   * 合并回调cbs
   * 关键代码
   */
  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
    },[dispatch])

  return (
    <div>
      <div>
        <div className="header-wrapper">
          <Header title="火车票" onBack={onBack} />
        </div>
        <Journey
          from={from}
          to={to}
          {...cbs }       // 关键代码
        />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
}


export default React.memo(connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch};
  }
)(Home));
```

`Home/index.css`

```css
.header-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
}
.form {
    padding: 5px 15px 0;
    background: #fff;
}
```



### 4 城市选择浮层-顶部搜索栏

`src/components/CitySelector.jsx`

- 搜索功能

- 回退功能

  

```react
/**
 * 城市选择浮层 
 * 1搜索框
 */
import React from 'react';
import './CitySelector.css';

show : true(显示城市选择浮层) ： false（隐藏）

export default function CitySelector(props) {
    const { show, isLoading, cityData } = props;
    console.log('CitySelector', props);
    return (
        // 声明数组一定包含city-selector,当show为false加入hidden，过滤点无意值filter变成字符串
        // display: none !important;
         <div className={["city-selector", (!show)&& 'hidden'].filter(Boolean).join(' ')}>
            city
        </div>
    )
}
```

**使用第三方管理动态类**

> yarn add  classnames

```react
/**
 * 城市选择浮层 
 * 1搜索框
 * 2.回退功能
 */
import React, { useState } from 'react';
import './CitySelector.css';
import classnames from 'classnames';

export default function CitySelector(props) {
    const { show, isLoading, cityData, onBack1,} = props;
    // console.log('CitySelector', props);
    // console.log('onback', onBack);
    // 动态处理css类名

    // 保存搜索的内容
    const [searchKey, setSearchKey] = useState('');
	
    // 处理留白
    const key = useMemo(() => searchKey.trim, [searchKey]);
    return (
        <div className={classnames('city-selector', { hidden: !show})}>
            <div className="city-search">
                 <div className="search-back" onClick={() => onBack1()}>
                        <svg width="42" height="42">
                            <polyline
                                points="25, 13, 16, 21, 25, 29"
                                stroke="#fff"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                 </div>
            <div className="search-input-wrapper">
                <input 
                    type="text"
                    value={searchKey}
                    className="search-input"
                    placeholder="城市、车站的中文或拼音"
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>
            <i 
                className={classnames("search-clean", {hidden: key.length === 0}) }
                onClick={() => setSearchKey('')}
            >
                &#xf063;
            </i>
            </div>
        </div>
    )
}
```

`src/Home/index.js`

```react
import React, { useCallback, useMemo } from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import Header from '../../components/Header';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';
import CitySelector from '../../components/CitySelector';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
} from '../../store/actions';

function Home(props) {
  const { route, from, to, dispatch, 
    cityData, isLoadingCityData, isDateSelectorVisible,
    isCitySelectorVisible,
} = props;

  console.log(props, 'props');

  // 子组件传函数
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // },[dispatch])

  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(showCitySelector(m))
  // },[dispatch])

  /**
   * 合并回调cbs
   * 关键代码
   */
  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [dispatch])

  /**
   * 跳转到CitySelector回退功能
   */
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
        {
            onBack1: hideCitySelector,
        }, dispatch);
}, [dispatch]);

  return (
    <div>
      <div>
        <div className="header-wrapper">
          <Header title="火车票" onBack={onBack} />
        </div>
        <form className="form">
          <Journey
            from={from}
            to={to}
            {...cbs}
          />
          <DepartDate />
          <HighSpeed />
          <Submit />
        </form>
        <CitySelector 
          show={isDateSelectorVisible}
          isLoading={isLoadingCityData}
          cityData={cityData}
          {...citySelectorCbs}
        />
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
}


export default React.memo(connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(Home));
```

### 5 城市选择浮层-城市的异步加载

- 数据异步加载 uesEffect `src/components/CitySelector.jsx`

- 异步请求 localStorage 数据缓存  store/actions.js

  ​	

  ```react
  // CitySelector.jsx
  import React, { useState, useMemo, useEffect } from 'react';
  const { show, isLoading, cityData, onBack, fetchCityData} = props;
      // 处理异步请求
      useEffect(() => {
          // false, 有数据，加载
          if(!show || cityData || isLoading){
              return;
          }
          fetchCityData();
      }, [show, cityData, isLoading])
  
  ```



```react
// store/actions.js
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

            	// 缓存数据
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
```



### 6 城市选择浮层-渲染城市列表

- 城市列表渲染
- 组件分级
- *关于加载数据cityData是否存在情况* ----  actions 数据回填

组件分级

- 最小力度城市条目组件CityItem

  ```react
  /**
   * 最小力度城市CityItem
   */
  const CityItem = memo(function CityItem(props) {
      const {
          name, // 城市名字
          onSelect
      } = props;
      console.log(name, 'name');
      return (
          <li className="city-li" onClick={() => onSelect(name) }>
              {name}
          </li>
      )
  });
  
  CityItem.propTypes = {
      name: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired
  }
  ```

  

- 首字母相同的城市组件集合 CitySection

  ```react
  /**
   * 中型首字母相同城市组件集合
   */
  const CitySection = memo(function CitySection(props) {
      const {
          cities = [],
          title,   //A,B
          onSelect
      } = props;
      
      return (
          <ul className="city-ul">
              <li className="city-li" key="title">
                  {title}
              </li>
              {
                  cities.map(city => { 
                      return (
                          <CityItem
                              key={city.name}
                              name={city.name}
                              onSelect={onSelect}
                          />
                      )
                  })
              }
          </ul>
      )
  });
  
  CitySection.propTypes = {
      cities: PropTypes.array,
      title: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired
  }
  ```

  

- 最大力度整个列表 CityList

  ```react
  /**
   * 整个列表CityList
   */
  const CityList = memo(function CityList(props) {
      const {
          sections, // 集合
          onSelect
      } = props;
  
      return (
          <div className="city-list">
              <div className="city-cate">
                  {
                      sections.map(section => {
                          return (
                              <CitySection 
                                  title={section.title}
                                  key={section.title}
                                  cities={section.citys}
                                  onSelect={onSelect}
                              />
                          )
                      })
                  }
              </div>
          </div>
      )
  });
  
  CityList.propTypes = {
      sections: PropTypes.array.isRequired,
      onSelect: PropTypes.func.isRequired
  }
  ```

- 关于是否加载数据存在

  ```react
     const outputCitySections = () => {
           if(isLoading){
              return (<div>loading</div>)
           }
  
           if(cityData) {
               console.log('cityData',cityData.cityList);
               return (
                   <CityList 
                      sections={cityData.cityList}
                      onSelect={onSelect} 
                  />
               )
          }
  
          return (<div>error</div>)
      }
     return (
          <div className={classnames('city-selector', { hidden: !show })}>
              <div className="city-search">
                  <div className="search-back" onClick={() => onBack()}>
                      <svg width="42" height="42">
                          <polyline
                              points="25, 13, 16, 21, 25, 29"
                              stroke="#fff"
                              strokeWidth="2"
                              fill="none"
                          />
                      </svg>
                  </div>
                  <div className="search-input-wrapper">
                      <input
                          type="text"
                          value={searchKey}
                          className="search-input"
                          placeholder="城市、车站的中文或拼音"
                          onChange={(e) => setSearchKey(e.target.value)}
                      />
                  </div>
                  <i
                      className={classnames("search-clean", { hidden: key.length === 0 })}
                      onClick={() => setSearchKey('')}
                  >
                      &#xf063;
              </i>
              </div>  // 关键代码
                  {outputCitySections()}
          </div>
      )
  ```

  

### 7 城市选择浮层-字母快速定位

- 渲染右边字母表

- 实现点击右边字母表联动

  `src/components/CitySelector.jsx`

  ```react
  // 1.右侧字母列表显示
  // 2.点击响应
  const AlphaIndex = memo(function AlphaIndex(props) => {
  		const {
                alpha, //指定字母的字符串显示
                onClick, //回调
       } = props;
  	return (
      <div className="city-index-item" onClick={() => onClick(alpha)}
          {alpha}
        </div>
      )
  })
  
  AlphaIndex.propTypes = {
      alpha: PropTypes.string.isReuqired,
      onClick: PropTypes.func.isRequired
  }
          
          
  // 获取26的字母的数组，ele数组成员，index需要的序号
  
  const alphabet = Array.from(new Array(26), (ele, index) => {
           return String.fromCharCode(65 + index);        
  })
              
              
              
   // CityList           
   const CityList = memo(function CityList(props) {
      const {
          sections, // 集合
          onSelect,
          toAlpha,
      } = props;
  
      return (
          <div className="city-list">
              <div className="city-cate">
                  {
                      sections.map(section => {
                          return (
                              <CitySection
                                  title={section.title}
                                  key={section.title}
                                  cities={section.citys}
                                  onSelect={onSelect}
                              />
                          )
                      })
                  }
              </div>
              <div className="city-index">
                  {
                      alphabet.map(alpha => {
                          return (
                              <AlphaIndex
                                  key={alpha}
                                  alpha={alpha}
                                  onClick={toAlpha} // 关键代码
                              />)
                      })
                  }
              </div>
          </div>
      )
  });
  ```

  

### 8 城市选择浮层-搜索建议

- 搜索单个条目SuggestItem

  ```react
  const SuggestItem = memo(function SuggestItem(props) {
      const {
          name, // 城市名字
          onCLick
            } = props;
      return (
       <div className="city-suggest-li" onClick={() => onClick(name)}>
       	{name}
        </div>
      )
  })
  
  SuggestItem.propTypes = {
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
  }
  ```

  

- Suggest父级组件

  ```react
  const Suggest = memo(function Suggest(props) {
      const {
          searchkey,  // 搜索内容，发送请求使用
          onSelect 
      } = props;
      
       const [result, setResult] = useState([]);
      
      // searchKey请求处理副作用
      useEffect(() => {
          fetch('/rest/searchKye?key=' + encodeURlComponent(searchKey))
          .then(res => res.json())
          .then(data => {
              const {result. searchKey: skey} = data;
          	if(sKey ==== searchKey) {
                  setResult(result)
              }
          })
      },[searchKey])
      // 优化没有结果时候搜索返回
      const fallBackResult = useMemo(() => {
          if(!resutl.length){
              retturn [{display: searchKey}]
          }
          return result;
      }, [result, searchKey])
      
      return (
      	<div className="city-suggest">
          	<ul className="city-suggest-ul">
              	{
                      // 优化使用
                      fallBackResult.map(item => {
                          return (
                          <SuggestItem  
                           key={item.display}   
                           name={item.display}
                           onClick={onSelect}
                           ></SuggestItem>
                          )
                      })
                  }
              </ul>
          </div>
      )
  })
  ```

  

- CitySelector中组件使用

  ```react
  {
      Boolean(key) && (
      	<Suggest 
              searchkey = {key}
              onSelect= {key => onSelect(key)}
      )
  }
  ```

  

  

### 9 出发日期控件

- `src/Home/DepartDate.jsx`
- 引入只返回天的工具函数
- 使用第三方日期转换

**src/Home/DepartDate.jsx**

```react
/**
 * 出发日期
 * 1.引入只返回天的工具函数
 * 2.引入第三方转换日期dayjs
 */
import React, { useMemo } from 'react';
import {h0} from '../../common/fp';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './DepartDate.css';

export default function DepartDate(props) {
    const {
        time, // 显示时间
        onClick, //响应时间
    } = props;

    const h0ofDepart = h0(time);
    // time有各种变化，但是代表是同一天需要使用h0优化
    const departDateString = useMemo(() => {
        return dayjs(time).format('YYYY-MM-DD');
    },[time]);

    const departDate = new Date(h0ofDepart);

    // 表明今天标注 h0代表当前时刻
    const isToday = h0ofDepart === h0();
    // 星期显示
    const weekString = '周' 
    + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]
    + (isToday ? '(今天)': '');

    return (
    <div className="depart-date" onClick={onClick}
    >
        <input 
            type="hidden"
            name="date"
            value={departDateString}
        />
        {departDateString} 
        <span className="depart-week">
            {weekString}
        </span>
    </div>
    )
}

DepartDate.propTypes = {
 time: PropTypes.number.isRequired,
 onClick: PropTypes.func.isRequired
}
```

**common/fp**

```react
export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp);
    target.setHours(0);
    target.setSeconds(0);
    target.setMinutes(0);
    target.setMilliseconds(0);
    return target.getTime();
}
```

**引入使用Home/index.js**

```react

/**
 * 日期选择浮层
 */
const departDateCbs = useMemo(() => {
return bindActionCreators({
  onClick: showDateSelector
}, dispatch)
}, [dispatch])


<DepartDate 
    time={departDate}
    {...departDateCbs}
/>
```



### 10 日期选择浮层-搭建

- `components/DateSelector.jsx`
- 

### 11 日期选择浮层-日历组件(上)
### 12 日期选择浮层-日历组件(下)
### 13 只看高铁&动车控件
### 14 提交按钮控件



   
