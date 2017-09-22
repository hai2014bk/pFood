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
	pageBanner: {
		width:'100%',
		height:deviceHeight * 125/990
	},
	foodImage:{
		margin:10,
		flex:1,
		height: deviceHeight * 208/990
	},
	price: {
		fontSize:18,
		fontWeight:'500',
		color:'gray'
	},
	perPrice: {
		fontSize:17,
		fontWeight:'300',
		color:'gray'
	},
	iconWrapPlus: {
		flex:1,
		maxWidth:30,
        aspectRatio: 1,
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: primary,
        justifyContent: 'center',
		alignItems: 'center',
	},
	buttonAddCard: {
        flex:1,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    iconWrapMinus: {
		flex:1,
		maxWidth:30,		
        aspectRatio: 1,
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
	},
	icon: {
        fontSize: 17,
        color: primary
    },
	quantity: {
        fontSize: 15,
		alignSelf: 'center',
		color:'gray',
		textAlign:'center'
    },
    quantityContainer: {
       flex:1,
		justifyContent: 'center',
		marginLeft:5,
		marginRight:5,
	},
	cardContainer:{
		width:deviceWidth,
		backgroundColor:'white',
		marginBottom:5,
		flex:1,
	},
	saleText:{
		color:'white',
		fontSize:15,
		alignSelf:'center',
		fontWeight:'bold'
	},
    saleView:{
		height:20,
		width:60,
		borderTopLeftRadius: 7.5,
		borderBottomLeftRadius: 7.5,
		alignSelf:'flex-end',
		justifyContent:'center',
		backgroundColor:'orange'
	},
	headerText:{
		color:primary,
		fontSize:18,
		fontWeight:'500',
		marginLeft:10,
		marginRight:15,
		marginTop:15,
		marginBottom:15
	},
	contentText:{
		fontSize:12,
		color:'gray',
	},
	textAdd: {
        width: '100%',
        color: 'white',
        fontWeight: 'normal',
        fontSize: 12,
        textAlign: 'center'
    },
    pickerWrap: {
        flexDirection: 'row',
        marginLeft: -10,
        marginTop: 7,
        width: '60%'
    },
    checkboxText: {
        marginLeft: 20,
        color: '#A0A0A0',
    },
    checkBox: {
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#A0A0A0',
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    }
};
