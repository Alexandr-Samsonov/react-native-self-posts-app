import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, isBooked: post.booked })
    }

    const bookedPosts = useSelector(state => state.post.bookedPosts)

    return (
        <PostList data={bookedPosts} onOpen={openPostHandler} />
    );
}

BookedScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Избранное',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})
