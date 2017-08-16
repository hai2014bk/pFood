const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    imageWrap: {
        marginLeft: -10,
        marginRight: 10
    },
    image:{
        height:60,
        width: 70
    },
    infoWrap:{
        flexDirection:'column',
        alignItems:'flex-start',
        flex:1
    },
    info:{
        color:'black',
        fontSize:12
    },
    buttonWrap:{
        flexDirection:'row',
        flex:1.5,
        marginLeft:10
    },
    quantity:{
        marginTop:12,
        marginLeft:5
    },
    cartWrap:{
        flex:1,
        alignItems:'flex-end',
        marginLeft:5
    }
};
