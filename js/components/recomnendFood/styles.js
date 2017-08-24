const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;

export default {
	container: {
		flex: 1,
		width: null,
		height: null,
        backgroundColor: '#e7e9e5',
	},
	cellContainer:{
		backgroundColor:'white', 
		flex: 1, 
		alignItems: 'flex-start',
		borderRadius:5,
	},
	upContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	downContainer:{
		paddingLeft:5,
		marginTop:4,
		borderTopWidth:1,
		borderColor:'#e7e9e5',
		flexDirection:'column'
	},
	saleView:{
		height:15,
		width:40,
		borderTopLeftRadius: 7.5,
		borderBottomLeftRadius: 7.5,
		alignSelf:'flex-end',
		backgroundColor:'orange'
	},
	saleText:{
		color:'white',
		fontSize:10,
		fontWeight:'900',
		alignSelf:'center'
	},
	pageBanner: {
		flex:2
	},
	sectionText:{
		color:primary,
		fontSize:17,
		fontWeight:'400',
		textAlign:'left'
	},
	foodThumnail:{
		marginTop:5,
		height:60,
		flex:1,
	},
	oldPriceText: {
		color:'gray',
		fontSize:10,
		marginLeft:5,
		marginRight:2,
		fontWeight:'100',
		textAlign:'left',
		textDecorationLine :'line-through',
		marginTop:6,
	},
	shopNameText: {
		color:'gray',
		fontSize:10,
		marginLeft:5,
		fontWeight:'100',
		textAlign:'left',
	},
	locationIcon:{
		fontSize: 11, 
		color: 'gray'
	},
	foodNameText: {
		marginTop:5,
		color:'black',
		fontWeight:'300',
		fontSize:12,
		maxWidth:100,
		textAlign:'left',
		height:28
	},
	priceText: {
		color:primary,
		fontSize:12,
		fontWeight:'500',
		textAlign:'left',
		backgroundColor:'transparent'
	},
	mainContent:{
		flex:3
	}
};
