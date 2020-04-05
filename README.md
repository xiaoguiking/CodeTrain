CodeTrain

react hooks 

- 首页
- 出票选择页
- 订单页
- 出票选择页

## 知识体系

- 创建项目
- React新特性
- react hooks
- redux
- PWA
- 业务介绍
- 实战开发

### 预备知识
- 工具类
    - node
    - npm
    - webpack
    - eslint
    - prettier

- 语法类
    - ECMA2015+ 
    - flex
    - Grid
    - JSX
- 概念类
    - spa/mpa 单页应用  
    - PWA 渐进式网络应用 1.可控的静态缓存2.离线访问能力3.优化载入速度
- 效率类
    - iconfont 图标
    - snippets 代码片段
    - 
- 原则类
    - 模块解耦
    - 优化可维护性
    - 



## 第一章

### 1.1 编译脚本
### 1.2解构编译脚本eject

> 执行yarn eject 解锁包

效果：
- 生成config 具体文件
- package.json/dependencies 增加很多文件
  

## 第二章 React 特性

  - Context
  - ContextType
  - lazy
  - Supspense
  - memo

### 1  Context实现跨层级的组件数据传递(包括多个Context)

**Context定义**
Context 提供了一种方式，能够让数据在组件树中传递而不必一级一级手动传递(注意一定把把订阅的组件包裹在其中，才可以获取到值)

> Context文档

- React.createContext
    ```js
        const MyContext = React.createContext(defaultValue);
     创建一个Context对象，当react渲染一个订阅了这个Context对象的组件，这个组件从组件树中离自身最近的那个匹配Provider中读取到当前context值
        
    只有当组件所处的数没有匹配到Provider时，其defaultValue参数默认值才会生效，
    注意：将undefined传递给Provider的value时候，消费组件的defaultValue不会生效。
    ```
- Context.Provider 生产组件
   ```js
   <MyContext.Provider value={value值}>
   生产者允许消费组件订阅context的变化
   Provider接收一个value属性值，传递给消费组件，可以使用多个Provider嵌套使用。
    注意： Provider及其内部consumer组件都不受制于shouldComponentUpdate函数，因此当consumer组件在其祖先组件退出更新情况下也能更新。
   ```
- Context.Consumer 消费者订阅
   ```js
   <MyContext.Consumer>
   {value => 基于context值进行渲染}
   </MyContext.Consumer>
   ```




> 生产者爷爷级  动态实现数据

```js
import React, {Component, createContext} from 'react';
const BatteryContext = createContext();
const OnlineContext = createContext();

class App extends Component {
        state = {
        battery: 60,
        online: false
    };
    render(){
        const { battery, online } = this.state;
    return (  
      <BatteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
      <button onClick={()=> this.setState({battery: battery -1})}>
      Press
      </button>
      <button onClick={()=> this.setState({online: !online})}>
      Switch
      </button>
      <Middle />
       </OnlineContext.Provider>
      </BatteryContext.Provider>
      );
    }
}
```
> 中间级 父级

```js
class Middle extends Component {
    render() {
        return (
            <Leaf />
        )
    }
}
```
> 消费者 孙子级  消费者包裹一个函数  加入动态效果

```js
class Leaf extends Component {
    render () {
        return (
            <BatteryContext.Consumer>
            {
                battery => (
                    <OnlineContext.COnsumer>
                    { online => <h1>Battery: {battery}, Online: {String(online)}</h1>}
                    </OnlineContext.COnsumer>
                )
            }
            </BatteryContext.Consumer>
        )
    }
}
```

> 页面效果展示  Battery： 60



### 2  静态属性ContextType访问跨层级组件的数据

> 改造Leaf 组件使用静态属性

eg:
```js
class Leaf extends Component {
    static contextType = BatteryContext;
    render(){
        const battery = this.context;
        return (
            <h1>Battery: {battery}</h1>
        )
    }
}
```



### 3  Lazy与Suspense实现延迟加载

