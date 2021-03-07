import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import {View} from "react-native-web";

export const MainScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, isBooked: post.booked })
    }

    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.post.allPosts);
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <PostList data={allPosts} onOpen={openPostHandler} />
    );
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Мой блог',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Take photo" iconName="ios-camera" onPress={() => navigation.push('Create')} />
        </HeaderButtons>
    ),
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
});

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
