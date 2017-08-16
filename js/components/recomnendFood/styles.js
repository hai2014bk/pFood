const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;

export default {
	container: {
		flex: 1,
		width: null,
		height: null,
	},
	pageBanner: {
		flex:2
	},
	sectionText:{
		color:'black',
		fontSize:15,
		fontWeight:'bold',
		textAlign:'center'
	},
	shopNameText: {
		color:'black',
		fontSize:12,
		textAlign:'center'
	},
	foodNameText: {
		marginTop:5,
		color:'black',
		fontSize:13,
		textAlign:'center'
	},
	priceText: {
		color:'black',
		fontSize:12,
		textAlign:'center'
	},
	mainContent:{
		flex:3
	}
};
