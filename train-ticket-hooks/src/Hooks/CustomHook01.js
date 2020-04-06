import React, { useState, useRef, useEffect, useCallback } from 'react'


// 自定义获取窗口大小 useSize
function useSize(){
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = useCallback( () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight, 
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize, false);

        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    },[onResize])
        return size;
}


// 自定义hooks
function useCount(count) {
    return (
        <h1>{count}</h1>
    )
}

// 自定义hooks
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

const CustomHooks01 = () => {
    // 自定义useCounter
    const [count, setCount] = useCounter(0)
    // 自定义useCount
    const Count = useCount(count); // 返回的是一个jsx 页面写成{Count}

    const size = useSize();

    return (
        <div>
            <button onClick={() => { setCount(count + 1) }}>
                Click: {count} 
            </button>
            Size:{size.height} × {size.width}
           {Count }
        </div>
    )
}

export default CustomHooks01;