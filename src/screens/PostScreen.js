import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';

import { THEME } from '../theme';
import { DATA } from '../data';

export const PostScreen = ({ navigation }) => {
    const postId = navigation.getParam('postId');

    const post = DATA.find(p => p.id === postId)

    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы уверены, что хотите удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {}
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </View>
    );
}

PostScreen.navigationOptions = ({ navigation }) => {
    const date = navigation.getParam('date');
    return {
        headerTitle: `Пост от ${new Date(date).toLocaleDateString()}`,
        headerStyle: {
            backgroundColor: 'red',
        },
        headerTintColor: '#fff'
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: 'open-regular'
    },
});
