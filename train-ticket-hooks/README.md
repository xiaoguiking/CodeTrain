

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
              type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
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





### 5 城市选择浮层-城市的异步加载
### 6 城市选择浮层-渲染城市列表
### 7 城市选择浮层-字母快速定位
### 8 城市选择浮层-搜索建议
### 9 出发日期控件
### 10 日期选择浮层-搭建
### 11 日期选择浮层-日历组件(上)
### 12 日期选择浮层-日历组件(下)
### 13 只看高铁&动车控件
### 14 提交按钮控件



   
