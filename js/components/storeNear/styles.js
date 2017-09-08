const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;

export default {
	container: {
		flex: 1,
		width: null,
		height: null,
        backgroundColor: '#e7e9e5',
	},
	callOutWrap: {
		flex:1,
		width:150
	},
	imageStore:{
		height:60,
		aspectRatio:1,
	},
	marker:{
		width:50,
		height: 50
	  },	
    locationIcon:{
		fontSize: 14, 
		color: 'gray',
        marginLeft:3,
        marginRight:8,
	},
	
	hotlineWrap: {
        flexDirection: 'row'
	},
	address: {
        color: '#555555',
        fontSize: 10,
    },
	starWrap: {
        width: 50,
        marginTop: 3
    },
    phoneIcon: {
        fontSize: 18,
        color: 'gray'
    },
    hotline: {
        color: 'blue',
        fontSize: 10,
        marginTop: 3,
        marginLeft: 5,
        textDecorationLine : 'underline'
    }
};
