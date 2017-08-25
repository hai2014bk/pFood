
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosShadow: {
    flex: 1,
    width: (deviceHeight < 500) ? 80 : (deviceWidth / 4) + 12,
    height: (deviceHeight < 500) ? 50 : (deviceHeight / 15),
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : (deviceHeight / 6),
  },
  aShadow: {
    flex: 1,
    width: (deviceWidth / 3) + 8,
    height: (deviceHeight / 20),
    padding: 20,
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 5) - 60),
  },

dontac: { fontSize: 16,
      textAlign: "center",
       color: "#f4e6db",
       justifyContent:"center"
 },

  inputGrp: {
    marginTop:12,
		width:'80%',
		alignSelf:'center',
		height: 40,
    borderColor:'transparent',
    borderWidth:0,
		backgroundColor:'rgba(255,225,240,0.2)',
		paddingLeft: 10,
		borderRadius: 12
  },

  input: {
    paddingLeft: 10,
    color: 'white',
    marginLeft:5,
    borderWidth:0,
    fontSize:14,
    borderColor:'transparent',
  },
  loginBtn:{
    marginTop:30,
    width:'80%',
    alignSelf:'center',
    height: 40,
    borderColor:'white',
    borderWidth:1,
    backgroundColor:'transparent',
    paddingLeft: 10,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 20


  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    alignItems:'center',
    marginTop:0
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  },
  otherLinksContainer: {
    flexDirection: 'row',
  },
  questionWrap:{
   marginTop: 10
  },
  icon:{
    alignSelf: "center",
    marginTop:10,
    aspectRatio:1,
  },

questionText:{
  color: '#f4e6db',
  fontSize: 20,
  
  marginTop:35,
  textAlign:'center',
  justifyContent:'center'


  },
  fb:{
    fontSize:35,
    fontWeight:'900',
    color:'#33CB82'
  },
  texticon:{
    fontSize: 35,
    color:'#33CB82'
  },
  regis:{

		alignSelf:'center',

    justifyContent:'center',
		backgroundColor:'transparent',

    borderWidth:0,
  },
  forgot:{
    fontSize: 16,

    textAlign: "center",
    color: "white"
  },
  logo:{
    marginTop:40,
    justifyContent:'center',
    alignItems:'center',
    resizeMode:'contain',
    flex:1
  },

}
