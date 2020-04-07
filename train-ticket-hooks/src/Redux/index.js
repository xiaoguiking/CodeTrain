// TodoList
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import './index.css';

let idSeq = Date.now();
// 输入区
const Control = memo(function Control (props) {
    const { addTodo } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        console.log(newText, 'newText')
        if(newText.length === 0) {
            return;
        }
        // 非空创建新的todo
        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
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
        toggleTodo,
        removeTodo,
    } = props;

    const onChange = () => {
        toggleTodo(id);
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
            <label className={complete ? 'complete': ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})


// 列表区 展示待办
const Todos = memo(function Todos(props){
    const { todos, removeTodo, toggleTodo } = props;

    return (
        <ul>
            {
                todos.map(todo => {
                    return ( <TodoItem 
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
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

    // 需要传递到子组件优化性能 useCallback包裹
    // 添加todo
    const addTodo = useCallback(todo => {
        setTodos(todos => [...todos, todo])
    }, []);

    // 删除todo
    const removeTodo = useCallback(id => {
       setTodos(todos => todos.filter(todo => {
           return todo.id !== id;
       }))
    },[]);

    // 切换待办状态
    const toggleTodo = useCallback(id => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id
            ? {
                ...todo,
                complete: !todo.complete
            } 
            : todo;
        }))
    }, []);

    // 通过localStorage实现起始上次数据便显示出来
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY || '[]'));
        setTodos(todos);
     },[])

    // 通过localStorage保存数据
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos])


    return (
        <div className="todo-list">
            <Control addTodo={addTodo} />
            <Todos 
                removeTodo={removeTodo} 
                toggleTodo={toggleTodo} 
                todos={todos}
            />
        </div>
    ) 
}

export default TodoList;