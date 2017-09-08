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
        flex: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
        backgroundColor: 'white',
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
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
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
    locationIcon: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 3,
        marginRight: 5,
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
        justifyContent: 'center',
        marginTop: 20,
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
        flex: 4,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: -10,
    },
    quantity: {
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center'
    },
    quantityContainer: {
        width:45,
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
