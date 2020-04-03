# CodeTrain
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

### 01  Context实现跨层级的组件数据传递(包括多个Context)

**Context定义**
Context 提供了一种方式，能够让数据在组件树中传递而不必一级一级手动传递

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

### 02  静态属性ContextType访问跨层级组件的数据

### 03  Lazy与Suspense实现延迟加载

### 04  Memo实现指定组件进行渲染