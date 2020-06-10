import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';

//component for the 'play' icon on the episode
const PlayEpisodeIcon = ({track}) =>{
  //the local player store
  const { playerStore } = useRootStore();
    return (
        <Icon name='caretright' size={30} onPress={() => {
            playerStore.pause();
            playerStore.reset();
            playerStore.add(track);
            playerStore.play();
        }
        } style={{ flex: 1, }} color={Styles.mainColor} />
    )
};

export default observer(PlayEpisodeIcon);