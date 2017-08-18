const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;

export default {
	container: {
		flex: 1,
		width: null,
		height: null,
		backgroundColor:'white'
	},
	pageBanner: {
		flex:2
	},
	sectionText:{
		color:'black',
		fontSize:13,
		fontWeight:'normal',
		textAlign:'left'
	},
	foodThumnail:{
		height:70,
		aspectRatio:1,
		borderRadius:15,
	},
	shopNameText: {
		color:'gray',
		fontSize:10,
		fontWeight:'100',
		textAlign:'left'
	},
	foodNameText: {
		marginTop:5,
		color:'black',
		fontWeight:'500',
		fontSize:11,
		textAlign:'left'
	},
	priceText: {
		color:'black',
		marginTop:5,
		fontSize:12,
		fontWeight:'bold',
		textAlign:'left'
	},
	mainContent:{
		flex:3
	}
};
