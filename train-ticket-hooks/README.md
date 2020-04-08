


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

**useMemo**

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

返回一个 memoized 值。

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
```

```react
import React, { useState, useMemo } from 'react'

function Counter(props) {
    return (
        <h1>{props.count}</h1>
    )
}

const MemoHooks = () => {
    const [count, setCount] = useState(0)

    // useMemo性能优化 返回一个值
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3 ])
    // 当 count 为 3 时候， double 渲染为6
    // 当count为4时， double 渲染为8，从此不变

    const half = useMemo(() => {
        return double / 4;
    }, [double])   

    return (
        <div>
            <button onClick={()=> {setCount(count + 1 )}}>
                Click: {count}, double: {double}, half: {half}
            </button>
            <Counter count={count}/> 
        </div>
    )
}

export default MemoHooks;

```

> useCallback(fn, deps)  === useMemo(() => fn, deps)

**useCallback**

```js

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
返回一个 memoized 回调函数。
```

```react
import React, { useState, useMemo, memo, useCallback } from 'react'



const Counter = memo(function Counter(props) {
    console.log('Counter render');
    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    )
})

const MemoHooks = () => {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    // useMemo性能优化 返回一个值
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3 ])
    // 当 count 为 3 时候， double 渲染为6
    // 当count为4时， double 渲染为8，从此不变

    // Counter会多次渲染变化
    // const onClick = () => {
    //     console.log('onClick');
    // }

    // useMemo优化 第一种
    // const onClick = useMemo( () => {
    //     return () => {
    //         console.log('click');
    //     } 
    // },[])
    
    // useCallback第二种  返回一个函数
    const onClick = useCallback(() => {
        console.log('click');
        // setClickCount(clickCount + 1); //需要加入依赖 clickCount
        setClickCount((clickCount) => clickCount + 1 )
    },[])

    /**
     * 等价关系
     * useMemo(() => fn) = useCallback(fn)
     */
    return (
        <div>
            <button onClick={()=> {setCount(count + 1 )}}>
                Click: {count}, double: {double} , {clickCount}
            </button>
            <Counter count={double} onclick={onClick}/> 
        </div>
    )
}

export default MemoHooks;

```

###  6.使用Ref Hooks 	

| class        | Hooks                     |
| ------------ | ------------------------- |
| string Ref   | useRef                    |
| Callback Ref | 获取子组件或者DOM节点句柄 |
| CreateRef    | 渲染周期之间共享数据存储  |
|              |                           |

 `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。 

- 获取子组件或者dom 节点

  ```react
  import React, { useState, useMemo, memo, useCallback, useRef, PureComponent } from 'react'
  
  
  // const Counter = memo(function Counter(props) {
  //     console.log('Counter render');
  //     return (
  //         <h1 onClick={props.onClick}>{props.count}</h1>
  //     )
  // })
  
  // 关键代码，需要使用类组件
  class Counter extends PureComponent {
      render(){
          const {props} = this;
          return (
              <h1  onClick={props.onClick}>{props.count}</h1>
          )
      }
  }
  
  const RefHooks = (props) => {
      const [count, setCount] = useState(0);
      const [clickCount, setClickCount] = useState(0);
      const counterRef = useRef();
  
      // useMemo性能优化 返回一个值
      const double = useMemo(() => {
          return count * 2;
      }, [count === 3])
  
  
      // useCallback第二种  返回一个函数
      const onClick = useCallback(() => {
          console.log('click');
          // setClickCount(clickCount + 1); //需要加入依赖 clickCount
          setClickCount((clickCount) => clickCount + 1)
          console.log(counterRef.current, 'current');
      }, [counterRef.current])
  
      return (
          <div>
              <button onClick={() => { setCount(count + 1) }}>
                  Click: {count}, double: {double} , {clickCount}
              </button>
              // 关键代码
              <Counter count={double} onClick={onClick} ref={counterRef} />
          </div>
      )
  }
  
  export default RefHooks;
  
  
  打印： 
  
  RefHooks.js:36 Counter {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …} "current"	
  ```

  - 渲染周期之间共享数据存储

    场景描述： 组件挂载count 每秒 + 1 ，到 > = 10之后, 不再增加

    使用 tmp.current 保存了 数据， 返回同一个 ref 对象 

    ```react
    import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'
    
    
    class Counter extends PureComponent {
        speak() {
            console.log(`you clicked ${this.props.count}`);
        }
        render(){
            const {props} = this;
            return (
                <h1  onClick={props.onClick}>{props.count}</h1>
            )
        }
    }
    
    const RefHooks = (props) => {
        const [count, setCount] = useState(0);
        const [clickCount, setClickCount] = useState(0);
        const counterRef = useRef();
        const tmp = useRef();
        // useMemo性能优化 返回一个值
        const double = useMemo(() => {
            return count * 2;
        }, [count === 3])
    
    
        // useCallback第二种  返回一个函数
        const onClick = useCallback(() => {
            console.log('click');
            // setClickCount(clickCount + 1); //需要加入依赖 clickCount
            setClickCount((clickCount) => clickCount + 1)
            console.log(counterRef.current, 'current');
            counterRef.current.speak();
        }, [counterRef.current])
    
        // 共享数据场景  关键代码
        useEffect(() => {
             tmp.current = setInterval(() => {
                setCount((count) => count + 1);
            }, 1000)
        }, [])
    
        // > = 10 停止,变量此时已经改变,关键代码
        useEffect(() => {
            if(count >= 10){
                clearInterval(tmp.current);
            }  
        })
        return (
            <div>
                <button onClick={() => { setCount(count + 1) }}>
                    Click: {count}, double: {double} , {clickCount}
                </button>
                <Counter count={double} onClick={onClick} ref={counterRef} />
            </div>
        )
    }
    
    export default RefHooks;
    ```

    



