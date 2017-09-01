import React, { Component } from "react";
import { AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;
const items = [
    { id: 1, image: '', products: 50, address: '160 Nguyễn Trãi, quận Thanh Xuân, thành phố Hà Nội' },
    { id: 2, image: '', products: 72, address: '200 Khâm Thiên, quận Đống Đa, thành phố Hà Nội' },
    { id: 3, image: '', products: 34, address: '250 Hà Đông, quận Thanh Xuân, thành phố Hà Nội' },
    { id: 4, image: '', products: 23, address: '199 Đường Láng, quận Thanh Xuân, thành phố Hà Nội' },
    { id: 5, image: '', products: 20, address: '250 Bà Triệu, quận Thanh Xuân, thành phố Hà Nội' },
    { id: 6, image: '', products: 11, address: '199 Nguyễn Trãi, quận Thanh Xuân, thành phố Hà Nội' },
]

const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const money = require("../../../images/money.png");
const storeBanner = require("../../../images/storeBanner.png");
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

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
        return (
            <TouchableOpacity style={styles.listItemWrap}>
                <View style={styles.itemWrap}>
                    <View style={styles.imageWrap}>
                        <Image source={storeBanner} style={styles.image} resizeMode='contain' />
                    </View>
                    <View style={styles.descriptionWrap}>
                        <Text style={styles.products}>{item.products} sản phẩm</Text>
                        <View style={styles.starWrap}>
                            {this.renderStar(4)}
                        </View>
                        <Text style={styles.address}>{item.address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const navigation = this.props.navigation
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} leftButton={() => navigation.navigate("DrawerOpen")} navi={navigation}
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
                            showsVerticalScrollIndicator={false} dataArray={items}
                            renderRow={(item) =>
                                this.renderStoreList(item)
                            }>
                        </List>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Store;
