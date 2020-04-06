import React, { useState, useRef, PureComponent, useEffect } from 'react'



class Counter extends PureComponent {
    render() {
        const { props } = this;
        return (
            <h1>{props.count}</h1>
        )
    }
}

// 自定义hooks
function useCounter(defaultValue) {
    const [count, setCount] = useState(defaultValue);
    const tmp = useRef();

    // 共享数据场景
    useEffect(() => {
         tmp.current = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000)
    }, [])

    // > = 10 停止,变量此时已经改变 
    useEffect(() => {
        if(count >= 10){
            clearInterval(tmp.current);
        }  
    })
    return [count, setCount]
}

const CustomHooks = () => {
    const [count ,setCount] = useCounter(0)

    return (
        <div>
            <button onClick={() => { setCount(count + 1) }}>
                Click: {count}
            </button>
            <Counter count={count}  />
        </div>
    )
}

export default CustomHooks;