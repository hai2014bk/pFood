const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primary = require("../../themes/variable").brandPrimary;

export default {
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: 'white',
	},
	showPassword: {
		color: 'black',
		marginLeft: 20
	},
	button: {
		height: 30,
		marginTop: 20
	},
	questionText: {
		color: 'black',
		fontSize: 12
	},
	questionWrap:{
		marginTop: 20
	},
	col: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	checkBoxWrap: {
		marginTop: 15,
		paddingLeft: 10
	},
	line: {
		height: 3,
		width: '100%',
		backgroundColor: '#cecece'
	}

};
