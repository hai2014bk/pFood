import React, { Component } from "react";
import { Alert, Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { fetchStoresDetail } from "../../actions/fetchStoresDetail.js"
import * as appFunction from "../../utils/function"

const primary = require("../../themes/variable").brandPrimary;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const testText = "\Thịt gà là món ăn được xếp vào hàng “sang chảnh” trong thế giới ẩm thực. Mặc dù có rất nhiều món ăn mới, hấp dẫn hơn nhưng trong mâm cỗ thì thịt gà là món ăn không thể thiếu. Vì không chỉ ngon miệng mà nó còn có giá trị dinh dưỡng cao, thậm chí các bài thuốc từ thịt gà cũng chữa bệnh rất tốt "
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const money = require("../../../images/money.png");

class StoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: ''
        };
    }
    componentDidMount() {
        this.props.fetch(this.props.storeParrent.id)

    }
    componentWillReceiveProps(props) {
        if (props.fetchStoresDetail.success) {
            this.setState({ store: props.fetchStoresDetail.data.model })
            console.log('mvcmvfdsvfs', props.fetchStoresDetail.data.model)
        }
        if (!props.fetchStoresDetail.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
    }
    pageBanner() {
        return (
            <Swiper activeDotColor={primary} autoplay={true}>
                <View style={{ flex: 1 }}>
                    <Image resizeMode='stretch'
                        style={{ flex: 1 }}
                        source={{ uri: steak }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Image resizeMode='stretch'
                        style={{ flex: 1 }}
                        source={{ uri: pizza }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Image resizeMode='stretch'
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
    renderDescriptionContent() {
        if (this.state.seeMore) {

        }
    }
    renderDecription() {
        var description = ''
        return (
            <Card>
                <View style={styles.cardContainer}>
                    <Row style={{ alignItems: 'center', flex: 1, borderBottomWidth: 1, borderColor: '#e7e9e5' }}>
                        <Text style={styles.headerText}> Mô tả </Text>
                    </Row>
                    <Row style={{ margin: 10 }}>
                        <Text style={styles.contentText}>{this.state.store.desciption}</Text>
                    </Row>
                </View>
            </Card>
        )
    }
    renderContentInfo(header, content) {
        return (
            <Grid style={{ flex: 1, borderColor: '#e7e9e5', borderTopWidth: 1 }}>
                <Row style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
                    <Text style={styles.contentText}>{header}</Text>
                    <Text style={styles.contentText}>{content}</Text>
                </Row>
            </Grid>
        )
    }
    renderInfo() {
        return (
            <Card>
                <View style={styles.cardContainer}>
                    <Row style={{ alignItems: 'center', flex: 1, borderBottomWidth: 1, borderColor: '#e7e9e5' }}>
                        <Text style={styles.headerText}> Giờ mở cửa </Text>
                    </Row>
                    {this.renderContentInfo('Cả tuần', '07:00 AM - 22:00 PM')}
                </View>
            </Card>
        )
    }
    renderContentAddress(header, content) {
        return (
            <Grid style={{ flex: 1, borderColor: '#e7e9e5', borderTopWidth: 1 }}>
                <View style={{ margin: 10, flex: 1, }}>
                    <Text style={styles.contentText}>{header}</Text>
                    <Row style={{ marginTop: 5, alignSelf: 'flex-start' }} >
                        <Icon name='ios-pin' style={styles.locationIcon} />
                        <Text style={styles.contentText}>{content}</Text>
                    </Row>
                </View>
            </Grid>
        )
    }
    renderAdress() {
        var storeLocations = []
        if(this.state.store.storeLocations){
           storeLocations = this.state.store.storeLocations
        }
          
        return (
            <Card>
                <View style={styles.cardContainer}>
                    <Row style={{ alignItems: 'center', flex: 1, borderBottomWidth: 1, borderColor: '#e7e9e5' }}>
                        <Text style={styles.headerText}> Địa chỉ </Text>
                    </Row>
                        {storeLocations.map((location) => {
                            return (
                                <View key={location.id}>
                                {this.renderContentAddress(location.name, location.city)}
                                </View>
                            );
                        })}
                </View>
            </Card>
        )
    }


    plus() {
        var food = this.state.food
        food.quantity += 1
        this.setState({ food: food })
    }
    minus() {
        var food = this.state.food
        if (food.quantity > 0) {
            food.quantity -= 1
            this.setState({ food: food })
        }
    }
    priceHandle(price) {
        var count = 0
        price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return price
    }
    insertString(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    render() {
        if (this.props.storeParrent.storeImageUrl) {
            imageUrl = this.props.storeParrent.storeImageUrl
        }
        const navigation = this.props.navi;
        return (
            <Container style={styles.container}>
                <Content>
                    <View>
                        <Image resizeMode='contain' source={{ uri: imageUrl }} style={styles.foodImage} />
                        {this.renderDecription()}
                        <View style={{ marginTop: 10 }}>
                            {this.renderInfo()}
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {this.renderAdress()}
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
        fetch: (id) => dispatch(fetchStoresDetail(id)),
    };
}

const mapStateToProps = state => ({
    fetchStoresDetail: state.fetchStoresDetail,
});

export default connect(mapStateToProps, bindActions)(StoreInfo);