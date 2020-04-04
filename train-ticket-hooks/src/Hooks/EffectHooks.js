
import React, { useState, useEffect } from 'react'
// import React, { Component } from 'react';

/**
 * EffectHooks有状态案例
 */

// class EffectHooks extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//             size: {
//                 height: document.documentElement.clientHeight,
//                 width: document.documentElement.clientWidth,
//             }
//         }
//     }
//     // onResize函数 类属性
//     onResize = () => {
//         this.setState({
//             size: {
//                 height: document.documentElement.clientHeight,
//                 width: document.documentElement.clientWidth,
//             }
//         })
//     }
//     componentDidMount() {
//         document.title = this.state.count;
//         window.addEventListener('resize', this.onResize, false);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.onResize, false);
//     }
//     componentDidUpdate() {
//         document.title = this.state.count;
//     }
//     render() {
//         const { count, size } = this.state
//         return (
//             <div>
//                 <button onClick={() => this.setState({ count: count + 1 })}>
//                     Click: ({count})
//                 Size: {size.height} X{size.width}
//                 </button>
//             </div>
//         );
//     }
// }



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



export default EffectHooks;