### 7.自定义Hooks  复用逻辑 Custorm Hooks

> 自定义hooks  必须是 useXXX

**自定义hooks useCounter**

```react
import React, { useState, useRef, PureComponent, useEffect } from 'react'
class Counter extends PrueComponent {
    render() {
        const {props} = this;
        return (
        	<div>{props.count}</div>
        )
    }
}

// 封装自定义hooks useCounter
function useCounter(defaultValue){
    const [count, setCount] = useState(defaultValue);
    const tmp = useRef();
    
    // 共享数据场景
    useEffect(() => {
        tmp.current = setInterval( () => {
            setCount(count => count + 1 );
        }, 1000)
    }, [])
    // 10s 自动停止
    useEffect(() => {
        if(count >= 10){
            clearInterval(tmp.current);
        }  
    })
    return [count, setCount]
}
const CustomHooks = () => {
	//引入自定义hooks useCounter
	const [count, setCount] = useCounter(0);
	return (
	<div>
		<button onClick={() => setCount(count + 1 )}>Click{count}</button>
            <Couter count={count} />
	</div>
	)
}
```

- 自定义hooks  useSize

  ```react
  import React, { useState, useRef, useEffect, useCallback } from 'react'
  
  
  // 自定义hooks useCount
  function useCount(count) {
      <h1>{count}</h1>
  }
  
  // 自定义hooks  useCounter
  function useCounter(defaultValue) {
      const [count, setCount] = useState(0);
      const tmp = useRef();
  
      // 共享数据场景
      useEffect(() => {
          tmp.current = setInterval(() => {
              setCount((count) => count + 1);
          }, 1000)
      }, [])
  
      // > = 10 停止,变量此时已经改变 
      useEffect(() => {
          if (count >= 10) {
              clearInterval(tmp.current);
          }
      })
      return [count, setCount]
  }
  
  // 自定义hooks 窗口大小  useSize
  function useSize() {
      const [size, setSize] = useState({
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
      })
      
      const onResize = useCallback( () => {
          setSize({
                width: document.documentElement.clientWidth,
          	  height: document.documentElement.clientHeight,
          })
      },[])
      
      useEffect(() => {
          window.addEventListener('resize', onResize, false)
          
          return () => {
              window.removeEventListener('resize', onResize, false);
          }
      },[])
      return size;
  }
  
  const CustomHooks01 = () => {
      const [count, setCount] = useCounter(0)
      const size = useSize();
      const Count = useCount(count) // 使用jsx渲染
      return (
      <div>
       	<button onClick={setCount(count + 1)}>
           	click: {count}
              Size:  Size:{size.height} × {size.width}
           </button>
           jsx渲染 {Count}
       </div>
      )
  }
  ```

  

###   8.Hooks的使用法则 

- 在最顶层调用hooks模式

- 函数组件或者自定义hooks中调用

  

### 9.Hooks的常见问题 

- 对传统React编程影响

  - 声明周期如何映射到Hooks

    ```react
    constructor ---------------  useState
    shouldComponentUpdate  ----  memo
    componentDidMount componentWillUnmout   componentDidUpdate   useEffect 		
    
    ```

   - 类实例成员变量如何映射到Hooks
  
   - Hooks中如何获取历史props和state
  
  ```react
  function Couter(){
      const[count, setCount] = useState(0);
      const prevCountRef = useRef();
      useEffect(() => {
          prevCountRef.current = count;
      });
      const prevCount = prevCountRef.current;
      return (<div>Now:{count} before: {prevent}</div>)
  }
  ```
  
  - 强制更新一个Hooks组件
  
    ```react
    function Couter(){
        const[count, setCount] = useState(0);
        const [updater, setUpdater] = useState(0);
        funtion forceUpdate() {
            setUpdater((updater) => updater + 1 )
        }
        const prevCountRef = useRef();
        useEffect(() => {
            prevCountRef.current = count;
        });
        const prevCount = prevCountRef.current;
        return (<div>Now:{count} before: {prevent}</div>)
    }
    ```
  
    

