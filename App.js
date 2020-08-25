import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navbar} from "./src/Navbar";
import {AddTodo} from "./src/AddTodo";

export default function App() {

    const [todos, setTodos] = useState([])

    const addTodo = title => {
        // const newTodo = {
        //     id: Date.now().toString(),
        //     title: title
        // }

        setTodos(prev => [...prev, {
            id: Date.now().toString(),
            title
        }])
    }

    return (
        <View>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo}/>
            </View>

            <View>
                {todos.map(todo => {
                    return <Text key={todo.id}>{todo.title}</Text>
                })}
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