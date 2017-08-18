const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    content: {
        flex: 1,
    },
    imageWrap: {
        marginLeft: -10,
        marginRight: 10,
    },
    image:{
        height:80,
        width: 80,
        borderRadius:15
    },
    infoWrap:{
        flexDirection:'column',
        alignItems:'flex-start',
        flex:1.5,
        justifyContent:'center',
        marginLeft:15
    },
    info:{
        color:'black',
        fontSize:14
    },
    buttonWrap:{
        flexDirection:'row',
        flex:1.5,
        marginLeft:10,
        justifyContent:'center',
        paddingRight:20,
        marginTop:20
    },
    quantity:{
        marginTop:3,
        marginRight:5,
        marginLeft:2
    },
    cartWrap:{
        flex:1,
        alignItems:'flex-end',
        marginLeft:5
    },
    iconWrap:{
        height:30,
        width:30,
        marginLeft:10
    },
    icon:{
        fontSize: 25,
        color:'red'
    }
};
