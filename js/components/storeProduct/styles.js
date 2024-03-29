const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const itemWidth = (deviceWidth - 30) / 2;

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
		height:deviceHeight * 200/990
	},
	cellContainer:{
		backgroundColor:'white', 
		flex: 1, 
		width:'100%',
		alignItems: 'flex-start',
		justifyContent:'flex-end',
		borderRadius:5,
	},
	upContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	downContainer:{
		marginTop:4,
		flex:1,
		width:'100%',
		borderTopWidth:1,
		borderColor:'#e7e9e5',
		flexDirection:'column',
		alignItems:'flex-end',
		paddingRight:5,
		paddingBottom:3,
		paddingLeft:5,
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
		fontWeight:'bold',
		textAlign:'left',
		marginLeft:10
	},
	foodThumnail:{
		marginTop:5,
		height:60,
		flex:1,
	},
	oldPriceText: {
		color:'gray',
		fontSize:9,
		marginLeft:5,
		marginRight:2,
		fontWeight:'100',
		textAlign:'left',
		textDecorationLine :'line-through',
		marginTop:6,
	},
	shopNameText: {
		color:'gray',
		fontSize:9,
		fontWeight:'100',
		textAlign:'center',
		marginLeft:3,
	},
	locationIcon:{
		fontSize: 9, 
		color: 'gray',
		marginLeft:3,
	},
	foodNameText: {
		marginTop:5,
		marginLeft:5,
		color:'black',
		fontWeight:'500',
		fontSize:12,
		textAlign:'left',
		alignSelf:'flex-start',
	},
	priceText: {
		color:primary,
		fontSize:12,
		fontWeight:'600',
		textAlign:'left',
		marginLeft:3,
	},
	mainContent:{
		flex:3
	},
	listItem:{
		flex: 1, 
		margin: 3,
		marginBottom:10,
		justifyContent:'center',
		 minWidth: itemWidth, 
		 maxWidth: itemWidth
	  },
};
