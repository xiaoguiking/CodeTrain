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
