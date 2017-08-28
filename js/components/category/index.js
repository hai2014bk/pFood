import React, { Component } from "react";
import { InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { fetchProduct } from "../../actions/fetchProduct.js"

import { Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Categories" })],
});
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: 1
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { params } = this.props.navigation.state
            var parameter = {
                "PageSize": 100,
                "PageIndex": this.state.index,
                "CategoryId": params.parent.id
            }
            this.props.fetch(parameter)
        })

    }

    componentWillReceiveProps(props) {
        if (props.fetchProduct.success) {
            var listFood = props.fetchProduct.data.model
            console.log('listFood', listFood)
            for (i in listFood) {
                listFood[i].quantity = 0
            }
            this.setState({ data: listFood })
        }
        if (!props.fetchProduct.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
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
    }

    minus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity - 1 > 0 ? this.state.data[rowID].quantity - 1 : 0,
        };
        this.setState({
            data: newArray
        });
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

    async add(item, rowID) {
        let food = this.state.data
        let data = [];
        if (item.quantity == 0) {
            Alert.alert('', 'Hãy chọn số lượng')
        } else {
            try {
                const value = await AsyncStorage.getItem('cartUser');
                if (value !== null) {
                    data = JSON.parse(value);
                }

            } catch (error) {
            }

            var temp = []
            for (i = 0; i < data.length; i++) {
                temp.push(data[i].id)
            }
            var a = temp.indexOf(item.id)
            if (a >= 0) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].id == item.id) {
                        let quantity = item.quantity
                        data[i].quantity = item.quantity + quantity
                    }
                }
            } else {
                data.push(item);
            }
            console.log('data', data)
            try {
                await AsyncStorage.setItem('cartUser', JSON.stringify(data));
            } catch (error) {
            }
        }
    }

    renderItems(data) {
        let item = data.item
        console.log(data.item.productMetaData[0])
        let id = item.id
        let price = this.priceHandle(item.price.toString())
        return (
            <Card style={styles.card}>
                <CardItem >
                    <Body>
                        <Grid >
                            <Col size={2} style={styles.imageWrap}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: data.item.productMetaData[0].value }} style={styles.image} />
                                </View>
                            </Col>
                            <Col size={3} style={styles.infoWrap}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.unit}> {item.minOrderedItems} {item.unitType}</Text>
                                <Row style={{ alignItems: 'flex-end' }} >
                                    <Icon name='ios-pin' style={styles.locationIcon} />
                                    <Text style={styles.shopName}>{item.cities}</Text>
                                </Row>
                                <View style={{ width: 50 }}>
                                    {this.renderStar(item.rate)}
                                </View>
                                <Text style={styles.price}>{price}đ</Text>
                            </Col>
                            <Col size={3} style={styles.buyColumn}>
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
                                    <Button addCart onPress={() => this.add(item, item.index)} >
                                        <Text numberOfLines={1} style={{ width: '100%', color: 'white', fontWeight: 'normal', fontSize: 12, textAlign: 'center' }}> Thêm vào giỏ </Text>
                                    </Button>
                                </Col>
                            </Col>
                        </Grid>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    render() {
        const navigation = this.props.screenProps.navi;
        const { params } = this.props.navigation.state
        return (
            <Container style={styles.container}>
                <HeaderContent rightButton={true} title={params.parent.name}
                    textLeft="Danh Mục"
                    leftButton={() => navigation.navigate(resetAction)}
                    rightButton={() => navigation.navigate("Cart")}
                />
                <Content style={styles.contentWrap}>
                    <FlatList style={{ marginBottom: 5, marginTop: 5 }}
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
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (parameter) => dispatch(fetchProduct(parameter)),
    };
}

const mapStateToProps = state => ({
    fetchProduct: state.fetchProduct,
});

export default connect(mapStateToProps, bindActions)(Category);