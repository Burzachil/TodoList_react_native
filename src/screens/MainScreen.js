import React from 'react'
import {StyleSheet, View, FlatList, Image} from 'react-native'
import {AddTodo} from "../components/AddTodo"
import {Todo} from "../components/Todo"

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
    let content = <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
    />

    if (!todos.length) {
        content = <View style={styles.imgWrap}>
            <Image style={styles.img} source={require('../../assets/no-items.png.png')} />
        </View>
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>

            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        padding: 10
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})