+ 途径
  - Webpack - code splitting
  - import（ import ('./about.js').then(code)）
- 改写`App.js`
    ```js
    import React, { Component, lazy } from 'react';
// import logo from './logo.svg';
import './App.css';
    // 异步引入关键code
    const About = lazy(() => import('./About.jsx'));
    
    class App extends Component {
      render() { 
        return ( 
          <div>
          <About />
          </div>
         );
      }
    }
    
    export default App;
    
    

    ```

- 建立一个About.jsx文件
    ```js
    import React, {Component} from 'react'
    export default class About extends Component {
    render() { 
        return ( <h1>About</h1> );
    	}
    }
    ```




- Error
    ```js
    A React component suspended while rendering, but no fallback UI was specified
    是因为Suspens组件里面需要加入对应的UI状态
    ```
- 引入Suspense修改
    ```js
    // 异步引入自定义webpack名字
      const About = lazy(() => import(/*webpackChunkName:'about'*/'./About.jsx'));
  class App extends Component {
        render() { 
          return ( 
            <div>
            <Suspense fallback={<div>loading</div>}>
            <About />
            </Suspense>
            </div>
           );
        }
      }
  ```
- 捕获加载错误
  ```js
  ErrorBoundary +  componentDidCatch

    import React, { Component, lazy, Suspense } from 'react';
	// import logo from './logo.svg';
	import './App.css';
	// 异步引入自定义webpack名字
const About = lazy(() => import(/*webpackChunkName:'about'*/'./About.jsx'));
// 手动捕获错误方式 ErrorBoundary + componentDidCatch
  class App extends Component {
  
      state = { hasError: false };
  
    // 捕获错误第一种
    // componentDidCatch() {
    //   this.setState({
    //     hasError: true
    //   })
    // }
  
    // 第二种捕获静态方法
    static getDerivedStateFormError(error){
      return {
        hasError: true
      }
    };
  
    render() {
      if (this.state.hasError) {
        return (<div>error</div>)
      }
      return (
        <div>
          <Suspense fallback={<div>loading</div>}><About /></Suspense>
        </div>
    );
    }
  }
  
  export default App;
  ```

###  4.React.Memo 实现指定组件渲染 性能优化

| 数据                 | 视图              |
| -------------------- | ----------------- |
| {data: 1}            | <div>1</div>      |
| {data: 2}            | <div>1</div> 报错 |
| 通过render {data: 2} | <div>2</div>      |

  ```js

**优化典型模板**
    
import React, { Component } from 'react';


class Foo extends Component {
  render() {
    console.log('Foo render');
    return null;
  }
}

class App extends Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <button type="button"
          onClick={() => { this.setState({ count: this.state.count + 1 }) }}>
          Button
      </button>
        <Foo name="nike" />
      </div>
    );
  }
}

export default App;


性能问题：  Foo组件多次渲染
  ```

- shouldComponentUpdate(nextProps, nextState)

  ```js
  
  class Foo extends Component {
    shouldComponentUpdate(nextProps, nextState){
      if(nextProps.name === this.props.name){
          return false;
          // 不会渲染
      }
      return true;
    }
    render() {
      console.log('Foo render');
      return null;
    }
  }
  ```