## 第四章 Redux

###  1.React Redux的概念与意义 

> Redux体现的是可控，可依赖、可追溯的数据流管理（状态容器与数据流管理）

**Redux**

- 单一数据源
- 状态不可变
- 纯函数修改状态

###  2.没有Redux的世界  TodoList

 #### 构建视图

- TodoList 全局展示
- Todos 列表区 展示待办
- Control 输入区

```react
import React，{useState, useEffect, useCallback, useRef, memo} from 'react';
import './index.css';

//输入区
function Control (props) {
   
    return (
        <div className="control">
            Control
        </div>
    )
}

// 列表区 展示待办
function Todos(props){
    const { todos, removeTodo, toggleTodo } = props;

    return (
        <ul>
           Todos
        </ul>
    )
}

// 全局展示
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    return (
    	<div>
        	<Control />
            <Todos />
        </div>
    )
}

export default TodoList;
```

```react
// 全局展示 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    
   // 添加todo
    const addTodo = useCallback((todo) =>{
        setTodos((todos => [...todos, todo]))
    },[])
   // 删除todo
    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter(todo => {
            return todo.id !== id;
        }))
    },[])
   // 切换待办状态
    const toggleTodo = useCallback( (id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id
            ? {
                ...todo,
                complete: !todo.complete
            }
            : todo;
        }))
    },[])
    return (
    <div>
    	<Control addTodo={addTodo}
         <Todos 
          	removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            todos={todos}
          />
    </div>
    )
}
```



```react
// 列表区组件
const TodoItem = meme(function TodoItem(props){
    const {
        todo: {
            id,
            text,
            complete
        },
        toggleTodo,
        removeTodo
    } = props;
    
    const onChange = () => {
        toggleTodo(id);
    }
    
    const onRemove = () => {
        removeTodo(id);
    }
    return (
    	<li className="todo-item">
        	<input 
             	type="checkbox"
                onChange={onChange}
                checked={complete}
             />
             <label className={complete ? 'complete': ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
});


// 列表区 展示 待办 
const Todos = memo(function Todos(props){
    const {todos, removeTodo, toggleTodo} = props;
    return (
    	<ul>
        	{
                todos.map(todo => {
                    return (
                    	<TodoItem 
                         	todo={todo}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            key={todo.id}
                         />
                    )
                })
            }
        </ul>
    )
})

```



###  3.Dispatch与Action 

```js
纯对象表示更新操作
// 整个对象成为Action
{
    type: 'add',
    payload: todo
}
```

```js
中间函数
const dispatch = (action) 
```
#### Todolist.js 加入dispatch第一次改写

````react

// TodoList
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import './index.css';

let idSeq = Date.now();
// 输入区
const Control = memo(function Control (props) {
    const { dispatch } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        console.log(newText, 'newText')
        if(newText.length === 0) {
            return;
        }
        // 非空创建新的todo
        dispatch({
            type: 'add',
            payload: {
                id: ++idSeq,
                text: newText,
                complete: false,
            }
        })
        inputRef.current.value = '';
    }
    return (
        <div className="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    ref={inputRef}
                    className="new-todo"
                    placeholder="to be done?"
                />
            </form>
        </div>
    )
})

// TodoItem 组件
const TodoItem = memo(function TodoItem(props) {
    const {
        todo: {
            id,
            text,
            complete
        },
        dispatch
    } = props;

    const onChange = () => {
        dispatch({type:'toggle', payload: id})
    }

    const onRemove = () => {
        dispatch({type: 'remove', payload: id});
    }

    return (
        <li className="todo-item">
            <input 
                type="checkbox"
                onChange={onChange} 
                checked={complete}
            />
            <label className={complete ? 'complete': ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})


// 列表区 展示待办
const Todos = memo(function Todos(props){
    const { todos, dispatch } = props;

    return (
        <ul>
            {
                todos.map(todo => {
                    return ( 
                        <TodoItem 
                            todo={todo}
                            dispatch={dispatch}
                            key={todo.id}
                        />)
                })
            }
        </ul>
    )
})

//  定义常量
const LS_KEY = '$todos';
const TodoList =  ()  =>  {
    const [todos, setTodos] = useState([]);

    // dispatch功能 统一更新数据
    const dispatch = useCallback(action => {
        const {type, payload} = action;
        switch (type) {
            case 'set':
                // 新数组
                setTodos(payload);
                break;
            case 'add':
                // 新对象
                setTodos(todos => [...todos, payload])
                break;
            case 'remove':
                // 新id
                setTodos(todos => todos.filter(todo => {
                    return todo.id !== payload;
                }));
                break;
            case 'toggle':
                 setTodos(todos => todos.map(todo => {
                     return todo.id === payload
                     ? {
                         ...todo,
                        complete: !todo.complete,
                     }:
                     todo;
                 }))
                break;
            default:
                
        }
    },[]);   


    // 通过localStorage实现起始上次数据便显示出来
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY || '[]'));
        dispatch({type: 'set', payload: todos});
     },[dispatch])

    // 通过localStorage保存数据
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos])


    return (
        <div className="todo-list">
            <Control dispatch={dispatch} />
            <Todos 
                dispatch={dispatch} 
                todos={todos}
            />
        </div>
    ) 
}

