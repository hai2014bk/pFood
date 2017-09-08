import React, { Component } from "react";
import { InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { fetchTrending } from "../../actions/fetchTrending.js"
import {reRenderHeader} from '../../actions/header'
import { Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, CheckBox } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import * as appFunction from "../../utils/function"
import * as mConstants from '../../utils/Constants'


import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Categories" })],
});
class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            shipTypes: {
                ViettelPost: true,
                Adayroi: false,
                Grab: false,
                Uber: false
            },
            item: {},
            ship: 'ViettelPost',
        };
    }

    componentDidMount() {
        var date = new Date()
        let isoDate = date.toISOString().slice(0, -1)
        var params = {
            "PageSize": "20",
            "PageIndex": "1",
            "LastViewedDate": "2017-08-20T15:20:34.8699498"
        }
        this.props.fetch(params)
    }

    componentWillReceiveProps(props) {
        if (props.fetchTrending.success) {
            if (props.fetchTrending.data.model.length > 0) {
                var listFood = this.state.data.concat(props.fetchTrending.data.model)
                for (i in listFood) {
                    listFood[i].quantity = listFood[i].quantityStep
                }
                this.setState({ data: listFood })
            }
        }
        if (!props.fetchTrending.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
    }

    plus(rowID) {
        let newArray = this.state.data.slice(0);
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

    openDetail(food) {
        // const { params } = this.props.navigation.state
        // food.parrentId = params.parent.id
        this.props.navigation.navigate('FoodTab', { parrent: food })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })

    }

    renderItems(data) {
        let item = data.item
        let active = 0
        let color = ''
        var quantity = appFunction.handleUnitType(item.unitType, item.quantity)
        if (item.quantity > 0) {
            active = 0.2,
                color = primary,
                buttonAdd = (
                    <Button addCart onPress={() => { this.addtoCart(item); this.setState({ item }) }} >
                        <Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
                    </Button>
                )
        } else {
            active = 1,
                color = '#cecece',
                buttonAdd = (
                    <Button disabled={true} style={{ backgroundColor: '#cecece' }} addCart >
                        <Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
                    </Button>
                )
        }
        let id = item.id
        let price = this.priceHandle(item.price.toString())

        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => { this.setState({ disabled: true }), this.openDetail(item) }}>
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
                                <TouchableOpacity activeOpacity={1} style={styles.buyColumn}>
                                    <Col style={styles.buttonWrap}>
                                        <TouchableOpacity activeOpacity={active} style={[styles.iconWrapMinus, { borderColor: color }]} onPress={() => this.minus(data.index)} >
                                            <Icon style={[styles.icon, { color: color }]} name="md-remove" />
                                        </TouchableOpacity>

                                        <Col style={styles.quantityContainer}>
                                            <Text style={styles.quantity}>{quantity}</Text>
                                        </Col>
                                        <TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
                                            <Icon name="md-add" style={styles.icon} />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={styles.buttonAddCard}>
                                        {buttonAdd}
                                    </Col>
                                </TouchableOpacity>
                            </Grid>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    async addtoCart(item) {
        let data = []
        try {
            const value = await AsyncStorage.getItem(mConstants.CART);
            if (value !== null) {
                data = JSON.parse(value)
                if (data.length > 0) {
                    for (let i = 0; i <= data.length; i++) {
                        if (data[i].purveyorId == item.purveyorId) {
                            item.shipType = data[i].shipType
                            appFunction.add(item,this.props)
                        } else {
                            this.popupDialog.show()
                        }
                    }
                } else {
                    this.popupDialog.show()
                }
            } else {
                this.popupDialog.show()
            }
        } catch (error) {
        }
    }

    updateStatus(key) {
        let boxType = Object.assign({}, this.state.shipTypes)
        for (let k in boxType) {
            if (boxType.hasOwnProperty(k)) {
                boxType[k] = false;
                if (k === key) {
                    boxType[k] = true;
                }
            }
        }
        this.setState({ shipTypes: boxType, ship: key });
    }

    pickerWrap(text, key) {
        let shipTypes = this.state.shipTypes
        let checked = shipTypes[key] ? true : false;
        return (
            <TouchableOpacity style={styles.pickerWrap} onPress={() => this.updateStatus(key)}>
                <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key)} />
                <Text style={styles.checkboxText}>{text}</Text>
            </TouchableOpacity>
        )
    }
    renderPopup() {
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title="Hình thức vận chuyển" />}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogStyle={{ marginTop: -200 }}
                width={250}
                height={250}
                actions={[
                    <DialogButton
                        text="Xác nhận" t
                        onPress={() => {
                            this.addCart()
                        }}
                        key="button-1"
                    />,
                ]}
            >
                <View style={styles.pickerContainer}>
                    {this.pickerWrap('Viettel Post', 'ViettelPost')}
                    {this.pickerWrap('Adayroi', 'Adayroi')}
                    {this.pickerWrap('Grab', 'Grab')}
                    {this.pickerWrap('Uber', 'Uber')}
                </View>
            </PopupDialog>
        )
    }

    addCart() {
        let item = this.state.item
        item.shipType = this.state.ship
        appFunction.add(item, this.props)
        this.popupDialog.dismiss()
    }

    render() {
        const navigation = this.props.screenProps.navi;
        return (
            <Container style={styles.container}>
                <HeaderContent navi={navigation} leftIcon={'menu'} navi={navigation} leftButton={() => navigation.navigate("DrawerOpen")} rightButton={true} title="Xu hướng"
                />
                <Content style={styles.content}>
                    <FlatList style={{ marginBottom: 5, marginTop: 5, flex: 1, width: '100%' }}
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
                    {this.renderPopup()}
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchTrending(params)),
        reRenderHeader:() => dispatch(reRenderHeader())
    };
}

const mapStateToProps = state => ({
    fetchTrending: state.fetchTrending,
});

export default connect(mapStateToProps, bindActions)(Trending);

