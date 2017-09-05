import React, { Component } from "react";
import { InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { fetchProduct } from "../../actions/fetchProduct.js"
import * as appFunction from "../../utils/function"

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
class FoodRelate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: 1
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const food = this.props.food
            var parameter = {
                "PageSize": 100,
                "PageIndex": this.state.index,
                "CategoryId": food.parrentId
            }
            this.props.fetch(parameter)
        })

    }

    componentWillReceiveProps(props) {
        if (props.fetchProduct.success) {
            var listFood = props.fetchProduct.data.model
            console.log(listFood)
            for (i in listFood) {
                if (this.props.food.id == listFood[i].id) {
                    listFood.splice(i, 1)
                }
                listFood[i].quantity = listFood[i].quantityStep
            }
            this.setState({ data: listFood })
        }
        if (!props.fetchProduct.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
    }
   

    plus(rowID) {
        let newArray = this.state.data.slice(0);
        console.log(rowID, this.state.data[rowID], newArray[rowID])
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity + this.state.data[rowID].quantityStep
        }
        this.setState({
            data: newArray,
        });
    }

    minus(rowID) {
        let newArray = this.state.data.slice(0);
        newArray[rowID] = {
            ...this.state.data[rowID],
            quantity: this.state.data[rowID].quantity - this.state.data[rowID].quantityStep > 0 ? this.state.data[rowID].quantity - this.state.data[rowID].quantityStep : 0,
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
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }
    insertString(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    openDetail(food) {
        console.log('open')
        this.props.screenProps.navi.navigate('FoodTab', { parrent: food })
    }
    renderItems(data) {
        let item = data.item
        let id = item.id
        let active = 0
        let color = ''
        var quantity = item.quantity        
        if (item.quantity > 0) {
            active = 0.2,
                color = primary
        } else {
            active = 1,
                color = '#cecece'
        }
        let price = this.priceHandle(item.price.toString())
        return (
            <TouchableOpacity onPress={() => { this.openDetail(item) }}>
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
                                    <Text style={styles.unit}> {item.quantityStep} {item.unitType}</Text>
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
                                        <TouchableOpacity activeOpacity={active} style={[styles.iconWrapMinus, {borderColor:color}]} onPress={() => this.minus(data.index)} >
                                            <Icon style={[styles.icon, {color:color}]} name="md-remove" />
                                        </TouchableOpacity>
                                        <Col style={styles.quantityContainer}>
                                            <Text style={styles.quantity}>{quantity} {item.unitType}</Text>
                                        </Col>
                                        <TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
                                            <Icon name="md-add" style={styles.icon} />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={styles.buttonAddCard}>
                                        <Button addCart onPress={() => { appFunction.add(item) }} >
                                            <Text numberOfLines={1} style={{ width: '100%', color: 'white', fontWeight: 'normal', fontSize: 12, textAlign: 'center' }}> Thêm vào giỏ </Text>
                                        </Button>
                                    </Col>
                                </Col>
                            </Grid>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        const navigation = this.props.screenProps.navi;
        return (
            <Container style={styles.container}>
                <Content style={styles.contentWrap}>
                    <FlatList style={{ marginBottom: 5, marginTop: 5 }}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <View style={{ flex: 1, borderBottomWidth: 0 }} >
                                {this.renderItems(item)}
                            </View>
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

export default connect(mapStateToProps, bindActions)(FoodRelate);

{/* <Col style={styles.buttonWrap}>
<Button onPress={() => this.plus(id)} transparent >
    <Icon name="md-add" />
</Button>
<Text style={styles.quantity}>{item.quantity}</Text>
<Button onPress={() => this.minus(id)} transparent >
    <Icon name="md-remove" />
</Button>
</Col>
<Col style={styles.cartWrap}>
<Button transparent >
    <Icon active name="md-cart" />
</Button>
</Col> */}