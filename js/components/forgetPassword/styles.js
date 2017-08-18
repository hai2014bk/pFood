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
        marginLeft:-10
	},
	textInput:{
		color:'white',
		borderWidth:0
	},
	imageBackground:{
		height:'100%',
		width:'100%',
	},
	input:{
		marginTop:12,
		width:'60%',
		alignSelf:'center',
		height: 40,
		backgroundColor:'rgba(255,225,240,0.2)',
		paddingLeft: 10,
		borderRadius:12,
		borderColor:'transparent'
    },
    iconBack:{
        marginTop:30,
        marginLeft:30
    }
};
