import React, { Component } from "react";
import { FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import * as mConstants from '../../utils/Constants'

import { Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail, SwipeRow } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
            totalPrice: 0
        };
    }

    async componentDidMount() {
        totalPrice = 0
        let data = []
        this.setState({ totalPrice })
        try {
            const value = await AsyncStorage.getItem(mConstants.CART);
            if (value !== null) {
                data = JSON.parse(value)
                console.log('value', data)
                this.setState({ data })
                for (i = 0; i < data.length; i++) {
                    totalPrice += data[i].price * data[i].quantity
                    this.setState({ totalPrice })
                }
            }

        } catch (error) {
        }
    }

    async plus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity + 1
        }
        this.setState({
            data: newArray,
        });
        try {
            await AsyncStorage.setItem(mConstants.CART, JSON.stringify(newArray));
        } catch (error) {
        }
        this.totalPrice(newArray)
    }

    async minus(data, rowID) {
        console.log('data', data)
        if (data.item.quantity == 1) {
            Alert.alert(
                '',
                'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng',
                [
                    { text: 'Chắc chắn', onPress: () => this.remove(rowID) },
                    { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            )
        } else {
            let newArray = this.state.data.slice(0);
            newArray[rowID] = {
                ...this.state.data[rowID],
                quantity: this.state.data[rowID].quantity - 1 > 0 ? this.state.data[rowID].quantity - 1 : 1,
            };
            this.setState({
                data: newArray
            });
            try {
                await AsyncStorage.setItem(mConstants.CART, JSON.stringify(newArray));
            } catch (error) {
            }
            this.totalPrice(newArray)
        }
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

    async remove(rowID) {
        let tempArray = this.state.data
        tempArray.splice(rowID, 1)
        console.log('wwqwqqw', rowID, tempArray)
        this.setState({
            data: tempArray,
        })
        try {
            await AsyncStorage.setItem(mConstants.CART, JSON.stringify(tempArray));
        } catch (error) {
        }
        this.totalPrice(tempArray)
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
        let id = item.id
        let price = this.priceHandle(item.price.toString())
        return (
            <SwipeRow
                list={true}
                disableRightSwipe={true}
                stopRightSwipe={-100}
                rightOpenValue={-100}
                body={
                    <View style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: data.item.productMetaData[0].value }} style={styles.image} />
                        </View>
                        <View style={styles.infoWrap}>
                            <Text style={styles.foodName}>{item.name}</Text>
                            <Text style={styles.price}>{price}đ</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <TouchableOpacity onPress={() => this.minus(data, data.index)} style={styles.buttonMinus}>
                                    <Icon style={styles.icon} name="md-remove" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.plus(data.index)} style={styles.buttonAdd}>
                                    <Icon name="md-add" style={styles.icon} />
                                </TouchableOpacity>
                                <Text style={styles.x}>X</Text>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                }
                right={
                    <TouchableOpacity style={styles.trashWrap} onPress={() => this.remove(data.index)}>
                        <Icon active name="trash" style={styles.iconTrash} />
                    </TouchableOpacity>
                }
            />
        )
    }

    totalPrice(newArray) {
        totalPrice = 0
        for (i = 0; i < newArray.length; i++) {
            totalPrice += newArray[i].price * newArray[i].quantity
        }
        this.setState({ totalPrice })
    }
    renderList() {
        if (this.state.data.length > 0) {
            return (
                <FlatList style={styles.listViewWrap}
                    data={this.state.data}
                    extraData={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (
                        <View style={styles.listItem} >
                            {this.renderItems(item)}
                        </View>
                    )
                    }
                />
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    render() {
        let num = this.state.totalPrice
        let price = this.priceHandle(num.toString())
        console.log('styate', this.state.data)
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <HeaderContent title="Giỏ hàng"
                    leftButton={() => navigation.goBack()}
                    leftIcon="ios-arrow-back" />
                <Content style={styles.contentWrap}>
                    <View>
                        {this.renderList()}
                    </View>
                    <View style={styles.footer}>
                        <Text style={[styles.totalPrice, { marginLeft: 20 }]}>Tổng: </Text>
                        <View style={styles.footerRightWrap}>
                            <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                            <Text style={[styles.totalPrice, { fontSize: 20 }]}> {price}đ</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.checkoutWrap} onPress={() => navigation.navigate("Billing")}>
                        <Text style={styles.checkout}> Thanh toán </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

export default Cart;
