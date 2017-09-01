import React, { Component } from "react";
import { AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import styles from "./styles";
import { fetchStores } from "../../actions/fetchStores.js"
import Spinner from 'react-native-loading-spinner-overlay';
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const primary = require("../../themes/variable").brandPrimary;
const money = require("../../../images/money.png");
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true
        };
    }
    componentDidMount() {
        let params = {}
        params.city = 'Hanoi'
        params.pageSize = 100
        params.pageIndex = 1
        this.props.fetch(params)
    }

    componentWillReceiveProps(props) {
        let items = []
        if (props.fetchStores.success) {
            this.setState({items: props.fetchStores.data.model, isLoading:false})
        }
        if (!props.fetchStores.success) {
            this.setState({isLoading:false})
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') }, 200)
        }
    }

    pageBanner() {
        return (
            <Swiper activeDotColor={primary} height={137} autoplay={true}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: steak }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: pizza }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: bbq }}
                    />
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

    renderStoreList(item) {
        console.log('item',item)
        return (
            <TouchableOpacity style={styles.listItemWrap}>
                <View style={styles.itemWrap}>
                    <View style={styles.imageWrap}>
                        <Image source={{uri: item.storeImageUrl}} style={styles.image} resizeMode='contain' />
                    </View>
                    <View style={styles.descriptionWrap}>
                        <Text style={styles.products}>{item.name}</Text>
                        <View style={styles.starWrap}>
                            {this.renderStar(4)}
                        </View>
                        <View style={styles.hotlineWrap}>
                            <Icon name = 'ios-call' style={styles.phoneIcon} />
                            <Text style={styles.hotline}>{item.hotline}</Text>
                        </View>
                        <Text style={styles.address}>{item.hqAddress}</Text>          
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const navigation = this.props.navigation
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'ios-arrow-back'} navi={navigation} leftButton={() => navigation.goBack()}
                    rightButton={false} title='Cửa hàng'>
                </HeaderContent>
                <Content>
                    <View style={styles.pageBanner}>
                        {this.pageBanner()}
                    </View>
                    <View style={styles.bodyWrap}>
                        <View style={styles.titleWrap}>
                            <Image source={money} style={styles.moneyIcon} resizeMode='contain' />
                            <Text style={styles.title}>Cửa hàng thực phẩm</Text>
                        </View>
                        <List contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                            showsVerticalScrollIndicator={false} dataArray={this.state.items}
                            renderRow={(item) =>
                                this.renderStoreList(item)
                            }>
                        </List>
                    </View>
                </Content>
                <Spinner visible={this.state.isLoading} />
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchStores(params)),
    };
}

const mapStateToProps = state => ({
    fetchStores: state.fetchStores,
});

export default connect(mapStateToProps, bindActions)(Store);
