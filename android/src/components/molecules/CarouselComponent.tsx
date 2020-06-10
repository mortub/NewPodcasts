import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
//components
import { Styles } from '../../theme/Styles';

//component for showing different podcasts in a carousel
//receives an array of podcasts and a function of what to do when pressing a podcast
const CarouselComponent = ({results, pressOnAPodcast}) => {
    var toShow = results.map(res => {
        return {image :res.image , name: res.name, url: res.url, id:res.id}
    });

    //the podcasts that will be shown
    const [carouselItems, setCarouselItems] = useState(toShow);
    //if there is a change in results, it updates
    useEffect(() => {
        toShow = results.map(res => {
            return {image :res.image , name: res.name, url: res.url, id:res.id}
        });
       setCarouselItems(toShow);
      }, results);
  
    //each podcast will be a clickable image
    const _renderItem = ({item})=>{
        return (
          <TouchableOpacity style={Styles.carouselTouchableOpacity}
              key={item.id}
              onPress={() => {
                var id = item.id;
                pressOnAPodcast(id,carouselItems)
              }}
              >
                <ImageBackground source={{ uri: item.image }} style={{ flex:1}}>
                    <View 
                    style={{ 
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                         justifyContent: 'center', alignItems: 'center' 
                        }}>
                    </View>
                </ImageBackground>              
            </TouchableOpacity>
        );
    }

        return (
          <View style={{backgroundColor:Styles.mainColor}}>
          <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>            
              <Carousel
                  layout={"default"}
                  data={carouselItems}
                  sliderWidth={300}
                  itemWidth={250}
                  renderItem={_renderItem} />                                        
            </View>
          </SafeAreaView>
          </View>
        );
}

export default CarouselComponent;