/**
 * 接收当前的数据state,action, 返回一个新的state
 * state 所有数据构成的对象
 * action 
 */

// 合并参数 combineReducers
function combineReducers(reducers){
    return function reducer (state, action) {
        const changed = {};
        for(let key in reducers){
            changed[key] = reducers[key](state[key], action);
        }
        return {
            ...state,
            ...changed,
        };
    };
}


const reducers = {
    todos(state, action) {
        const { type, payload } = action;

        switch (type) {
            case 'set':
                return payload;
            case 'add':
                return [...state, payload];
            case 'remove':
                return state.filter(todo => {
                    return todo.id !== payload;
                });
            case 'toggle':
                return state.map(todo => {
                    return todo.id === payload
                        ? {
                            ...todo,
                            complete: !todo.complete
                        } : todo
                });
        }
        return state;
    },
    incrementCount(state, action) {
        const { type } = action;
        switch(type){
            case 'set':
            case 'add':
                return state + 1;
        }
        return state;
    },
};

// function reducer(state, action) {
//     const { type, payload } = action;
//     const { todos, incrementCount } = state;
//     switch (type) {
//         case 'set':  
//             return {
//                 ...state,
//                 todos: payload,
//                 incrementCount: incrementCount + 1
//             };
//         case 'add':
//             return {
//                 ...state,
//                 todos: [...todos, payload],
//                 incrementCount: incrementCount + 1
//             };
//         case 'remove':
//             return {
//                 ...state,
//                 todos: todos.filter(todo => {
//                     return todo.id !== payload;
//                 }),
//             }
//         case 'toggle':
//             return {
//                 ...state,
//                 todos: todos.map(todo => {
//                     return todo.id === payload
//                         ? {
//                             ...todo,
//                             complete: !todo.complete
//                         } : todo
//                 })
//             }
//     }
// }
// 拆分reducers
// const reducer = combineReducers(reducers);

export default combineReducers(reducers);