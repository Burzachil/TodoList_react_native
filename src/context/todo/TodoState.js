import React, {useReducer, useContext} from 'react'
import {TodoContext} from "./todoContext"
import {todoReducer} from "./todoReducer"
import {ADD_TODO, HIDE_LOADER, SHOW_LOADER, REMOVE_TODO, SHOW_ERROR, UPDATE_TODO, CLEAR_ERROR, FETCH_TODOS} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from 'react-native'

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
        const response = await fetch('https://rn-todo-app-b1ad8.firebaseio.com/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title })
        })
        const data = await response.json()
        console.log('Data', data);
        dispatch({ type: ADD_TODO, title, id: data.name })
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null)
                        dispatch({type: REMOVE_TODO, id})
                    }
                }
            ]
        )
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await fetch(`https://rn-todo-app-b1ad8.firebaseio.com/todos/${id}.json`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            })
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Что-то пошло не так... ')
            console.log(e)
        }
        
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const response = await fetch('https://rn-todo-app-b1ad8.firebaseio.com/todos.json', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json()
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key}))
            dispatch({ type: FETCH_TODOS, todos })
        } catch (e) {
            showError('Что-то пошло не так... ')
            console.log(e)
        } finally {
            hideLoader()
        }        
    }    

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}