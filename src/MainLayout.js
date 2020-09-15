import React, {useState, useContext} from 'react'
import {Navbar} from "./components/Navbar"
import {View, StyleSheet, Alert} from 'react-native'
import {THEME} from "./theme"
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {TodoContext} from "./context/todo/todoContext";

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
    const [todoId, setTodoId] = useState(null)
    // const [todos, setTodos] = useState([])

    // const addTodo = title => {
    //
    //     setTodos(prev => [...prev, {
    //         id: Date.now().toString(),
    //         title
    //     }])
    // }

    // const removeTodo = id => {
    //     const todo = todos.find(el => el.id === id)
    //     Alert.alert(
    //         'Удаление элемента',
    //         `Вы уверены, что хотите удалить "${todo.title}"`,
    //         [
    //             {
    //                 text: 'Отмена',
    //                 onPress: () => console.log('Cancel Pressed'),
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Удалить',
    //                 onPress: () => {
    //                     setTodoId(null)
    //                     setTodos(prev => prev.filter(todo => todo.id !== id))
    //                 }
    //             }
    //         ],
    //         {cancelable: false}
    //     )
    // }

    // const updateTodo = (id, title) => {
    //     setTodos(old => old.map(todo => {
    //         if (todo.id === id) {
    //             todo.title = title
    //         }
    //         return todo
    //     }))
    // }

    let content = (
        <MainScreen
            addTodo={addTodo}
            removeTodo={removeTodo}
            todos={todos}
            openTodo={setTodoId}
        />
    )

    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content =
            <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo} onRemove={removeTodo} onSave={updateTodo}/>
    }

    return (
        <View>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                {content}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
});