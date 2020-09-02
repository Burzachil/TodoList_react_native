import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import {THEME} from "../theme"

export const AddTodo = ({onSubmit}) => {

    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Вы ничего не ввели')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Чем бы вы хотели заняться?"
            />
            <Entypo.Button onPress={pressHandler} name="add-to-list">
                Добавить
            </Entypo.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15
    },
    input: {
        width: '60%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
})