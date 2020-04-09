

## 第六章项目重点火车票业务架构(video)

###  1.项目业务选型以及演示分析 

###   2.项目模块交互设计演示与分析 

###   3.项目工程初始化 

**项目改造**

- 移除无关代码
- 创建必要的4个页面文件
- 改写webpackconfig编译多个页面

+ src下创建 mkdir index
  - touch action.js
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



###   4.为项目搭建Mock Server 



## 第七章 项目火车篇首页

### 1数据结构设计



### 2顶部导航栏



###  3始发终到站



### 4 城市选择浮层-顶部搜索栏



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