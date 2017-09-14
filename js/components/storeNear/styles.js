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
		width:deviceWidth - 60,
		backgroundColor:'white',
		marginLeft:30,
		marginRight:30,
		height:110,
		marginTop:deviceHeight - 190,
		position:'absolute',
		padding:10,
	},
	imageStore:{
		height:80,
		aspectRatio:1,
	},
	shopName:{
		fontSize:17,
		fontWeight:'bold'
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
        fontSize: 14,
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