- PureComponent  局限性 传入属性本身对比， 属性内部不行，浅比较  ( 当 props 或者 state 某种程度是可变的话 )

  正确修改案例

  ​	

  ```js
  import React, {PureComponent} from 'react';
  class Foo extends PureComponent {
      render(){
          console.log('Foo render');
          return null;
      }
  }
  ```

  

  正确渲染案例01

  ​	

  ```js
  import React, { Component, PureComponent } from 'react';
  
  
  class Foo extends PureComponent { // 只有Props第一级发生改变才会重新渲染
    render() {
      console.log('Foo render');
      return <div>{this.props.person.age}</div>;
    }
  }
  
  class App extends Component {
    state = {
      count: 0,
      person: {
        age: 1
      },
    };
    render() {
      const person = this.state.person;
      return (
        <div>
          <button type="button"
            onClick={() => {
                person.age++;
                this.setState({ person, });
            }}
          >
            Button
          </button>
          <Foo person={person} />
        </div>
      );
    }
  }
  
  export default App;
  
  ```

  PureComponent 案例陷阱 回调 --- 解决方案有性能开销

  ​	

  ```js
  import React, { Component, PureComponent } from 'react';
  
  
  class Foo extends PureComponent {
    render() {
      console.log('Foo render');
      return <div>{this.props.person.age}</div>;
    }
  }
  
  
  
  class App extends Component {
    state = {
      count: 0,
      person: {
        age: 1
      },
    };
  
  // 解决回调
  callback = () => {
      
  };
    render() {
      const person = this.state.person;
      return (
        <div>
          <button type="button"
            onClick={() => {
                person.age++;
                this.setState({count: this.state.count + 1});
            }}
          >
            Button
          </button>
          <Foo person={person} cb={() => {}} />   // 回调多次渲染
     		<Foo person={person} cb={this.callback} />   // 回调多次渲染 修改
        </div>
      );
    }
  }
  
  export default App;
  
  ```

  

- Memo 无状态组件性能优化

  ```js
  import React,{memo} from 'react';
  
  // 无状态组件
  const Foo = memo(function Foo(props){
      console.log('Foo render');
      return (
      	<div>{props.person.age}</div>
      )
  })
  
  // 
  class App extends Component {
    state = {
      count: 0,
      person: {
        age: 1
      },
    };
  
  // 解决回调
  callback = () => {
  	//other code  
  };
    render() {
      const person = this.state.person;
      return (
        <div>
          <button type="button"
            onClick={() => {
                person.age++;
                this.setState({count: this.state.count + 1});
            }}
          >
            Button
          </button>
          <Foo person={person} cb={() => {}} />   // 回调多次渲染
     		<Foo person={person} cb={this.callback} />   // 回调多次渲染 修改
        </div>
      );
    }
  }
  
  export default App;
  ```

  

##  第三章 ReactHooks  16.8

###  1.React Hooks的概念与意义 

**类组件不足**

- 状态逻辑复用难
  	-  缺少复用机制
  	-  渲染属性和高阶组件导致层级冗余
- 趋向复杂难以维护
  - 生命周期函数不明确
- this指向困扰
  - 内联函数过渡创建新句柄
  - 类成员函数不能保证this

**Hooks优势**

- 函数组件无this指向问题
- 自定义hooks方便复用状态逻辑
- 副作用的关注点分离

### 2.使用State Hooks 

**Class有状态组件**

```js
import React, {Component} from 'react';
class StateHooks extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            count: 0
        }
    }
    render() { 
        const {count} = this.state;
        return (  
            <div>
            <button onClick={() => this.setState({count: count + 1 })}>Click{count}</button>
            </div>
        );
    }
}
```

**函数式组件**

- useState 需要按照固定的顺序被调用
-  `useState()` 方法里面唯一的参数就是初始 state 
-  **`useState` 方法的返回值是什么？** 返回值为：当前 state 以及更新 state 的函数 

```js
import React, { useState } from 'react'
function StateHooks() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click{count}</button>
        </div>
    )
}
```

**函数式更新**

```js
function StateHooks(props) {
    // 函数式更新
    const [count, setCount] = useState(() => {
        console.log('init');
        return props.defaultValue || 0 ;
    });
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click{count}</button>
        </div>
    )
}
export default StateHooks;
```



###  3.使用Effect Hooks （对应了挂载  更新  ，卸载三个生命周期）

**副作用**

- 绑定事件
- 网络请求
- 访问DOM

**副作用时机**

- Mount之后
- Udate之后
- Unmount之前



