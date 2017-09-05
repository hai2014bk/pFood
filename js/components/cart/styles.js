const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primary = require("../../themes/variable").brandPrimary;

export default {
    container: {
        flex: 1,
        backgroundColor: '#e7e9e5',
    },
    content: {
        flex: 1,
    },
    card: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    imageWrap: {
        flex: 2,
        justifyContent: 'center',
        marginRight: 8,
        marginLeft: -5
    },
    imageContainer: {
        borderColor: '#d9dbd8',
        borderWidth: 1,
        height: 90,
        width: 90,
        aspectRatio: 1,
        padding: 2,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        aspectRatio: 1,
    },
    infoWrap: {
        justifyContent: 'center'
    },
    unit: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '100',
        textAlign: 'left'
    },
    price: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        marginBottom: 0,
        alignSelf: 'baseline',
    },
    shopName: {
        color: 'gray',
        fontSize: 13,
        fontWeight: '100',
        textAlign: 'left'
    },
    foodName: {
        color: 'black',
        fontSize: 13,
        fontWeight: '400',
    },
    buttonAdd: {
        height: 30,
        width: 30,
        borderWidth: 1,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    buttonMinus: {
        height: 30,
        width: 30,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderWidth: 1
    },
    buttonAddCard: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyColumn: {
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        marginTop: 20,
    },
    x: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: '#A9A9A9',
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 5
    },
    quantity: {
        fontSize: 17,
        color: '#A9A9A9',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginBottom: 4
    },
    quantityContainer: {
        width: 30,
        aspectRatio: 1,
        justifyContent: 'center',
    },
    cartWrap: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 5
    },
    iconWrapPlus: {
        width: 30,
        aspectRatio: 1,
        borderWidth: 1,
        marginRight: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconWrapMinus: {
        width: 30,
        aspectRatio: 1,
        borderWidth: 1,
        marginLeft: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 17,
        color: primary
    },
    line: {
        height: 3,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#cecece',
        marginTop: 20
    },
    footer: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'row',
        alignSelf:'center'
    },
    totalPrice: {
        fontSize: 17,
        color: 'grey',
        fontWeight: 'bold',
        alignSelf:'flex-end'
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
    removeButton: {
        backgroundColor: primary,
        width: '100%',
        height: 25,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10

    },
    locationIcon: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 3,
        marginRight: 5,
        marginBottom: 2
    },
    listViewWrap: {
        marginBottom: 5,
        marginTop: 15,
        backgroundColor: 'white'
    },
    moneyIcon: {
        height: 30,
        width: 30
    },
    footerRightWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf:'flex-end',
        flex:3
    },
    listItem: {
        borderBottomWidth: 0,
        flex: 1
    },
    trashWrap: {
        width: '50%',
        height: '100%',
        backgroundColor: '#F57463',
        justifyContent:'center',
        alignItems:'center'
    },
    iconTrash:{
        fontSize:35
    },
    alert:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    alertText:{
        color:primary,
        fontSize:18,
        marginTop:50,
        fontWeight:'500',
        textAlign:'center'
    }
};
