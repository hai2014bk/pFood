import React, { Component } from "react";
import {ActivityIndicator, Dimensions, Alert, FlatList, InteractionManager, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import styles from "./styles";
import { fetchStores } from "../../actions/fetchStores.js"
import { fetchBanner } from "../../actions/fetchStoresDetail.js"
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            disabled: false,
            banners: [],
            isLoading: true
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
        this.setState({ isLoading: false })
        if (props.fetchStores.success) {
            this.setState({ data: props.fetchStores.data.model, isLoading: false })
        }
        if (props.fetchStoreBanner.success) {
            this.setState({ banners: props.fetchStoreBanner.data.model })
        }
        if (!props.fetchStores.success) {
            this.setState({ isLoading: false })
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') }, 200)
        }
    }
    renderPage(item, index) {
        return (
            <View style={{ flex: 1 }} key={index} style={styles.slide1}>
                <Image style={styles.imageBanner} source={{ uri: item.imageUrl }} />
            </View>
        )
    }

    pageBanner() {
        var banners = []
        var sliders = []
        var imageLoad = 'http://www.jqueryscript.net/images/Minimal-jQuery-Loading-Overlay-Spinner-Plugin-Easy-Overlay.jpg'
        if (this.state.banners.length > 0) {
            banners = this.state.banners
            return (
                <Carousel
                    autoplay
                    autoplayTimeout={3000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                    activePageIndicatorStyle={{ backgroundColor: primary }}
                >
                    {banners.map((item, index) => this.renderPage(item, index))}
                </Carousel>
            )
        }
        return (
            <View style={{ flex:1, height:137 }} style={styles.slide1}>
                    <ActivityIndicator style={{height:137}}/>
                </View>
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
        this.props.screenProps.navi.navigate('StoreTab', { parrent: store })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }
    renderStoreList(data) {
        var item = data.item
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
        let params  = this.props.storeParrent
        var name = 'Chuỗi cửa hàng của ' + params.name
        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.pageBanner}>
                        {this.pageBanner()}
                    </View>
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                            <Text style={styles.title}>{name}</Text>
                        </View>
                        <FlatList style={{}}
                            data={this.state.data}
                            extraData={this.state.data}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            renderItem={(item) => (
                                <View style={styles.listItemWrap} >
                                    {this.renderStoreList(item)}
                                </View>
                            )
                            }
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchStores(params)),
        fetchBanner: () => dispatch(fetchBanner())
    };
}

const mapStateToProps = state => ({
    fetchStores: state.fetchStores,
    fetchStoreBanner: state.fetchStoreBanner
});

export default connect(mapStateToProps, bindActions)(StoreList);
