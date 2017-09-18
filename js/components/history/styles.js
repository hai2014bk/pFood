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
        paddingBottom:15
    },
    payContainWrap: {
        width: '50%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 5,
        paddingBottom: 10,
        borderColor: '#E1E1E1'
    },
    grayText: {
        color: '#AAAAAA'
    },
    blueNumber: {
        color: primary,
        fontWeight: 'bold'
    },
    moneyInAccount: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    moneyIcon: {
        height: 30,
        width: 30
    },
    moneyCostWrap: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'white'
    },
    darkText: {
        color: '#555555'
    },
    dayMonthWrap: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#E1E1E1',
        padding: 15
    },
    flexRow: {
        flexDirection: 'row',
        marginTop:3
    },
    listItemWrap: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        marginTop: 15
    },
    monthWrap: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: -5
    },
    descriptionWrap: {
        flexDirection: 'column',
        flex: 3,
        paddingVertical: 10,
        paddingLeft: 10,
        justifyContent: 'space-between'
    },
    pinIcon:{
        fontSize:15,
        width:15,
        color:'#AAAAAA',
        marginTop:3,
        textAlign:'center'
    },
    moneyIcon:{
        height:15,
        width:15
    },
    price:{
        color: '#555555',
        fontSize:22,
        fontWeight:'bold',
        marginTop:3
    },
    products:{
        fontWeight:'bold',
        marginBottom:3,
        color: '#555555',
    }
};
