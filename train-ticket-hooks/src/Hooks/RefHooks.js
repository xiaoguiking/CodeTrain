import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'


// const Counter = memo(function Counter(props) {
//     console.log('Counter render');
//     return (
//         <h1 onClick={props.onClick}>{props.count}</h1>
//     )
// })

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