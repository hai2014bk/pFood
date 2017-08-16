const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    container:{
        flex:1
    },
    content:{
        flex: 1
    }
};
