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
            <Counter count={double} onClick={onClick}/> 
        </div>
    )
}

export default MemoHooks;
