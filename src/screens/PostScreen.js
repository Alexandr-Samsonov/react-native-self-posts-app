import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import { THEME } from '../theme';
import {AppHeaderIcon} from '../components/AppHeaderIcon';
import {toggleBooked, removePost} from '../store/actions/post';

export const PostScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const postId = navigation.getParam('postId');

    const post = useSelector(state => state.post.allPosts.find(post => post.id === postId));
    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

    useEffect(() => {
        navigation.setParams({ isBooked: Boolean(booked) });
    }, [booked])

    const toggleHandler = useCallback(() => { dispatch(toggleBooked(post))}, [dispatch, post]);

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

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
                    onPress() {
                        navigation.navigate('Main')
                        dispatch(removePost(postId))
                    }
                }
            ],
            { cancelable: false }
        );
    }

    if (!post) {
        return null
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
    const isBooked = navigation.getParam('isBooked');
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = isBooked ? 'ios-star' : 'ios-star-outline';

    return {
        headerTitle: `Пост от ${new Date(date).toLocaleDateString()}`,
        headerStyle: {
            backgroundColor: 'red',
        },
        headerTintColor: '#fff',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Take photo" iconName={iconName} onPress={toggleHandler} />
            </HeaderButtons>
        ),
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
