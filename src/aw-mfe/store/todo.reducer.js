
const initialState = {
    todos: {},
  /* todo item : 
    { 
        id,
        notes,
        title,
        createdAt,
        modifiedAt,
        lastNotificationTime,
        deadline,
        notify,
        notificationCount: 0,
        inRecentList: false
    }
  */
}

export default function todoAppReducer(state = initialState, action) {
    if (!action.type) return state;
    switch(action.type) {
        case 'INIT': {
            return { todos: action.payload }
        }
        case 'ADD_TODO':{
            const { payload } = action;
            const { todo } = payload;
            return {
                ...state,
                todos: {[todo.id]:todo, ...state.todos},
            }
        }
        
        case 'UPDATE_TODO': {
            const { id, changes } = action.payload;
            state.todos[id] = { ...state.todos[id], ...changes }; 
            return { ...state, todos: {...state.todos}};
        }
        
        case 'DELETE_TODO':{
            const { id } = action.payload;
            const todos = { ...state.todos };
            delete todos[id];
            return { ...state, todos };
        }
        case 'INCREAMENT_NOTIFICATION_COUNT': {
            const { id } = action.payload;
            state.todos[id] = { ...state.todos[id], notificationCount: state.todos[id].notificationCount + 1 }; 
            return { ...state, todos: {...state.todos}};
        }
        case 'DECREAMENT_NOTIFICATION_COUNT': {
            const { id } = action.payload;
            state.todos[id] = { ...state.todos[id], notificationCount: stayPositive(state.todos[id].notificationCount - 1) }; 
            return { ...state, todos: {...state.todos}};
        }

        default:
            return state; 
    }
}

function stayPositive(number) {
    return number < 0 ? 0 : number;
}