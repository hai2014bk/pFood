import React, { Component } from "react";
import { Keyboard,ActivityIndicator, Dimensions, Alert, FlatList, InteractionManager, AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Button, Input, Item, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import styles from "./styles";
import { fetchStoresSearch } from "../../actions/fetchStoresSearch.js"
import { fetchBanner } from "../../actions/fetchStoresDetail.js"
import { fetchPurveyor } from "../../actions/fetchPurveyor.js"
import Spinner from 'react-native-loading-spinner-overlay';
import Communications from 'react-native-communications';
import Carousel from 'react-native-banner-carousel';
import Image from 'react-native-image-progress';

const BannerWidth = Dimensions.get('window').width;
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
class SearchStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            disabled: false,
            banners: [],
            isLoading: false,
            searchClick: false,
            dataPurveyor: [],
        };
    }
    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        let items = []
        this.setState({ isLoading: false })
        if (props.fetchStoresSearch.success) {
            this.setState({ data: props.fetchStoresSearch.data.model, isLoading: false })
            console.log('start data', this.state.data)
        }
        if (props.fetchPurveyor.success) {
            this.setState({ dataPurveyor: props.fetchPurveyor.data.model, isLoading: false })
            console.log('start data', this.state.dataPurveyor)
        }
        if (!props.fetchStoresSearch.success && !props.fetchPurveyor.success) {
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
            <View style={{ flex: 1, height: 137 }} style={styles.slide1}>
                <ActivityIndicator style={{ height: 137 }} />
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
        this.props.navigation.navigate('StoreTab', { parrent: store })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }

    openPurveyorDetail(store) {
        this.setState({ disabled: true })
        this.props.navigation.navigate('PurveyorTab', { parrent: store })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }

    renderStore() {
        console.log('âffaf', this.state.dataPurveyor)
        if (this.state.searchClick == true) {
            if (!this.state.data) {
                return (
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.titleText}>Cửa hàng</Text>
                        </View>
                        <Text style={styles.noDataText}>Không tìm thấy cửa hàng phù hợp với yêu cầu tìm kiếm</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.titleText}>Cửa hàng</Text>
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
                )
            }

        }
    }

    renderPurveyor() {
        if (this.state.searchClick == true) {
            if (!this.state.dataPurveyor[0]) {
                return (
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.titleText}>Trang trại</Text>
                        </View>
                        <Text style={styles.noDataText}>Không tìm thấy trang trại phù hợp với yêu cầu tìm kiếm</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.titleText}>Trang trại</Text>
                        </View>
                        <FlatList style={{}}
                            data={this.state.dataPurveyor}
                            extraData={this.state.dataPurveyor}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            renderItem={(item) => (
                                <View style={styles.listItemWrap} >
                                    {this.renderPurveyorList(item)}
                                </View>
                            )
                            }
                        />
                    </View>
                )
            }
        }
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

    renderPurveyorList(data) {
        var item = data.item
        console.log(item)
        return (
            <TouchableOpacity disabled={this.state.disabled} onPress={() => { this.openPurveyorDetail(item) }} style={{ flex: 1 }} >
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
                        <Text style={styles.address}>{item.address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _keyExtractor = (item, index) => item.id;
    search() {
        let params = {}
        let purveyParams = {}
        params.city = 'Hanoi'
        params.pageSize = 100
        params.pageIndex = 1
        params.searchTerm = this.state.searchText
        this.setState({ isLoading: true })
        this.props.fetch(params)
        this.props.fetchPurvey(params)
        Keyboard.dismiss()
        this.setState({ searchClick: true })
    }
    deleteSearch() {
        this.setState({ searchText: '' })
    }
    render() {
        const navigation = this.props.screenProps.navi;
        const { params } = this.props.navigation.state
        console.log(this.state.disabled)
        return (
            <Container style={styles.container}>
                <HeaderContent keyboardShouldPersistTaps='handle'
                    navi={navigation}
                    value={this.state.searchText}
                    changeText={(text) => { this.setState({ searchText: text }) }}
                    leftSearchMenu={() => navigation.navigate('DrawerOpen')} rightButton={true} leftSearchMenuIcon={'menu'}
                    deleteSearch={() => { this.deleteSearch() }}
                    search={() => this.search()} />
                <Content>
                    <Spinner visible={this.state.isLoading} />
                    {this.renderStore()}
                    {this.renderPurveyor()}
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchStoresSearch(params)),
        fetchBanner: () => dispatch(fetchBanner()),
        fetchPurvey: (params) => dispatch(fetchPurveyor(params))
    };
}

const mapStateToProps = state => ({
    fetchStoresSearch: state.fetchStoresSearch,
    fetchStoreBanner: state.fetchStoreBanner,
    fetchPurveyor: state.fetchPurveyor
});

export default connect(mapStateToProps, bindActions)(SearchStore);