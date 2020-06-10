import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
//cross-app style
 export const Styles = {
    mainColor:'#e8aec1',
    secondColor: 'white',
    navBarLeftButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:10,
     
    },
    sliderWidth:{
      width: '94%'
    },
      container: {
          flex: 1,
          backgroundColor: 'white',
          overflow: 'hidden',
          flexDirection: 'row', 
          justifyContent:'space-around'
      },
      buttonStyle: {
          padding: 20,
          backgroundColor: 'white',
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 100,
          marginTop: 10,
          marginBottom: 10,
      },
      episodeImage: {
        width: deviceWidth/8,
        height: deviceHeight/12,
        borderRadius: 50 / 2, 
        overflow: 'hidden',
        flexDirection: 'row',
        marginLeft:20,
      },
      bigEpisodeImage: {
        width: deviceWidth/2,
        height: deviceHeight/3,
      },
      
      nothingToShowText:
      {textAlign: 'center',
      paddingTop: 50, 
      fontSize:30,      
    },
    podcastTitle:{
    fontSize:20 , 
    paddingTop:20,
    paddingBottom:20, 
    fontFamily:'Lobster-Regular',
    color:'white',
    textShadowColor:'black',
    textShadowRadius:50
    },
    searchInHomeText: {
      paddingLeft:20, 
      paddingTop:15, 
      fontSize:20, 
      fontFamily:'Lobster-Regular',
    },
    clickableOpacity:{
      flexDirection: 'row',
      marginTop: 10,
      paddingBottom: 20,
      borderRadius: 10,
    },
    podcastItemView: { 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2
    },
    podcastItemText:{ 
      fontFamily: 'Lobster-Regular',
      fontSize: 20,
      textShadowColor: 'black',
      textShadowRadius: 50,
      color: 'white'
    },
   podcastitemImage: {
    width: deviceWidth,
    height:deviceHeight /12,
   },
   carouselTouchableOpacity:{
    borderRadius: 5,
    height: deviceHeight /3, 
    marginLeft: 25,
    marginRight: 25, 
   }
    
      
  };

 