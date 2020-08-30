import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Alert} from 'react-native';
import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";

export default function App() {
    const [todoId, setTodoId] = useState(2)
    const [todos, setTodos] = useState([
        {id: 1, title: 'Выучить React Native'},
        {id: 2, title: 'Написать приложение'}
    ])

    const addTodo = title => {

        setTodos(prev => [...prev, {
            id: Date.now().toString(),
            title
        }])
    }

    const removeTodo = id => {
        const todo = todos.find(el => el.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"`,
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setTodoId(null)
                        setTodos(prev => prev.filter(todo => todo.id !== id))
                    }
                }
            ],
            { cancelable: false }
        )

    }

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
        content = <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo} onRemove={removeTodo}/>
    }

    return (
        <View>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    }
});
