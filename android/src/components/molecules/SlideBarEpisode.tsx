import React, { useState, forwardRef, useImperativeHandle, Suspense } from 'react';
import { Button, View, Text } from 'react-native';
import Modal from 'react-native-modal';
//components
//import EpisodePage from '../cells/EpisodePage';
//component for the sliding effect for the episode's info
const SlideBarEpisode = forwardRef((props, ref) => {
  //lazy loading
  const EpisodePage = React.lazy(() => import('../cells/EpisodePage'));

  const [isModalVisible, setModalVisible] = useState(false);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    toggleModal() {
      setModalVisible(!isModalVisible);
    }

  }));

  const close = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Button color='black' title="Hide Episode" onPress={close} />
          <Suspense fallback={<Text>Loading...</Text>}>
            <EpisodePage />
          </Suspense>
        </View>
      </Modal>
    </View>
  );
}); {

}


export default SlideBarEpisode;