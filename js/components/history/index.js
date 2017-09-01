import React, { Component } from "react";
import { AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
const items = [
    { id: 1, day: 12, month: 8, products: 5, payType: 'Thanh toán tiền mặt', address: '24T1 Hoàng Đạo Thúy', price: '1.150.000' },
    { id: 2, day: 10, month: 8, products: 3, payType: 'Thanh toán tiền mặt', address: 'Ngõ 76 Duy Tân', price: '700.000' },
    { id: 3, day: 5, month: 8, products: 2, payType: 'Thanh toán tiền mặt', address: '24T1 Hoàng Đạo Thúy', price: '1.000.000' }
]

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }

    renderList(item) {
        return (
            <View style={styles.listItemWrap}>
                <View style={styles.dayMonthWrap}>
                    <Text style={[styles.darkText, {fontSize:35}]}>{item.day}</Text>
                    <View style={styles.monthWrap}>
                        <Text style={[styles.darkText, {fontSize:20}]}>Tháng </Text>
                        <Text style={[styles.darkText, {fontSize:20}]}>{item.month}</Text>
                    </View>
                </View>
                <View style={styles.descriptionWrap}>
                    <Text style={styles.products}>{item.products} Sản phẩm</Text>
                    <View style={styles.flexRow}>
                        <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                        <Text style={styles.grayText}> {item.payType}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Icon name='ios-pin' style={styles.pinIcon} />
                        <Text style={[styles.grayText, {marginLeft:5}]}>{item.address}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}đ</Text>
                </View>
            </View>
        )
    }

    render() {
        const navigation = this.props.navigation
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} leftButton={() => navigation.navigate("DrawerOpen")} navi={navigation}
                    rightButton={false} title='Lịch sử mua hàng'>
                </HeaderContent>
                <Content>
                    <View style={styles.moneyCostWrap}>
                        <View style={[styles.payContainWrap, { borderRightWidth: 1 }]}>
                            <Text style={styles.grayText}>Số tiền tiêu trong ngày</Text>
                            <Text style={styles.blueNumber}>-900.000đ</Text>
                        </View>
                        <View style={styles.payContainWrap}>
                            <Text style={styles.grayText}>Số tiền tiêu trong tháng</Text>
                            <Text style={styles.blueNumber}>-10.000.000đ</Text>
                        </View>
                    </View>
                    <View style={styles.moneyInAccount}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                            <Text style={[styles.grayText, { fontSize: 17, marginLeft: 5 }]}>Số tiền trong tài khoản</Text>
                        </View>
                        <Text style={[styles.blueNumber, { fontWeight: 'bold', fontSize: 30 }]}>100,000,000đ</Text>
                    </View>
                    <View>
                        <List
                            showsVerticalScrollIndicator={false} dataArray={items}
                            renderRow={(item) =>
                                this.renderList(item)
                            }>
                        </List>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default History;
