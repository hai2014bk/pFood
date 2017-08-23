const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const itemWidth = (deviceWidth - 25) / 2;

export default {
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    content: {
        flex: 1,
        padding: 20
    },
    title: {
       color:'white',
       fontSize:20,
       fontWeight:'bold'
    },
    gridWrap: {
        flexDirection: 'row',
        height: 20
    },
    nameWrap: {
        flex: 4,
        alignItems: 'flex-start'
    },
    cirlce:{
        height:15,
        width:15,
        alignSelf:'flex-end',
        marginTop:2,
        marginRight:10
    },
    opacityView:{
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    arrow:{
        color:'black'
    },
    listItem:{
      flex: 1, 
      margin: 3,
      marginBottom:10,
      justifyContent:'center',
       minWidth: itemWidth, 
       maxWidth: itemWidth
    },
    listWrap:{
    },
    imageBackgroundItem:{
        aspectRatio:1,
        flex:1,
    }
};
