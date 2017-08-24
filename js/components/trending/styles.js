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
        marginLeft:-10,        
        width: deviceWidth,
        height: deviceHeight * 111/667,
        borderTopWidth: 0,
        borderBottomWidth: 0,

    },
    imageWrap: {
        justifyContent: 'center',
        alignItems:'center',
    },
    imageContainer: {
        flex:1,
        justifyContent: 'center',
    },
    image: {
        height:deviceHeight * 82/667,
        aspectRatio: 1,
        borderColor: '#d9dbd8',
        borderWidth: 1,

    },
    infoWrap: {
        justifyContent: 'flex-start',
        marginLeft:5,
    },
    unit: {
        color: 'gray',
        fontSize: deviceHeight * 12/667,
        fontWeight: '100',
        textAlign: 'left'
    },
    price: {
        color: 'gray',
        fontSize: deviceHeight * 18/667,
        fontWeight: '400',
        textAlign: 'left',
    },
    shopName: {
        color: 'gray',
        fontSize: deviceHeight * 12/667,
        marginTop:5,
        fontWeight: '100',
        textAlign: 'left',
        alignSelf:'flex-start'
    },
    foodName: {
        color: 'black',
        fontSize: deviceHeight * 14/667,
        fontWeight: '400'
    },
    buttonWrap: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'center',
    },
     buttonAddCard: {
        flex:1,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    buyColumn: {
        marginLeft: 5,
        marginRight:5,
        justifyContent: 'center',
        marginTop: 20,
    },
    quantity: {
        fontSize: 17,
        alignSelf: 'center'
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
    }
};
