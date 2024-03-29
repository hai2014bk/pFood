import React, { Component } from "react";
import { ActivityIndicator, InteractionManager, FlatList, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { fetchProduct } from "../../actions/fetchProduct.js"
import HeaderContent from "./../headerContent/";
import { CheckBox, Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { reRenderHeader } from '../../actions/header'
import  TouchAble  from 'react-native-touch-able'
import Image from 'react-native-image-progress';
import Spinner from "react-native-loading-spinner-overlay";
import * as appFunction from "../../utils/function"
import * as mConstants from '../../utils/Constants'
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
            isSort: false,
            sortBy: 'Name',
            sortDirection: 'Desc',
            changeSort: false,
            shouldLoadMore: false,
            disabled: false,
            isLoading: true,
            field: {
                Name: true,
                Price: false,
                AvgRate: false
            },
            direction: {
                Desc: true,
                Asc: false,
            },
            shipTypes: {
                StoreShip: true,
            },
            item: {},
            ship: 'Ship của cửa hàng',
            fieldChose: 'Name',
            directionChose: 'Desc',
            disable:false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { params } = this.props.navigation.state
            var parameter = {
                "PageSize": 10,
                "PageIndex": this.state.index,
                "OrderBy": this.state.sortBy,
                "OrderDirection": this.state.sortDirection,
                "CategoryId": params.parent.id
            }
            this.props.fetch(parameter)
        })

    }
    uniq(a) {
        var seen = [];
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = a[i];
            if (seen.indexOf(item.id) == -1) {
                seen.push(item.id)
                out[j++] = item;
            }
        }
        return out;
    }

    componentWillReceiveProps(props) {
        this.setState({ isLoading: false })
        if (props.fetchProduct.success) {
            if (props.fetchProduct.data.model.length > 0) {
                var data = this.state.data
                data.splice(data.length - 1, 1)
                this.setState({ data: data })
                var listFood = props.fetchProduct.data.model
                console.log('kncnbiu2aasq',this.state.isSort)
                if (!this.state.isSort) {
                    listFood = this.state.data.concat(props.fetchProduct.data.model)
                } 
                for (i in listFood) {
                    if (!listFood[i].quantity) {
                        listFood[i].quantity = listFood[i].minOrderedItems
                        let metaData = listFood[i].productMetaData
                        for (j in metaData) {
                            if (metaData[j].name == 'Discount') {
                                let discountPrice = listFood[i].price * metaData[j].value / 100
                                listFood[i].price = listFood[i].price - discountPrice
                            }
                        }
                    }
                }
                listFood = this.uniq(listFood)
                if (listFood.length >= 10) {
                    var loadMoreElement = {
                        name: 'loadmore',
                        id: 'wioejqwjeqw'
                    }
                    listFood.push(loadMoreElement)
                    this.setState({ shouldLoadMore: true })
                }
                this.setState({ data: listFood })
            } else {
                var data = this.state.data
                if (data[data.length - 1].name == 'loadmore'){
                    data.splice(data.length - 1, 1)
                }
                this.setState({ data: data, loadedAll: true })
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
                "OrderBy": this.state.sortBy,
                "OrderDirection": this.state.sortDirection,
                "CategoryId": params.parent.id
            }
            this.setState({ isSort: false, index: this.state.index + 1 })
            this.props.fetch(parameter)
        }
    }
    pickerWrap(text, key, type) {
        let boxType = type === 'field' ? this.state.field : this.state.direction;
        let checked = boxType[key] ? true : false;
        return (
            <TouchableOpacity onPress={() => this.updateStatus(key, type)} style={styles.pickerWrap}>
                <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
                <Text style={styles.checkboxText}>{text}</Text>
            </TouchableOpacity>
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
        const { params } = this.props.navigation.state
        food.parrentId = params.parent.id
        this.props.navigation.navigate('FoodTab', { parrent: food })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })

    }

    renderSort() {
        return (
            <View style={styles.sortWrap}>
                <View style={styles.sortFieldWrap}>
                    {this.pickerWrap('Tên sản phẩm', 'Name', 'field')}
                    {this.pickerWrap('Giá sản phẩm', 'Price', 'field')}
                    {this.pickerWrap('Đánh giá', 'AvgRate', 'field')}
                </View>
                <View style={styles.sortDirectionWrap}>
                    {this.pickerWrap('Tăng dần', 'Asc', 'direction')}
                    {this.pickerWrap('Giảm dần', 'Desc', 'direction')}
                </View>
            </View>
        )
    }
    sortButton() {
        this.popupDialog.dismiss()
        this.setState({ loadedAll: false })
        const { params } = this.props.navigation.state
        var parameter = {
            "PageSize": 10,
            "PageIndex": 1,
            "OrderBy": this.state.sortBy,
            "OrderDirection": this.state.sortDirection,
            "CategoryId": params.parent.id
        }
        this.setState({data:[], index:1, isSort: true, fieldChose: this.state.sortBy, directionChose: this.state.sortDirection })
        this.props.fetch(parameter)
    }       
    onDismissed() {
        let fieldType = Object.assign({}, this.state.field)
        let directionType = Object.assign({}, this.state.direction)
        for (let k in fieldType) {
            if (fieldType.hasOwnProperty(k)) {
                fieldType[k] = false;
                if (k === this.state.fieldChose) {
                    fieldType[k] = true;
                }
            }
        } for (let k in directionType) {
            if (directionType.hasOwnProperty(k)) {
                directionType[k] = false;
                if (k === this.state.directionChose) {
                    directionType[k] = true;
                }
            }
        }

        this.setState({ field: fieldType, direction: directionType, });
    }

    renderSortPopup() {
        var disable = false
        if (this.state.sortBy == '' || this.state.sortDirection == '') {
            disable = true
        }
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
                        text="OK"
                        disabled={disable}
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

    renderDiscount(data) {
        if (data.productMetaData[1]) {
            var discount = ''
            for (i in data.productMetaData) {
                if (data.productMetaData[i].name == 'Discount') {
                    if (data.productMetaData[i].value) {
                        discount = data.productMetaData[i].value
                    }
                }
            }
            if (discount == '') {
                return null
            }
            return (
                <View style={styles.saleView}>
                    <Text style={styles.saleText}>-{discount} %</Text>
                </View>
            )
        } else {
            return null
        }
    }


    renderItems(data) {
        if (data.index == this.state.data.length - 1 && this.state.data.length > 10 && !this.state.loadedAll) {
            return (
                <View style={styles.loadMoreCell}>
                    <ActivityIndicator />
                    <Text style={styles.loadMoreText} >Tải thêm...</Text>
                </View>
            )
        }

        let item = data.item
        let active = 0
        let color = ''
        var quantity = appFunction.handleUnitType(item.unitType, item.quantity)
        var disabled = false
        if (item.quantity >=  item.minOrderedItems) {
            if (item.quantity == item.minOrderedItems) {
                disabled = true
                color = '#cecece'
                active = 1
            } else {
                disabled = false
                active = 0.2
                color = primary
            }
            buttonAdd = (
                <Button addCart onPress={() => { this.addtoCart(item); this.setState({ item }) }} >
                    <Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
                </Button>
            )
        } else {
            active = 1,
                color = '#cecece',
                disabled = true
            buttonAdd = (
                <Button disabled={true} style={{ backgroundColor: '#cecece' }} addCart >
                    <Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
                </Button>
            )
        }
        let id = item.id
        let price = this.priceHandle(item.price)
        var imageUrl = 'http://runawayapricot.com/wp-content/uploads/2014/09/placeholder.jpg'
        var shopName = ''
        if(item.storeProducts[0]){
            shopName = item.storeProducts[0].store.name
        }
		for (i in item.productMetaData) {
			if (item.productMetaData[i].name == 'ImageUrl') {
				if (item.productMetaData[i]) {
					imageUrl = item.productMetaData[i].value
				}
			}
		}
        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => { this.setState({ disabled: true }), this.openDetail(item) }}>
                <Card style={styles.card}>
                    <CardItem >
                        <Body>
                            <Grid >
                                <Col size={2} style={styles.imageWrap}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: imageUrl }} style={styles.image}>
                                            {this.renderDiscount(item)}
                                        </Image>
                                    </View>
                                </Col>
                                <Col size={3} style={styles.infoWrap}>
                                    <Text style={styles.foodName}>{item.name}</Text>
                                    <Text style={styles.unit}> {item.quantityStep} {item.unitType}</Text>
                                    <Row style={{ alignItems: 'flex-end' }} >
                                        <Icon name='ios-pin' style={styles.locationIcon} />
                                        <Text style={styles.shopName}>{shopName}</Text>
                                    </Row>
                                    <View style={{ width: 50 }}>
                                        {this.renderStar(item.avgRate)}
                                    </View>
                                    <Text style={styles.price} > {price}đ/ <Text style={styles.perPrice}>{item.quantityStep} {item.unitType}</Text></Text>
                                </Col>
                                <TouchableOpacity activeOpacity={1} style={styles.buyColumn}>
                                    <Col style={styles.buttonWrap}>
                                        <TouchableOpacity disabled={disabled} activeOpacity={active} style={[styles.iconWrapMinus, { borderColor: color }]} onPress={() => this.minus(data.index)} >
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
    openSort() {
        this.popupDialog.show();
    }

    updateShipStatus(key) {
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

    shipPickerWrap(text, key) {
        let shipTypes = this.state.shipTypes
        let checked = shipTypes[key] ? true : false;
        return (
            <TouchableOpacity style={styles.pickerWrap} onPress={() => this.updateShipStatus(key)}>
                <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateShipStatus(key)} />
                <Text style={styles.checkboxText}>{text}</Text>
            </TouchableOpacity>
        )
    }

    renderShipPopup() {
        var shipType = this.state.shipTypes
        var numberChild =  Object.keys(shipType).length
        if(numberChild == 1){
            numberChild = 2
        }
        var height = 70 * (numberChild)
        
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title="Hình thức vận chuyển" />}
                ref={(shipPopupDialog) => { this.shipPopupDialog = shipPopupDialog; }}
                dialogStyle={{ marginTop: -200 }}
                width={280}
                height={height}
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
                    {this.shipPickerWrap('Ship của cửa hàng', 'StoreShip')}
                </View>
            </PopupDialog>
        )
    }

    async addtoCart(item) {
		let data = []
		var storeId = ''
        let storeProducts = item.storeProducts
		storeId = storeProducts[0].storeId
		this.setState({ disabled: true })
		setTimeout(() => { this.setState({ disabled: false }), 500 })
		var seen = false
		var seenItemShipType = ''
		try {
			const value = await AsyncStorage.getItem(mConstants.CART);
			if (value !== null) {
				data = JSON.parse(value)
				if (data.length > 0) {
					for (let i in data) {
						var food = data[i]
						var inCartStoreId = ''
						let inCartstoreProducts = food.storeProducts
						inCartStoreId = inCartstoreProducts[0].storeId
						if (inCartStoreId == storeId) {
							seen = true
							seenItemShipType = data[i].shipType
							break
						}
					}
					if (seen) {
						item.shipType = seenItemShipType
						appFunction.add(item, this.props)
					} else {
						this.shipPopupDialog.show()
					}
				} else {
                    this.shipPopupDialog.show()
				}
			} else {
                this.shipPopupDialog.show()
			}
		} catch (error) {
		}
	}

    addCart() {
        let item = this.state.item
        item.shipType = this.state.ship
        appFunction.add(item, this.props)
        this.shipPopupDialog.dismiss()
    }

    render() {
        const navigation = this.props.screenProps.navi;
        const { params } = this.props.navigation.state
        return (
            <Container style={styles.container}>
                <HeaderContent navi={navigation} rightButton={true} secondRightBtnIcon={'md-funnel'} secondRightBtn={() => this.openSort()} rightButton={true} title={params.parent.name}
                    textLeft="Danh mục"
                    leftButton={() => { this.props.navigation.dispatch(resetAction) }}
                />
                <Spinner visible={this.state.isLoading} />
                <View style={{ flex: 1 }}>
                    <FlatList style={{ marginTop: 5 }}
                        ref={(list) => {this.listView = list}}
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
                    {this.renderShipPopup()}
                </View>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (parameter) => dispatch(fetchProduct(parameter)),
        reRenderHeader: () => dispatch(reRenderHeader())
    };
}

const mapStateToProps = state => ({
    fetchProduct: state.fetchProduct,
});

export default connect(mapStateToProps, bindActions)(Category);