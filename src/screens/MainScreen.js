import React, {useState, useEffect} from 'react'
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native'
import {AddTodo} from "../components/AddTodo"
import {Todo} from "../components/Todo"
import {THEME} from "../theme";

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {

    const [deviceWidth, setDeviceWitdh] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWitdh(width)
        }
        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    let content =
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
            />
        </View>


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