export default TodoList;
````

####  配合actions.js 第二次改写

```react
// TodoList
import React, { useState, useEffect, useRef, memo } from 'react'
import './index.css';
// 替换action.creator
import {
    createSet,
    createAdd,
    createRemove,
    createToggle
} from './actions';


let idSeq = Date.now();
// 输入区
const Control = memo(function Control(props) {
    const { dispatch } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        console.log(newText, 'newText')
        if (newText.length === 0) {
            return;
        }
        // 非空创建新的todo
        dispatch(
            createAdd({
                id: ++idSeq,
                text: newText,
                complete: false,
            }))
        inputRef.current.value = '';
    }
    return (
        <div className="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    className="new-todo"
                    placeholder="to be done?"
                />
            </form>
        </div>
    )
})

// TodoItem 组件
const TodoItem = memo(function TodoItem(props) {
    const {
        todo: {
            id,
            text,
            complete
        },
        dispatch
    } = props;

    const onChange = () => {
        dispatch(createToggle(id))
    }

    const onRemove = () => {
        dispatch(createRemove(id));
    }

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})


// 列表区 展示待办
const Todos = memo(function Todos(props) {
    const { todos, dispatch } = props;

    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <TodoItem
                            todo={todo}
                            dispatch={dispatch}
                            key={todo.id}
                        />)
                })
            }
        </ul>
    )
})

//  定义常量
const LS_KEY = '$todos';
const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // dispatch功能
    const dispatch = action => {
        const { type, payload } = action;
        switch (type) {
            case 'set':
                // 新数组
                setTodos(payload);
                break;
            case 'add':
                // 新对象
                setTodos(todos => [...todos, payload])
                break;
            case 'remove':
                // 新id
                setTodos(todos => todos.filter(todo => {
                    return todo.id !== payload;
                }));
                break;
            case 'toggle':
                setTodos(todos => todos.map(todo => {
                    return todo.id === payload
                        ? {
                            ...todo,
                            complete: !todo.complete,
                        } :
                        todo;
                }))
                break;
            default:

        }
    }


    // 通过localStorage实现起始上次数据便显示出来
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY || '[]'));
        dispatch(createSet(todos));
    }, [])

    // 通过localStorage保存数据
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos])


    return (
        <div className="todo-list">
            <Control dispatch={dispatch} />
            <Todos
                dispatch={dispatch}
                todos={todos}
            />
        </div>
    )
}

export default TodoList;
```

**actions.js**

```react
export function createSet(payload) {
    return {
        type: 'set',
        payload
    }
}

export function createAdd(payload) {
    return {
        type: 'add',
        payload
    }
}

export function createRemove(payload) {
    return {
        type: 'remove',
        payload
    }
}

export function createToggle(payload) {
    return {
        type: 'toggle',
        payload
    }
}
```

#### 第三次改写

###  4.使用Reducer拆解数据更新  bug

`Redux/reducer.js`

````react

````





###   5.异步Action  bug



##  第五章 渐进式Web App ProgressiveWeb App

### 1.PWA简介 

**PWA组成技术**

- Service Worker

  - 服务工作线程
    - 常驻内存运行
    - 代理网络请求
    - 依赖HTTPS

- Promise 承诺限制流

  - 优化回调地狱
  - async/await 语法同步化
  - service worker Ap风格

- fetch 

  - 比XMLHTTPRequest更简洁

  - Promise 风格

    ````js
    fetch('/rest/use')
    .then(res => res.json)
    .then(info => )
    ````

- cache Api 支持资源的缓存系统

  - 缓存资源 css/scripts/image
  - 依赖service worker 代理网络请求
  - 支持离线程序运行

- Notification Api

  - 依赖用户授权
  - 适合在service work中推送



###  2.服务工作线程：Service Worker



### 3.承诺”控制流：Promise 



###  4.更优雅的请求：fetch 



### 5.资源的缓存系统：Cache API 



### 6.消息推送：Notification API 



###  7.如何在项目中开启PWA 



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