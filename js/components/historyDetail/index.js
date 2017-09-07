
import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, FlatList, AsyncStorage } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import HeaderContent from "./../headerContent/";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
import * as mConstants from '../../utils/Constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { addOrder } from "../../actions/addOrder.js"
var background = require('../../../images/background.png')
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
            data: [
                { id: 1, name: 'Chân gà', quantity: 2, quantityStep: 100, unitType: 'g', price: 10000, shipType:'Grab' },
                { id: 2, name: 'Cánh gà', quantity: 2, quantityStep: 100, unitType: 'g', price: 10000, shipType:'Grab' },
            ]
        };

    }

    componentDidMount() {

        let data = this.props.navigation.item
        console.log('props', data)
    }

    componentWillReceiveProps(props) {

    }

    priceHandle(price) {
        var count = 0
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }


    renderDetail() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => this.renderItem(item)}
            ></FlatList>
        );
    }
    renderItem(item) {
        let proPrice = item.price * item.quantity / item.quantityStep;
        let price = this.priceHandle(proPrice.toString())
        let quantity = item.quantity
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
                    <View style={styles.textProInput}>
                        <Text style={styles.shopText}>Vinmart</Text>
                        <Text style={styles.proNumber}>Số lượng: {quantity}{item.unitType}</Text>
                        <Text style={styles.proNumber}>Vận chuyển : {item.shipType}</Text>
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
                <TouchableOpacity style={styles.pickerWrap}>
                    <CheckBox style={styles.checkBoxDisable} color='#f2f4f4' checked={false} />
                    <Text style={styles.checkboxTextDisable}>{text}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.updateStatus(key, type)} style={styles.pickerWrap}>
                    <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
                    <Text style={styles.checkboxText}>{text}</Text>
                </TouchableOpacity>
            )
        }
    }
    render() {
        let total = this.state.totalPrice;
        let totalPrice = this.priceHandle(total.toString());
        var mdh = "F001"
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
                    <Input style={styles.textInput} disabled placeholder="24T1 Hoang Dao Thuy" placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled placeholder="0123456789" placeholderTextColor='#A4A4A4' />
                    <Input style={styles.textInput} disabled placeholder="Nguyen.Van.Nam@gmail.com" placeholderTextColor='#A4A4A4' />
                    <View style={styles.footer}></View>
                </Content>

            </Container>
        );
    }

}
function bindActions(dispatch) {
    return {
        add: (params) => dispatch(addOrder(params)),
    };
}

const mapStateToProps = state => ({
    addOrder: state.addOrder,
});

export default connect(mapStateToProps, bindActions)(HistoryDetail);