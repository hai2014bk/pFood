import React, { Component } from "react";
import { InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import * as mConstants from '../../utils/Constants'
import { connect } from "react-redux";
import * as appFunction from "../../utils/function"
import { reRenderHeader } from '../../actions/header'
import Swipeable from 'react-native-swipeable';

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
            data: [],
            totalPrice: 0,
            disabled: false,
            disableMinus: false,
            listScroll:true,
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
                    var quantity = data[i].quantity / data[i].quantityStep
                    totalPrice += (data[i].price * quantity)
                    console.log('asjmd12a32121',totalPrice,quantity,data[i].price,data[i].price * quantity )
                    totalPrice = Math.round(totalPrice)
                    this.setState({ totalPrice })
                }
            }

        } catch (error) {
        }
    }
    componentWillReceiveProps(props) {
        if (props.addOrder.success == true) {
            this.setState({ data: [] })
        }
    }

    async plus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity + this.state.data[rowID].quantityStep
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
        console.log('d3qdasd',data.item.quantity)
       if (data.item.quantity <= data.item.quantityStep && data.item.quantity != data.item.minOrderedItems){
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].minOrderedItems ,
        };
        this.setState({
            data: newArray
        });
        try {
            await AsyncStorage.setItem(mConstants.CART, JSON.stringify(newArray));
        } catch (error) {
        }
        this.totalPrice(newArray)
       } else {
            if (data.item.quantity == data.item.minOrderedItems) {
                this.setState({disableMinus:true})
                Alert.alert(
                    '',
                    'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?',
                    [
                        { text: 'Chắc chắn', onPress: () => this.remove(rowID) },
                        { text: 'Không', onPress: () => this.setState({ disableMinus: false }), style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            } else {
                this.setState({ disableMinus: false })
                let newArray = this.state.data.slice(0);
                newArray[rowID] = {
                    ...this.state.data[rowID],
                    quantity: this.state.data[rowID].quantity - this.state.data[rowID].quantityStep > 0 ? this.state.data[rowID].quantity - this.state.data[rowID].quantityStep : this.state.data[rowID].quantityStep,
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
        this.setState({
            data: tempArray,
        })
        try {
            await AsyncStorage.setItem(mConstants.CART, JSON.stringify(tempArray));
            this.props.reRenderHeader()
        } catch (error) {
        }
        this.totalPrice(tempArray)
    }

    priceHandle(price) {
        var count = 0
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }

    renderItems(data) {
        let item = data.item
        let id = item.id
        let quantity = appFunction.handleUnitType(item.unitType, item.quantity)
        let price = this.priceHandle(item.price.toString())
        var disabled = false
        var disableMinus = this.state.disableMinus
        var color = primary
        var active = 0.2
        if (item.quantity < 0) {
            disabled = true
            disableMinus = true
            active = 1
        }
        var imageUrl = 'http://runawayapricot.com/wp-content/uploads/2014/09/placeholder.jpg'        
        for (i in item.productMetaData) {
			if (item.productMetaData[i].name == 'ImageUrl') {
				if (item.productMetaData[i]) {
					imageUrl = item.productMetaData[i].value
				}
			}
		}
        const rightButtons = [
            <TouchableOpacity style={styles.trashWrap} onPress={() => this.remove(data.index)}>
            <Icon active name="trash" style={styles.iconTrash} />
        </TouchableOpacity>
          ];
        return (
            <Swipeable
                rightButtons={rightButtons}
                rightButtonWidth={100}
                onSwipeStart={() => this.setState({listScroll: false})}
                onSwipeRelease={() => this.setState({listScroll: true})}               
            >
            <View style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageUrl }} style={styles.image} />
                        </View>
                        <View style={styles.infoWrap}>
                            <Text style={styles.foodName}>{item.name}</Text>
                            <Text style={styles.price} > {price}đ/ <Text style={styles.perPrice}>{item.quantityStep} {item.unitType}</Text></Text>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <TouchableOpacity disabled={this.state.disabled} onPress={() => this.minus(data, data.index)} style={styles.buttonMinus}>
                                    <Icon style={styles.icon} name="md-remove" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.plus(data.index)} style={styles.buttonAdd}>
                                    <Icon name="md-add" style={styles.icon} />
                                </TouchableOpacity>
                                <Text style={styles.x}>x </Text>
                                <Text style={styles.quantity}>{quantity} </Text>
                            </View>
                        </View>
                    </View>
            </Swipeable>
        )
    }

    totalPrice(newArray) {
        totalPrice = 0
        for (i = 0; i < newArray.length; i++) {
            quantity = newArray[i].quantity / newArray[i].quantityStep
            totalPrice += newArray[i].price * quantity
            totalPrice = Math.round(totalPrice)            
        }
        this.setState({ totalPrice })
    }
    renderList() {
        if (this.state.data.length > 0) {
            return (
                <FlatList scrollEnabled={this.state.listScroll} style={styles.listViewWrap}
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
    openBilling() {
        if (this.state.data.length > 0) {
            this.setState({ disabled: true })
            const navigation = this.props.navigation;
            navigation.navigate("Billing")
            InteractionManager.runAfterInteractions(() => {
                this.setState({ disabled: false })
            })
        }
    }

    render() {
        let content = null
        let num = this.state.totalPrice
        let price = this.priceHandle(num)
        const navigation = this.props.navigation;
        if (this.state.data.length > 0) {
            content = (
                <Content scrollEnabled={this.state.listScroll} bounces={false} style={styles.contentWrap}>
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
                    <TouchableOpacity disabled={this.state.disabled} style={styles.checkoutWrap} onPress={() => { this.openBilling() }}>
                        <Text style={styles.checkout}> Thanh toán </Text>
                    </TouchableOpacity>
                </Content>
            )
        } else {
            content = (
                <Content style={styles.contentWrap}>
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>Không có sản phẩm nào {"\n"} trong giỏ hàng</Text>
                    </View>
                </Content>
            )
        }
        return (
            <Container style={styles.container}>
                <HeaderContent title="Giỏ hàng"
                    leftButton={() => navigation.goBack()}
                    leftIcon="ios-arrow-back" />
                {content}
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
        fetch: (id) => dispatch(fetchDetail(id)),
        reRenderHeader: () => dispatch(reRenderHeader())
    };
}

const mapStateToProps = state => ({
    addOrder: state.addOrder,
});

export default connect(mapStateToProps, bindActions)(Cart);
