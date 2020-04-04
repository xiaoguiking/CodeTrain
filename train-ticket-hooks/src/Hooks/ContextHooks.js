import React, { Component, createContext, useState, useContext } from 'react'

const CountContext = createContext();
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