import React, { Component } from "react";
import { InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { fetchProduct } from "../../actions/fetchProduct.js"
import HeaderContent from "./../headerContent/";
import { CheckBox, Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";
import * as appFunction from "../../utils/function"
import { connect } from "react-redux";
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

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
            index: 1,
            isSort:false,
            sortBy: '',
            sortDirection: '',
            changeSort: false,
            shouldLoadMore:false,
            disabled:false,
            field: {
                Id: true,
                Name: false,
                Price: false,
                Rate: false
            },
            direction: {
                Desc: true,
                Asc: false,
            },
        };
    }

    componentDidMount() {
        console.log('load 1 ')
        InteractionManager.runAfterInteractions(() => {
            const { params } = this.props.navigation.state
            var parameter = {
                "PageSize": 10,
                "PageIndex": this.state.index,
                "OrderBy":this.state.sortBy,
                "OrderDirection":this.state.sortDirection,
                "CategoryId": params.parent.id
            }
            console.log('load 1')
            this.props.fetch(parameter)
        })

    }
    uniq(a) {
        var seen = [];
        var out = [];
        var len = a.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = a[i];
             console.log('item bbasw', seen.indexOf(item.id))
             if(seen.indexOf(item.id) == -1) {
                   seen.push(item.id)
                   out[j++] = item;
                   console.log('bnmfvf',item.id,seen,out.length)
                   
             }
        }
        return out;
    }

    componentWillReceiveProps(props) {
        if (props.fetchProduct.success) {
            if (props.fetchProduct.data.model.length > 0) {
                var listFood = []
                if(this.state.isSort){
                    listFood = props.fetchProduct.data.model
                } else {
                    listFood = this.state.data.concat(props.fetchProduct.data.model)
                    if(props.fetchProduct.data.model.length == 10){
                        this.setState({shouldLoadMore:true})
                    }
                }
                for (i in listFood) {
                    if(!listFood[i].quantity) {
                        listFood[i].quantity = 1
                    }
                }
                listFood = this.uniq(listFood)
                console.log('27321kdfa',listFood)
                this.setState({ data: listFood })
            } else {
                this.setState({ loadedAll: true })
            }
        }
        if (!props.fetchProduct.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
    }

    loadMore() {
        if (!this.state.loadedAll && this.state.shouldLoadMore) {
            var index = this.state.index + 1
            const { params } = this.props.navigation.state
            var parameter = {
                "PageSize": 10,
                "PageIndex": index,
                "OrderBy":this.state.sortBy,
                "OrderDirection":this.state.sortDirection,
                "CategoryId": params.parent.id
            }
            this.setState({isSort:false, index: this.state.index + 1 })
            this.props.fetch(parameter)
        }
    }
    pickerWrap(text, key, type) {
        let boxType = type === 'field' ? this.state.field : this.state.direction;
        let checked = boxType[key] ? true : false;
        return (
            <View style={styles.pickerWrap}>
                <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
                <Text style={styles.checkboxText}>{text}</Text>
            </View>
        )
    }
    updateStatus(key, type) {
        let boxType = type === 'field' ? Object.assign({}, this.state.field) : Object.assign({}, this.state.direction);
        for (let k in boxType) {
            if (boxType.hasOwnProperty(k)) {
                boxType[k] = false;
                if (k === key) {
                    boxType[k] = true;
                }
            }
        }
        if (type === 'field') {
            this.setState({ field: boxType, sortBy: key });
        } else {
            this.setState({ direction: boxType, sortDirection: key });
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

    openDetail(food) {
        const { params } = this.props.navigation.state
        food.parrentId = params.parent.id
        this.props.navigation.navigate('FoodTab', { parrent: food })
        InteractionManager.runAfterInteractions(() => {
                this.setState({disabled:false})            
        })

       
        
    }

    renderSort() {
        return (
            <View style={styles.sortWrap}>
                <View style={styles.sortFieldWrap}>
                    {this.pickerWrap('Mã sản phẩm', 'Id', 'field')}
                    {this.pickerWrap('Tên sản phẩm', 'Name', 'field')}
                    {this.pickerWrap('Giá sản phẩm', 'Price', 'field')}
                    {this.pickerWrap('Đánh giá', 'Rate', 'field')}
                </View>
                <View style={styles.sortDirectionWrap}>
                    {this.pickerWrap('Tăng dần', 'Asc', 'direction')}
                    {this.pickerWrap('Giảm dần', 'Desc', 'direction')}
                </View>
            </View>
        )
    }
    sortButton(){
        this.popupDialog.dismiss()
        const { params } = this.props.navigation.state
        var parameter = {
            "PageSize": 10,
            "PageIndex": this.state.index,
            "OrderBy":this.state.sortBy,
            "OrderDirection":this.state.sortDirection,
            "CategoryId": params.parent.id
        }
        this.setState({ isSort:true })
        this.props.fetch(parameter)
    }
    onDismissed(){

    }

    renderSortPopup() {
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title="Sắp xếp" />}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                onDismissed={() => this.onDismissed()}
                dialogStyle={{ marginTop: -200 }}
                width={300}
                height={300}
                actions={[
                    <DialogButton
                        text="OK"t
                        onPress={() => {
                            this.sortButton()
                        }}
                        key="button-1"
                    />,
                ]}
            >
                <View style={{ flex: 1 }}>
                    {this.renderSort()}
                </View>

            </PopupDialog>
        )
    }

    renderItems(data) {
        let item = data.item
        let active = 0
        let color = ''
        var quantity = item.quantity * item.quantityStep
        if (item.quantity > 0) {
            active = 0.2,
                color = primary
        } else {
            active = 1,
                color = '#cecece'
        }
        let id = item.id
        let price = this.priceHandle(item.price.toString())
        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => {this.setState({disabled:true}), this.openDetail(item) }}>
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
                                        <TouchableOpacity activeOpacity={active} style={[styles.iconWrapMinus, { borderColor: color }]} onPress={() => this.minus(data.index)} >
                                            <Icon style={[styles.icon, { color: color }]} name="md-remove" />
                                        </TouchableOpacity>

                                        <Col style={styles.quantityContainer}>
                                            <Text style={styles.quantity}>{quantity} {item.unitType}</Text>
                                        </Col>
                                        <TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
                                            <Icon name="md-add" style={styles.icon} />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={styles.buttonAddCard}>
                                        <Button addCart onPress={() => appFunction.add(item)} >
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
    openSort() {
        this.popupDialog.show();
    }

    render() {
        const navigation = this.props.screenProps.navi;
        const { params } = this.props.navigation.state
        return (
            <Container style={styles.container}>
                <HeaderContent navi={navigation} rightIcon={'md-funnel'} customRight={() => this.openSort()} rightButton={true} title={params.parent.name}
                    textLeft="Danh Mục"
                    leftButton={() => { this.props.navigation.dispatch(resetAction) }}
                />
                <View style={{flex:1}}>
                    <FlatList style={{ marginTop: 5 }}
                        onEndReached={(distanceFromEnd) => this.loadMore()}
                        onEndReachedThreshold={0.5}
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
                    {this.renderSortPopup()}
                </View>
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