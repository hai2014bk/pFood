const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primary = require("../../themes/variable").brandPrimary;

export default {
	containerWrap:{
		flex:1,
	},
	container: {
		flex: 1,
		marginTop:30,
		marginBottom:10,
		justifyContent:'center',
	},
	showPassword: {
		color: '#f4e6db',
		backgroundColor:'transparent',
		marginLeft: 20
	},
	button: {
		height: 30,
		marginTop: 30,
		width:'60%',
		height: 40,
		alignSelf:'center',
		backgroundColor:'transparent',
		borderColor:'#f4e6db',
		borderRadius:12,
		borderWidth:0.5,
		justifyContent:'center',
		alignItems:'center'
	},
	questionText: {
		color: '#f4e6db',
		fontSize: 16,
		textAlign:'center',
	},
	questionWrap:{	
		width:'100%',
		marginTop:30,
		backgroundColor:'transparent',

	},
	col: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	checkBoxWrap: {
		marginTop: 15,
		width:'60%',
		alignSelf:'center',
		flexDirection:'row'
	},
	textInput:{
		color:'white',
		borderWidth:0
	},
	line: {
		height: 3,
		width: '100%',
		backgroundColor: '#cecece'
	},
	imageBackground:{
		height:'100%',
		width:'100%',
	},
	input:{
		marginTop:12,
		width:'80%',
		alignSelf:'center',
		height: 40,
		backgroundColor:'rgba(255,225,240,0.2)',
		paddingLeft: 10,
		borderRadius:12,
		borderColor:'transparent'
	},
	checkBox:{
		borderColor:'#rgba(255,225,240,0.2)',
		backgroundColor:'#rgba(255,225,240,0.2)'
	},
	passwordNote:{
		textAlign:'center',
		fontSize:12,
		marginTop:3
	}

};
