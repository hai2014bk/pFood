
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
            productData: [],
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
            var products = props.fetchHistoryDetail.data.model.orderedProducts
            for (i in products) {
                products[i].rate = 0
            }
            this.setState({ order: props.fetchHistoryDetail.data.model, productData: products })
        }
    }

    priceHandle(price) {
        var count = 0
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }


    renderDetail() {
        var data = this.state.productData
        console.log('data', data)
        return (
            <FlatList
                data={data}
                extraData={this.state}
                keyExtractor={item => item.id}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
    renderItem(item) {
        let product = item.product
        let proPrice = product.price * item.quantity / product.quantityStep;
        proPrice = this.priceHandle(proPrice)
        let price = '10.000'
        let quantity = item.quantity
        return (
            <View style={styles.proDetail}>
                <View style={styles.flexCol}>
                    <View style={styles.textProInput}>
                        <Left>
                            <Text style={styles.productBlackText}>{product.name}</Text>
                        </Left>
                        <Right>
                            <Text style={styles.productText}>{proPrice}đ</Text>
                        </Right>
                    </View>
                    <View style={styles.textProInput}>
                        <Text style={styles.shopText}>Vinmart</Text>
                        <Text style={styles.proNumber}>Số lượng: {quantity}</Text>
                        <Text style={styles.proNumber}>Vận chuyển : Grab</Text>
                    </View>
                    <View style={{width:'40%'}}>
                        {this.renderStar(item)}
                    </View>
                </View>
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
        return (
            <StarRating
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={item.rate}
                starColor={primary}
                selectedStar={(rating) => this.onStarRatingPress(rating, item)}
                starSize={25}
            />
        )
    }
    onStarRatingPress(rating, item) {
        console.log('ratea')
        var products = this.state.productData
        for (i in products) {
            if (products[i].id == item.id) {
                products[i].rate = rating
            }
        }
        this.setState({ productData: products })
    }
    rate()
    {
        var product = this.state.productData
        this.setState({visible:true})
        for (i in product){
            if (product[i].rate > 0) {
                var params = {
                    "ProductId":product[i].productId,
                    "RatePoint":product[i].rate
                }
                this.props.updateRate(params)
            }
        }
        setTimeout(()=>{
            this.setState({visible:false}),
            this.showSuccessRate()
        },2000)
    }

    showSuccessRate(){
        setTimeout(() => { Alert.alert('Thành công', 'Đánh giá sản phẩm thành công') },100)
    }

    render() {
        var mdh = "F001"
        var data = this.state.order
        var totalPrice = ''
        if (data) {
            let totalPrice = this.priceHandle(data.totalPrice);
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
                    <Input style={styles.textInput} disabled placeholder="Nguyen Van A" placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled placeholder={data.deliveryAddress} placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled placeholder="0123456789" placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled placeholder="Nguyen.Van.Nam@gmail.com" placeholderTextColor='#A4A4A4' />
                    <View style={styles.footer}></View>
                    <Button style={{marginBottom:20}} block success onPress={() => { this.rate() }}>
                        <Text>Đánh giá</Text>
                    </Button>
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