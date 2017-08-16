const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 10
    },
    title: {
        marginLeft: 10,
        marginTop: 10
    },
    gridWrap: {
        flexDirection: 'row',
        height: 20
    },
    nameWrap: {
        flex: 2,
        alignItems: 'flex-start'
    }
};
