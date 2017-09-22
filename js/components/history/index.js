import React, { Component } from "react";
import {InteractionManager,ActivityIndicator, FlatList,AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { connect } from "react-redux";
import { fetchHistories } from "../../actions/fetchHistories.js"
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
            index:1,
            loadedAll:false,
            shouldLoadMore:true,
            data :[],
            email:'', 
            disabled:false
        };
    }
    async componentDidMount() {
		let data = []
		console.log('94kjngjkdf89dl')
		try {
			const value = await AsyncStorage.getItem(mConstants.USER_DETAIL);
			if (value !== null) {
				data = JSON.parse(value)
                var email = data.model.email
                var params = {
                    "username":email,
                    "PageSize":"10",
                    "PageIndex":"1",
                    "FromDate":"2017-08-29T17:53:22.5477723"
                } 
                this.setState({email:email})
                console.log('pamrass',params)
                this.props.fetch(params)               
			}
		} catch (error) {

		}
    }
    componentWillReceiveProps(props) {
        this.setState({ isLoading: false })
        console.log('89knmlvnmdkds')
        if (props.fetchHistories.success) {
            if (props.fetchHistories.data.model.length > 0) {
                var data = this.state.data
                data.splice(data.length - 1, 1)
                this.setState({ data: data })
                var histories = []
                histories = this.state.data.concat(props.fetchHistories.data.model)
                console.log('mncmnnwwaqw',histories)
                if (histories.length >= 10) {
                    var loadMoreElement = {
                        name: 'loadmore',
                        id: 'wioejqwjeqw'
                    }
                    histories.push(loadMoreElement)
                    this.setState({ shouldLoadMore: true })
                } else {
                    this.setState({shouldLoadMore:false})
                }
                this.setState({ data: histories })
            } else {
                var data = this.state.data
                data.splice(data.length - 1, 1)
                this.setState({ data: data, loadedAll: true, shouldLoadMore:false })
            }
        }
        if (!props.fetchHistories.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
    }

    loadMore() {
        if (!this.state.loadedAll && this.state.shouldLoadMore) {
            console.log('load moteeeee')
            var index = this.state.index + 1
            var email = this.state.email
            var params = {
                "username":email,
                "PageSize":"10",
                "PageIndex":index,
                "FromDate":"2017-08-29T17:53:22.5477723"
            } 
            this.setState({ isSort: false, index: index })
            this.props.fetch(params)
        }
    }

    onDetail(item){
        console.log('iteadswsdasds',item)        
        this.setState({disabled:true})
        const navigation = this.props.navigation;        
        navigation.navigate('HistoryDetail',{item:item})
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }

    dateHandle(date) {
        var newDate = new Date(date)
        var month = newDate.getMonth()
        var day = newDate.getDate()

        var returnDate = {}
        returnDate.month = month + 1
        returnDate.day = day

        return returnDate
    }

    openDetail(item){
        
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
        var item = data.item
        var date = this.dateHandle(item.orderDate)        
        let price = this.priceHandle(item.totalPrice)
        console.log('asjkdsadas',data.item)
        var paymentMethod = '' 
        var status = ''
        var color = ''
        if (item.paymentMethod == 'cash') {
            paymentMethod = 'Trả tiền mặt'
        } 
        if(item.status == 'Submitted'){
             color = 'orange'
             status = 'Đang chờ'
        }
        if(item.status == 'Delivered'){
            color = 'green'
            status = 'Đã thanh toán'
        }
        if(item.status == 'Canceled'){
            color = 'red'
            status = 'Đã huỷ'
       }
        if(item.status == 'Delivering'){
             color = 'blue'
             status = 'Đang giao'
        }
        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onDetail(item) } style={styles.listItemWrap}>
                <View style={styles.dayMonthWrap}>
                    <Text style={[styles.darkText, {fontSize:35}]}>{date.day}</Text>
                    <View style={styles.monthWrap}>
                        <Text style={[styles.darkText, {fontSize:20}]}>Tháng </Text>
                        <Text style={[styles.darkText, {fontSize:20}]}>{date.month}</Text>
                    </View>
                </View>
                <View style={styles.descriptionWrap}>
                    <Text style={styles.products}>{item.numberOfProducts} Sản phẩm</Text>
                    <View style={styles.flexRow}>
                        <Text style={styles.grayText}>Trạng thái : <Text style={[styles.grayText,{color:color}]}> {status} </Text> </Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                        <Text style={styles.grayText}> Tiền mặt</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Icon name='ios-pin' style={styles.pinIcon} />
                        <Text style={[styles.grayText, {marginLeft:5}]}>{item.deliveryAddress}</Text>
                    </View>
                    <Text style={styles.price}>{price}đ</Text>
                </View>
            </TouchableOpacity>
        )
    }

    priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}

    render() {
        const navigation = this.props.navigation
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} navi={navigation} leftButton={() => navigation.navigate("DrawerOpen")} navi={navigation}
                    rightButton={true} title='Lịch sử mua hàng'>
                </HeaderContent>
                <View style={{flex:1}}>
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
                    </View>
                </View>
            </Container>
        );
    }
}

function bindActions(dispatch) {
	return {
		fetch: (params) => dispatch(fetchHistories(params)),
	};
}

const mapStateToProps = state => ({
	fetchHistories: state.fetchHistories,
});

export default connect(mapStateToProps, bindActions)(History);
