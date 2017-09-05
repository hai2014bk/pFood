const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primary = require("../../themes/variable").brandPrimary;

export default {
	containerWrap: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingLeft: 30,
		paddingTop: 10,
		paddingRight: 30,
	},
	textInput: {
		width: '100%',
		height: 55,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#F6F6F6',
		paddingLeft: 20,
		borderRadius: 2,
		marginTop: 10
	},
	infoDetail: {
		fontSize: 16,
		color: '#A0A0A0',
		marginTop: 5,
		marginLeft: 10,
		fontWeight:'500'
	},
	userIcon: {
		color: 'gray',
		fontSize: 30
	},
	headerTitle: {
		flexDirection: 'row',
		marginTop: 20
	},
	pickerWrap: {
		flexDirection: 'row',
		marginLeft: -10,
		marginTop: 7
	},
	checkboxText: {
		marginLeft: 20,
		color: '#A0A0A0',
	},
	moneyIcon: {
		height: 25,
		width: 25,
		marginLeft: -3
	},
	checkBox: {
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#A0A0A0',
	},
	updateButtonWrap: {
        backgroundColor: primary,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
		marginTop: 20,
		marginBottom:20
    },
    updateButtonText: {
        color: 'white',
		fontSize: 18,
		fontWeight:'bold'
    },
};
