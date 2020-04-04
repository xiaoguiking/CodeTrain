
import React, { useState } from 'react'

// import React, {Component} from 'react';
/**
 * class有状态组件写法
 */

// class StateHooks extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  
//             count: 0
//         }
//     }
//     render() { 
//         const {count} = this.state;
//         return (  
//             <div>
//             <button onClick={() => this.setState({count: count + 1 })}>Click{count}</button>
//             </div>
//         );
//     }
// }

/**
 * State 函数式组件写法
 */
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