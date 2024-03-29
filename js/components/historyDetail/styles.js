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
	wrapStoreItems:{
		flex:1,
		paddingTop:5,
		marginTop:5,
		borderBottomWidth:0.5,
		borderColor:"#A4A4A4"
	},
	storeNameText: {
		fontWeight:'600',
		color:'black',
		fontSize:16,
	},
	shipTypeText:{
		marginTop:5,
		marginLeft:5,
		color:"#A0A0A0",
		fontSize:14,
		width:'100%',
	},
	lineView:{
		marginTop:5,
		backgroundColor:"#A0A0A0",
		height:1,
		alignSelf:'flex-start',
		width:'80%'
	},
	checkoutWrap: {
        backgroundColor: primary,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginBottom:20,
    },
    checkout: {
        color: 'white',
        fontSize: 16,
    },
	textInput: {
		justifyContent: 'center',
		minHeight: 45,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#F6F6F6',
		paddingLeft: 20,
		borderRadius: 2,
		color:'gray',
		marginBottom: 5,
		marginTop:5,
	},
	infoDetail: {
		fontWeight: '500',
		textAlignVertical: 'center',
		fontSize: 20,
		color: 'black',
		marginTop: 5,
		marginLeft: 10,
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
		marginLeft: 18,
		color: 'black',
	},
	moneyIcon: {
		height: 30,
		width: 30,
		marginLeft: 0
	},
	checkBox: {
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#A0A0A0',
	},
	updateButtonWrap: {
		backgroundColor: primary,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		alignSelf: 'center',
		borderRadius: 20,
		marginTop: 20,
		marginBottom: 20
	},
	updateButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	},
	proTitle: {
		color: '#A0A0A0',
	},

	pageTitle: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: "bold",
		color: '#A0A0A0',
	},

	button: {
		height: 50,
		marginLeft: 5,
		marginRight: 5,
		backgroundColor: '#00D29F',
		borderRadius: 30,
		marginTop: 10,
	},
	buttonText: {
		height: 50,
		fontSize: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: 'white',
		fontWeight: 'bold',
	},
	proDetail: {
		marginLeft: 16,
		borderBottomWidth: 1,
		borderColor: '#E1E1E1',
		marginTop: 5,
		paddingBottom: 5, 
		flexDirection:'column',
		borderBottomWidth:0,
	},
	productText:{
		color: 'black',
		fontWeight:'400'		
	},
	shopText:{
		color: '#A0A0A0',
		fontSize: 12,
	},
	footer: { height: 20, 
		width: 50, 
	},
	textProInput: {
		flexDirection: 'row',
	},
	productBlackText:{
		color: 'black'
	},
	proNumber:{
		color: '#A0A0A0',
		fontSize: 12,
	},
	totalPriceText:{
		color: 'black',
		fontSize: 18,
		fontWeight:'500'
	},
	totalPrice:{
		marginTop:10,
		flexDirection: 'row',
		paddingLeft:5,
	},
	checkboxTextDisable:{
		marginLeft: 20,
		color: '#d6dbdf',
	},
	checkBoxDisable: {
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#d6dbdf',
	},
	flexCol:{
		flexDirection:'column'
	},
	productBlackTotalText:{
		color: 'black',
		fontWeight: '500',
	},
	checkoutWrap: {
        backgroundColor: primary,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginBottom:20,
    },
    checkout: {
        color: 'white',
        fontSize: 16,
    },
};
