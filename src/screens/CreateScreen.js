import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {AppHeaderIcon} from '../components/AppHeaderIcon';
import { PhotoPicker } from '../components/PhotoPicker';
import {THEME} from '../theme';
import { addPost } from '../store/actions/post';

export const CreateScreen = ({ navigation }) => {
    const [value, setValue] = useState('');
    const imgRef = useRef();
    const dispatch = useDispatch();

    const saveHandler = () => {
        const post = {
            img: imgRef.current,
            date: new Date().toJSON(),
            text: value,
            booked: false,
        }
        dispatch(addPost(post));
        navigation.navigate('Main');
    }

    const photoPickHandler = uri => {
        imgRef.current = uri;
    }

    return (
        <ScrollView>
            {/* ScrollView - Для прокрутки страницы во время открытой клавиатры */}
            {/* TouchableWithoutFeedback - Для скрытия клавиатуры, при нажатии на облать вне инпута */}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Создай новый пост
                    </Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Введите текст заметки"
                        value={value}
                        onChangeText={setValue}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler} />
                    <Button
                        title="Создать пост"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!value}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Создать пост',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textArea: {
        padding: 10,
        marginBottom: 10
    },
});
