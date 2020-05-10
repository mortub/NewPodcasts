import React from 'react';
import { ScrollView } from 'react-native';
//components
import PodcastItem from './PodcastItem';
import BottomGap from './BottomGap';

//represents the podcasts that the user is subscribed to
const Subscibers = ({ navigation }) =>{
    return (
        <ScrollView>
            <PodcastItem />
            <PodcastItem />
            <BottomGap />
        </ScrollView>
    )
}

export default Subscibers;