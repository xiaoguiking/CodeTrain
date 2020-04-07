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