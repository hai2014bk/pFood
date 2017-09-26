
import React, { Component } from "react";
import { Modal, Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, FlatList, AsyncStorage } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Card, Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import HeaderContent from "./../headerContent/";
import styles from "./styles";
import StarRating from 'react-native-star-rating';
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
import * as mConstants from '../../utils/Constants';
import * as appFunction from "../../utils/function"
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchHistoryDetail, updateRate } from "../../actions/fetchHistories.js"
var background = require('../../../images/background.png')
const primary = require("../../themes/variable").brandPrimary;
var money = require('../../../images/money.png')
var food = ''


class HistoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipKey: 'vPost',
            payKey: 'cash',
            visible: false,
            totalPrice: 0,
            data: [],
            order: '',
            checked: false,
            shipServices: {
                vPost: true,
                aDayroi: false,
                grab: false,
                uber: false
            },
            pay: {
                cash: true,
                bankCard: false,
                creditCard: false
            },
            addClick: true,
            data: [],
            order: [],
            rate: 0
        };

    }

    componentDidMount() {

        let params = this.props.navigation.state.params.item
        this.props.fetch(params.id)
        console.log('props', params)
    }

    componentWillReceiveProps(props) {
        if (props.fetchHistoryDetail.success) {
            var order = props.fetchHistoryDetail.data.model
            var stores = order.orderParcels
            for (st in stores) {
                var store = stores[st]
                var parcelProducts = store.parcelProducts
                for (it in parcelProducts) {
                    parcelProducts[it].product.rate = 0
                }
            }
            order.orderParcels = stores
            this.setState({ order: order })
        }
    }

    priceHandle(price) {
        var count = 0
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }


    renderDetail() {
        console.log('saodpq2wdas2211', this.state.data)
        let order = this.state.order
        var stores = []
        if (order.orderParcels) {
            stores = order.orderParcels
        }
        return (
            <FlatList
                data={stores}
                keyExtractor={item => item.id}
                extraData={this.state}
                renderItem={({ item }) => this.renderStoreItems(item)}
            ></FlatList>
        );
    }
    renderItem(data) {
        var item = data.product
        let proPrice = item.price * data.quantity / item.quantityStep;
        let price = this.priceHandle(proPrice.toString())
        let quantity = appFunction.handleUnitType(item.unitType, data.quantity)
        console.log('12njskadasda', data)
        return (
            <View style={styles.proDetail}>
                <View style={styles.flexCol}>
                    <View style={styles.textProInput}>
                        <Left>
                            <Text style={styles.productBlackText}>{item.name}</Text>
                        </Left>
                        <Right>
                            <Text style={styles.productText}>{price}đ</Text>
                        </Right>
                    </View>
                    <Text style={styles.proNumber}>Số lượng: {quantity} </Text>
                </View>
                <View style={{ width: '40%' }}>
                    {this.renderStar(item)}
                </View>

            </View>
        )
    }
    renderStoreItems(item) {
        console.log('đáq2edasdas11`1`', item)
        var color = ''
        var statusText = ''
        var status = item.status
        if (status == 'Submitted') {
            color = 'orange'
            statusText = 'Đang chờ'
        }
        if (status == 'Delivered') {
            color = 'green'
            statusText = 'Đã thanh toán'
        }
        if (status == 'Canceled') {
            color = 'red'
            statusText = 'Đã huỷ'
        }
        return (
            <View style={styles.wrapStoreItems}>
                <Text style={styles.storeNameText}>Cửa hàng: {item.store.name} </Text>
                <Text style={styles.shipTypeText}>Trạng thái: <Text style={[styles.shopText, { color: color }]}> {statusText} </Text> </Text>
                <Text style={styles.shipTypeText}>Vận chuyển: <Text style={styles.shopText}> {item.deliveryMethod} </Text> </Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={item.parcelProducts}
                    extraData={this.state}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this.renderItem(item)}
                ></FlatList>
            </View>
        )
    }

    pickerWrap(text, key, type) {
        let shipServices = type === 'ship' ? this.state.shipServices : this.state.pay;
        let checked = shipServices[key] ? true : false;
        if (key !== 'cash' && type !== 'ship') {
            return (
                <TouchableOpacity disabled={true} style={styles.pickerWrap}>
                    <CheckBox disabled={true} style={styles.checkBoxDisable} color='#f2f4f4' checked={false} />
                    <Text style={styles.checkboxTextDisable}>{text}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity disabled={true} onPress={() => this.updateStatus(key, type)} style={styles.pickerWrap}>
                    <CheckBox disabled={true} style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
                    <Text style={styles.checkboxText}>{text}</Text>
                </TouchableOpacity>
            )
        }
    }
    renderStar(item) {
        var disabled = item.rated
        return (
            <StarRating
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                disabled={disabled}
                rating={item.rate}
                starColor={primary}
                selectedStar={(rating) => this.onStarRatingPress(rating, item)}
                starSize={25}
            />
        )
    }
    onStarRatingPress(rating, item) {
        var order = this.state.order
        var stores = order.orderParcels
        for (st in stores) {
            var store = stores[st]
            var parcelProducts = store.parcelProducts
            for (it in parcelProducts) {
                if (parcelProducts[it].product.id == item.id) {
                    console.log('213812kdfcads', parcelProducts[it].product.id, item.id)
                    parcelProducts[it].product.rate = rating
                    parcelProducts[it].product.rated = true
                    Alert.alert(
                        '',
                        'Bạn có muốn đánh giá sản phẩm này ?',
                        [
                            { text: 'Chắc chắn', onPress: () => this.rate(item,rating) },
                            { text: 'Không', onPress: () => this.dismissRate(item), style: 'cancel' },
                            { onDismiss: () => {this.dismissRate(item)} }
                        ],
                        { cancelable: false }
                    )
                }
            }
            stores.parcelProducts = parcelProducts
        }
        order.orderParcels = stores
        this.setState({ order: order })
    }
    dismissRate(item){
        var order = this.state.order
        var stores = order.orderParcels
        for (st in stores) {
            var store = stores[st]
            var parcelProducts = store.parcelProducts
            for (it in parcelProducts) {
                if (parcelProducts[it].product.id == item.id) {
                    parcelProducts[it].product.rated = false
                    parcelProducts[it].product.rate = 0
                }
            }
            stores.parcelProducts = parcelProducts
        }  
        order.orderParcels = stores
        this.setState({ order: order })  
    }
    rate(item, rating) {
        var params = {
            "ProductId": item.id,
            "RatePoint": rating
        }
        this.props.updateRate(params)

        this.showSuccessRate()
    }

    showSuccessRate() {
        setTimeout(() => { Alert.alert('Thành công', 'Đánh giá sản phẩm thành công') }, 100)
        this.setState({ disabled: true })
    }

    render() {
        var mdh = "F"
        var data = this.state.order
        var lastName = ''
        var email = ''
        var phoneNumber = ''
        var deliveryAddress = ''
        if (data.user) {
            lastName = data.user.firstName
            email = data.user.email
            mdh += data.id
        }
        var totalPrice = ''
        if (data.totalPrice) {
            totalPrice = this.priceHandle(data.totalPrice);
        }
        var color = ''
        var active = ''
        if (this.state.disabled) {
            color = '#cecece'
            active = 1
        } else {
            active = 0.2
            color = primary
        }
        const navigation = this.props.navigation;
        return (
            <Container style={styles.containerWrap}>
                <Spinner visible={this.state.visible} />
                <HeaderContent title="Chi tiết đơn hàng"
                    leftButton={() => navigation.goBack()}
                    leftIcon='ios-arrow-back'
                />
                <Content keyboardShouldPersistTaps='handled' style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.headerTitle}>
                        <Image source={food} style={styles.moneyIcon} resizeMode='contain' />
                        <Text style={styles.infoDetail}>Thông tin chi tiết</Text>
                    </View>
                    <View style={styles.proDetail}>
                        <Text style={styles.productText}>Mã đơn Hàng: {mdh}</Text>
                    </View>
                    {this.renderDetail()}
                    <View style={styles.totalPrice}>
                        <Left>
                            <Text style={styles.productBlackText}>Tổng:</Text>
                        </Left>
                        <Right>
                            <Text style={styles.totalPriceText}>{totalPrice}đ</Text>
                        </Right>
                    </View>
                    <View style={styles.headerTitle}>
                        <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                        <Text style={styles.infoDetail}>Hình thức thanh toán</Text>
                    </View>
                    {this.pickerWrap('Tiền mặt', 'cash', 'pay')}
                    {this.pickerWrap('Thẻ ngân hàng', 'bankCard', 'pay')}
                    {this.pickerWrap('Thẻ tín dụng', 'creditCard', 'pay')}
                    <View style={styles.headerTitle}>
                        <Icon name="ios-contact" style={styles.userIcon} />
                        <Text style={styles.infoDetail}>Thông tin người đặt</Text>
                    </View>
                    <Input style={styles.textInput} disabled multiline = {true} value={lastName} placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled multiline = {true} value={data.deliveryAddress} placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled multiline = {true} value={data.contactNumber} placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled multiline = {true} value={email} placeholderTextColor='#A4A4A4' />
                    <View style={styles.footer}></View>
                </Content>

            </Container>
        );
    }

}
function bindActions(dispatch) {
    return {
        fetch: (id) => dispatch(fetchHistoryDetail(id)),
        updateRate: (params) => dispatch(updateRate(params))
    };
}

const mapStateToProps = state => ({
    fetchHistoryDetail: state.fetchHistoryDetail,
});

export default connect(mapStateToProps, bindActions)(HistoryDetail);