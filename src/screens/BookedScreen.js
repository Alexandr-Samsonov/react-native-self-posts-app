import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { DATA } from '../data';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, isBooked: post.booked })
    }

    const data = DATA.filter(post => post.booked)

    return (
        <PostList data={data} onOpen={openPostHandler} />
    );
}

BookedScreen.navigationOptions = {
    headerTitle: 'Избранное',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => console.log('- press photo -')} />
        </HeaderButtons>
    )
}
