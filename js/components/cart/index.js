import React, { Component } from "react";
import { FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";

import { Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Categories" })],
});
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // { id: 0, name: 'Thit bo 1', unit: '50g', rate: 3.5, shopName: 'Shop 1', price: '20000', quantity: 1 },
                // { id: 1, name: 'Thit bo 2', unit: '50g', rate: 1, shopName: 'Shop 2', price: '25000', quantity: 2 },
                // { id: 2, name: 'Thit bo 3', unit: '50g', rate: 5, shopName: 'Shop 3', price: '10000', quantity: 3 },
            ],
            totalPrice: 0
        };
    }

    async componentDidMount() {
        totalPrice = 0
        let data = []
        this.setState({ totalPrice })
        try {
            const value = await AsyncStorage.getItem('cartUser');
            if (value !== null) {
                data = JSON.parse(value)
                this.setState({ data })
                for (i = 0; i < data.length; i++) {
                    totalPrice += data[i].price * data[i].quantity
                    this.setState({ totalPrice })
                }
            }

        } catch (error) {
        }
    }

    plus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity + 1
        }
        this.setState({
            data: newArray,
        });
        this.totalPrice(newArray)
    }

    minus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity - 1 > 0 ? this.state.data[rowID].quantity - 1 : 1,
        };
        this.setState({
            data: newArray
        });
        this.totalPrice(newArray)
    }
    renderStar(rate) {
        return (
            <StarRating
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                disabled={true}
                maxStars={5}
                rating={rate}
                starColor={primary}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starSize={13}
            />
        )
    }

    remove(rowID) {
        let tempArray = this.state.data
        tempArray.splice(rowID, 1)
        this.setState({
            data: tempArray,
        })
    }

    priceHandle(price) {
        var count = 0
        for (var i = price.length; i--; i > 0) {
            count += 1
            if (count == 4) {
                price = this.insertString(price, i + 1, '.')
                count = 0
            }
        }
        return price
    }
    insertString(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    renderItems(data) {
        let item = data.item
        console.log('data', data.item.productMetaData[0].value)
        let id = item.id
        let price = this.priceHandle(item.price.toString())
        return (
            <View style={styles.card}>
                <Grid >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: data.item.productMetaData[0].value }} style={styles.image} />
                    </View>
                    <View style={styles.infoWrap}>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={styles.price}>{price}đ</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => this.plus(data.index)} style={styles.buttonAdd}>
                                <Icon name="md-add" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.minus(data.index)} style={styles.buttonMinus}>
                                <Icon style={styles.icon} name="md-remove" />
                            </TouchableOpacity>
                            <Text style={styles.x}>X</Text>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                        </View>
                    </View>
                    {/* <Col size={3} style={styles.buyColumn}>
                        <Col style={styles.buttonWrap}>
                            <TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
                                <Icon name="md-add" style={styles.icon} />
                            </TouchableOpacity>
                            <Col style={styles.quantityContainer}>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                            </Col>
                            <TouchableOpacity style={styles.iconWrapMinus} onPress={() => this.minus(data.index)} >
                                <Icon style={styles.icon} name="md-remove" />
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.buttonAddCard}>
                            <TouchableOpacity onPress={() => this.remove(data.index)} style={styles.removeButton}>
                                <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'normal', fontSize: 12, alignSelf: 'center' }}> Xóa </Text>
                            </TouchableOpacity>
                        </Col>
                    </Col> */}
                </Grid>
            </View>
        )
    }

    totalPrice(newArray) {
        totalPrice = 0
        for (i = 0; i < newArray.length; i++) {
            totalPrice += newArray[i].price * newArray[i].quantity
        }
        this.setState({ totalPrice })
    }

    render() {
        let num = this.state.totalPrice
        num = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <HeaderContent title="Giỏ hàng"
                    leftButton={() => navigation.goBack()}
                    leftIcon="ios-arrow-back" />
                <Content style={styles.contentWrap}>
                    <FlatList style={{ marginBottom: 5, marginTop: 15, backgroundColor: 'white' }}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <ListItem style={{ marginBottom: -25, borderBottomWidth: 0 }} >
                                {this.renderItems(item)}
                            </ListItem>
                        )
                        }
                    />
                    <View style={styles.footer}>
                        <Text style={[styles.totalPrice, {marginLeft:20}]}>Tổng: </Text>
                        <View style={{flexDirection:'row',width:'85%', justifyContent:'flex-end', }}>
                            <Image source={money} style={{ height: 30, width: 30 }} resizeMode='contain' />
                            <Text style={[styles.totalPrice, {fontSize:20}]}> {num}đ</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.checkoutWrap}>
                        <Text style={styles.checkout}> Thanh toán </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

export default Cart;
