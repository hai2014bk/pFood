const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

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
        marginLeft: 20,
    },
    thumnail:{
        borderRadius:15,
        alignSelf:'center',

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
    arrow:{
        color:'black'
    },
    listItem:{
    },
    listWrap:{
    }
};
