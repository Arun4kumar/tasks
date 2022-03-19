import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
    tasks: [],
    darkMode: false,
    isLoading: false
}

const tasksReducer = (state = initialState,action) => {
    if (action.type == "setLoading") {
        return { ...state,isLoading: true }
    }
    if (action.type == "remLoading") {
        return { ...state,isLoading: false }
    }
    if (action.type == "addUser") {
        return { ...state,user: action.user }
    }
    if (action.type === "populate") {
        return { ...state,tasks: action.state }
    }
    if (action.type === "add") {
        return {
            ...state,
            tasks: [ action.task,...state.tasks ],
        }
    }
    else if (action.type === "remove") {
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.id)
        }
    }
    else if (action.type === "clear") {
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.active) || []
        }
    }
    else if (action.type === "status") {
        let temp = state.tasks;
        for (let task of temp) {
            if (task.id === action.id) {
                task.active = !task.active
            }
        }
        return {
            ...state,
            tasks: temp
        }

    }
    else if (action.type === "changeTheme") {
        return {
            ...state,
            darkMode: !state.darkMode
        }
    }
    return state;
}

const middleware = [ thunk ]

const store = createStore(tasksReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
