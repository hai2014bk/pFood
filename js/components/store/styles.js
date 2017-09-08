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
        paddingBottom: 10
    },
    imageBanner:{
		width : deviceWidth,
		height:137,
	},
    cellContainer: {
        backgroundColor: 'white',
        flex: 1,
        width: deviceWidth / 3 - 15,
        minWidth: 120,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderRadius: 5,
    },
    upContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    downContainer: {
        marginTop: 4,
        flex: 1,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#e7e9e5',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    saleView: {
        height: 15,
        width: 40,
        borderTopLeftRadius: 7.5,
        borderBottomLeftRadius: 7.5,
        alignSelf: 'flex-end',
        backgroundColor: 'orange'
    },
    saleText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
        alignSelf: 'center'
    },
    pageBanner: {
        flex: 1,
    },
    sectionText: {
        color: primary,
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'left'
    },
    foodThumnail: {
        marginTop: 5,
        height: 60,
        flex: 1,
    },
    oldPriceText: {
        color: 'gray',
        fontSize: 9,
        marginLeft: 5,
        marginRight: 2,
        fontWeight: '100',
        textAlign: 'left',
        textDecorationLine: 'line-through',
        marginTop: 6,
    },
    shopNameText: {
        color: 'gray',
        fontSize: 9,
        fontWeight: '100',
        textAlign: 'center',
        marginLeft: 3,
    },
    locationIcon: {
        fontSize: 9,
        color: 'gray',
        marginLeft: 3,
    },
    foodNameText: {
        marginTop: 5,
        marginLeft: 5,
        color: 'black',
        fontWeight: '500',
        fontSize: 12,
        maxWidth: 100,
        textAlign: 'left',
        alignSelf: 'flex-start',
        height: 28
    },
    priceText: {
        color: primary,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'left',
        marginLeft: 3,
    },
    mainContent: {
        flex: 3
    },
    itemWrap: {
        flexDirection: 'column',
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 5,
    },
    listItemWrap: {
        width: '50%',
        paddingHorizontal: 5
    },
    imageWrap: {
        width: '100%',
        height: 120,
        borderBottomWidth: 1,
        borderColor: '#E1E1E1'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    descriptionWrap: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 5,
    },
    products: {
        color: '#AAAAAA',
        fontSize: 12
    },
    starWrap: {
        width: 50,
        marginTop: 3
    },
    address: {
        color: '#555555',
        fontSize: 10,
    },
    bodyWrap: {
        flex: 1,
        padding: 10
    },
    titleWrap: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 2
    },
    moneyIcon: {
        width: 30,
        height: 30
    },
    title: {
        color: primary,
        fontSize: 17,
        marginLeft: 8,
        fontWeight: 'bold'
    },
    hotlineWrap: {
        flexDirection: 'row'
    },
    phoneIcon: {
        fontSize: 18,
        color: 'gray'
    },
    hotline: {
        color: 'blue',
        fontSize: 10,
        marginTop: 3,
        marginLeft: 5,
        textDecorationLine : 'underline'
    }
};
