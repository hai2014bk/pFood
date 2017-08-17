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
		fontSize:15,
		fontWeight:'normal',
		textAlign:'center'
	},
	foodThumnail:{
		height:70,
		aspectRatio:1,
	},
	shopNameText: {
		color:'black',
		fontSize:10,
		fontWeight:'100',
		textAlign:'center'
	},
	foodNameText: {
		marginTop:5,
		color:'black',
		fontWeight:'500',
		fontSize:13,
		textAlign:'center'
	},
	priceText: {
		color:'black',
		marginTop:8,
		fontSize:15,
		fontWeight:'bold',
		textAlign:'center'
	},
	mainContent:{
		flex:3
	}
};
