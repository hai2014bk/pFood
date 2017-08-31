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
        flex:1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
        backgroundColor:'white',
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
        flex: 1,
        aspectRatio: 1,
        padding: 2,
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex:1,
        aspectRatio: 1
    },
    infoWrap: {
        justifyContent: 'space-between'
    },
    unit: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '100',
        textAlign: 'left'
    },
    price: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 0,
        alignSelf: 'baseline'
    },
    locationIcon:{
		fontSize: 11, 
		color: 'gray',
        marginLeft:3,
        marginRight:5,
	},
    shopName: {
        color: 'gray',
        fontSize: 11,
        fontWeight: '100',
        textAlign: 'left'
    },
    foodName: {
        color: 'black',
        fontSize: 13,
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
        fontSize: 15,
        alignSelf: 'center'
    },
    quantityContainer: {
        flex:1,
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
        marginLeft: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: primary,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconWrapMinus: {
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
    icon: {
        fontSize: 17,
        color: primary
    }
};
