import React, { Component } from "react";
import {Alert, FlatList, InteractionManager, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import styles from "./styles";
import { fetchStores } from "../../actions/fetchStores.js"
import {fetchBanner} from "../../actions/fetchStoresDetail.js"
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            disabled: false,
            banners: [],
            isLoading:true
        };
    }
    componentDidMount() {
        let params = {}
        params.city = 'Hanoi'
        params.pageSize = 100
        params.pageIndex = 1
        this.props.fetch(params)
        this.props.fetchBanner()
    }

    componentWillReceiveProps(props) {
        let items = []
        this.setState({isLoading:false})
        if (props.fetchStores.success) {
            this.setState({ data: props.fetchStores.data.model, isLoading: false })
        }
        if(props.fetchStoreBanner.success){
            console.log('uiojldkwqdq')
            this.setState({banners:props.fetchStoreBanner.data.model})
        }
        if (!props.fetchStores.success) {
            this.setState({ isLoading: false })
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') }, 200)
        }
    }
    pageBanner() {
        var banners = []
		var imageLoad = 'http://www.jqueryscript.net/images/Minimal-jQuery-Loading-Overlay-Spinner-Plugin-Easy-Overlay.jpg'		
		if (this.state.banners[0]) {
			banners = this.state.banners
			console.log('213213213', banners[0].imageUrl)
			return (
				<Swiper activeDotColor={primary} height={137} autoplay={true}>
					{banners.map((item, key) => {
						return (
							<View style={{ flex: 1 }} key={key} style={styles.slide1}>
								<Image style={styles.imageBanner} source={{ uri: item.imageUrl }} />
							</View>
						)
					})
					}
				</Swiper>
			)
		} 
		return (
			<Swiper activeDotColor={primary} height={137} autoplay={true}>
							<View style={{ flex: 1 }} style={styles.slide1}>
								<Image style={styles.imageBanner} source={{ uri: imageLoad }} />
							</View>
			</Swiper>
		)
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
                starSize={8}
            />
        )
    }

    openStoreDetail(store) {
        this.setState({ disabled: true })
        this.props.navigation.navigate('StoreTab', { parrent: store })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }
    renderStoreList(data) {
        var item = data.item
        console.log(item)
        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => { this.openStoreDetail(item) }} style={{ flex: 1 }} >
                <View style={styles.itemWrap}>
                    <View style={styles.imageWrap}>
                        <Image source={{ uri: item.storeImageUrl }} style={styles.image} resizeMode='contain' />
                    </View>
                    <View style={styles.descriptionWrap}>
                        <Text style={styles.products}>{item.name}</Text>
                        <View style={styles.starWrap}>
                            {this.renderStar(4)}
                        </View>
                        <View style={styles.hotlineWrap}>
                            <Icon name='ios-call' style={styles.phoneIcon} />
                            <Text onPress={() => Communications.phonecall('0987678911', true)} style={styles.hotline}>0987678911</Text>
                        </View>
                        <Text style={styles.address}>{item.hqAddress}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _keyExtractor = (item, index) => item.id;
    render() {
        const navigation = this.props.screenProps.navi;
        console.log(this.state.disabled)
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} navi={navigation} leftButton={() => navigation.navigate("DrawerOpen")} navi={navigation}
                    rightButton={true} title='Cửa hàng'>
                </HeaderContent>
                <Content>
                    <View style={styles.pageBanner}>
                        {this.pageBanner()}
                    </View>
                    <Spinner visible = {this.state.isLoading}/>
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                            <Text style={styles.title}>Cửa hàng thực phẩm</Text>
                        </View>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.data}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            renderItem={(item) => 
                            (
                                <View style={styles.listItemWrap}>
                                    {this.renderStoreList(item)}
                                </View>
                            )} />
                    </View>
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchStores(params)),
        fetchBanner:() => dispatch(fetchBanner())
    };
}

const mapStateToProps = state => ({
    fetchStores: state.fetchStores,
    fetchStoreBanner: state.fetchStoreBanner
});

export default connect(mapStateToProps, bindActions)(Store);
