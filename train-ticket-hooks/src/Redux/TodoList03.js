// TodoList
import React, { useState, useEffect, useRef, memo, useCallback} from 'react'
import './index.css';
// 替换action.creator
import {
    createSet,
    createAdd,
    createRemove,
    createToggle
} from './actions';

// 导入reducers函数
import reducer from './reducer';
/**
 * 转换函数
 */
function bindActionCreator(actionCreators, dispatch) {
    const ret = {};
    for (let key in actionCreators) {
        ret[key] = function (...args) {
            const actionCreator = actionCreators[key];
            // args对应不同参数
            const action = actionCreator(...args);
            dispatch(action);
        }
    }
}


let idSeq = Date.now();
// 输入区
const Control = memo(function Control(props) {
    const { addTodo } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        console.log(newText, 'newText')
        if (newText.length === 0) {
            return;
        }
        // 非空创建新的todo
        addTodo(
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
        toggleTodo,
        removeTodo,
    } = props;

    const onChange = () => {
        toggleTodo(id)
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
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})


// 列表区 展示待办
const Todos = memo(function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props;

    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <TodoItem
                            todo={todo}
                            removeTodo={removeTodo}
                            toggleTodo={toggleTodo}
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
    // 计数器
    const [incrementCount, setIncrementCount] = useState(0);

    // dispatch功能 关键代码
    const dispatch = useCallback(action => {
       // 状态处理结合
        const state = {
            todos,
            incrementCount,
        };

        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount,
        }

        const newState = reducer(state, action);
        // 旧值赋予新值过程
        for(let key in newState) {
            setters[key](newState[key]);
        }
}, [todos, incrementCount]);


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
        <Control
            {
            ...bindActionCreator({
                addTodo: createAdd
            }, dispatch)
            }
        />
        <Todos
            {
            ...bindActionCreator({
                removeTodo: createRemove,
                toggleTodo: createToggle
            }, dispatch)
            }
            todos={todos}
        />
    </div>
)
}

export default TodoList;