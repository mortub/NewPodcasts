import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
//components


 
//component for showing different podcasts. 
//receives an array of objects that represent a podcast
const CarouselComponent = ({results}) => {
    var toShow = results.map(res => {
        return {image :res.image , name: res.name, url: res.url}
    });
    const [carouselItems, setCarouselItems] = useState(toShow);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        toShow = results.map(res => {
            return {image :res.image , name: res.name, url: res.url}
        });
       setCarouselItems(toShow);
      }, results);

    //TODO: shows view of all the episodes: the podcast: probly need navigation
  const pressOnAPodcast = async () => {
   
  }

    const _renderItem = ({item,index})=>{
        return (
          <TouchableOpacity style={{
              borderRadius: 5,
              height: 200,              
              marginLeft: 25,
              marginRight: 25, }}
              onPress={() => pressOnAPodcast()}
              >
                <ImageBackground source={{ uri: item.image }} style={{ width: '100%', height: '100%' }}>
                    <View 
                    style={{ 
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' 
                        }}>
                    </View>
                </ImageBackground>              
            </TouchableOpacity>
        );
    }

        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'#F7F3E4', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => carousel = ref}
                  data={carouselItems}
                  sliderWidth={300}
                  itemWidth={250}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setActiveIndex(index) } />
                
            </View>
          </SafeAreaView>
        );
}

export default CarouselComponent;