```js
import React, { Component } from 'react';

/**
 * EffectHooks有状态案例
 */

class EffectHooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            size: {
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth,
            }
        }
    }
    // onResize函数 类属性
    onResize = () => {
        this.setState({
            size: {
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth,
            }
        })
    }
    componentDidMount() {
        document.title = this.state.count;
        window.addEventListener('resize', this.onResize, false);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }
    componentDidUpdate() {
        document.title = this.state.count;
    }
    render() {
        const { count, size } = this.state
        return (
            <div>
                <button onClick={() => this.setState({ count: count + 1 })}>
                    Click: ({count})
                Size: {size.height} X{size.width}
                </button>
            </div>
        );
    }
}
```



```js
/**
 * 函数式EffectHooks
 */

const EffectHooks = () => {
    const [count, setCount] = useState(0);
    const [size, setResize] = useState({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
    })
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log(document.title);
    })

    const onResize = () => {
        setResize({
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
    })

    useEffect(() => {
        window.removeEventListener('resize', onResize, false);
        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    }, [])

    return (
        <div>
            <button onClick={() => { setCount(count + 1) }}>
                Click: ({count})
                size: {size.width} × {size.height}
            </button>
        </div>
    )
}

```



**追踪dom元素**

```js
const EffectHooks = () => {
    const [count, setCount] = useState(0);
    const [size, setResize] = useState({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
    })
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log(document.title);
    })

    const onResize = () => {
        setResize({
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
    })

    useEffect(() => {
        window.removeEventListener('resize', onResize, false);
        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    }, [])

    // 关于追踪dom元素
    const onClick = () => {
        console.log('dom');
    }
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick, false);
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick, false);
        }
    })
    return (
        <div>
            <button onClick={() => { setCount(count + 1) }}>
                Click: ({count})
                size: {size.width} × {size.height}
            </button>
            {
                count%2
                ? <span id="size">size: {size.width} × {size.height}</span>:
                <p id="size">size: {size.width} × {size.height}</p>
            }
        </div>
    )
}
```



###  4.Context Hooks 	

```js
import React, { Component, createContext, useState, useContext } from 'react'

const CountContext = createContext();
// 组件包裹形式
class Foo extends Component {
    render() { 
        return ( 
            <CountContext.Consumer>
            {
                count => <h1>{count}</h1>
            }
            </CountContext.Consumer>
         );
    }
}
 
// 使用静态方法
class Bar extends Component {
    static contextType = CountContext;
    render() { 
        const count = this.context;
        console.log(count);
        return ( 
            <h1>{count}</h1>
         );
    }
}

//  Context函数式
function Counter () {
    const count = useContext(CountContext)  
    return (
        <h1>{count}</h1>
    )
}
const ContextHooks = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => {setCount(count + 1 )}}>
                Click {count}
            </button>
            <CountContext.Provider value={count}>
                <Foo />
                <Bar />
                <Counter />
            </CountContext.Provider>
        </div>
    )
}


export default ContextHooks;
```



### 5.使用Memo&Callback Hooks 

###  6.使用Ref Hooks 	

### 7.自定义Hooks 

###   8.Hooks的使用法则 

### 9Hooks的常见问题 



## 第四章 Redux

###  React Redux的概念与意义 

###  没有Redux的世界 

###  Dispatch与Action 

###  使用Reducer拆解数据更新 

###   异步Action 



##  第五章 渐进式Web App

### PWA简介 

###  服务工作线程：Service Worker 

### 承诺”控制流：Promise 

###  更优雅的请求：fetch 

### 资源的缓存系统：Cache API 

### 消息推送：Notification API 

###  如何在项目中开启PWA 



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

- 搜索entry----定义在paths.js

- 修改paths.js

  ```js
    appHtml: resolveApp('public/index.html'),
    appQueryHtml: resolveApp('public/Query.html'),
    appOrderHtml: resolveApp('public/Order.html'),
    appTicketHtml: resolveApp('public/ticket.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index/index'),
    appQueryJs: resolveModule(resolveApp, 'src/query/index'),
    appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),
    appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  ```

  



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