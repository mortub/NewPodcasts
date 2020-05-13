import React, {useState, forwardRef,useImperativeHandle } from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import EpisodePage from './EpisodePage';

const SlideBarEpisode = forwardRef((props, ref) => {
    const [isModalVisible, setModalVisible] = useState(false);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
  
        toggleModal(){
            setModalVisible(!isModalVisible);
        }
  
    }));

    const close=()=>{
        setModalVisible(!isModalVisible);
    }
  
    return (
        <View>
          <Modal isVisible={isModalVisible}>
            <View style={{flex: 1}}>
            <Button color='black' title="Hide Episode" onPress={close} />
            <EpisodePage />             
            </View>
          </Modal>
        </View>
      );
  });{
 
  }


export default SlideBarEpisode;