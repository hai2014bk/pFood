import React, { Component } from "react";
import { FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";

import { Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Categories" })],
});
class FoodRelate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 0, name: 'Thit bo 1', unit: '50g', rate: 3.5, shopName: 'Shop 1', price: '20.0000đ', quantity: 0 },
                { id: 1, name: 'Thit bo 2', unit: '50g', rate: 1, shopName: 'Shop 2', price: '25.0000đ', quantity: 0 },
                { id: 2, name: 'Thit bo 3', unit: '50g', rate: 5, shopName: 'Shop 3', price: '10.0000đ', quantity: 0 },
                { id: 3, name: 'Thit bo 4', unit: '50g', rate: 4, shopName: 'Shop 4', price: '15.0000đ', quantity: 0 },
                { id: 4, name: 'Thit bo 5', unit: '50g', rate: 2.5, shopName: 'Shop 5', price: '10.0000đ', quantity: 0 },
            ]
        };
    }

    componentDidMount() {

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

    renderItems(data) {
        let item =  data.item
        console.log(data.index)
        let id = item.id
        return (
            <Card style={styles.card}>
                <CardItem >
                    <Body>
                        <Grid >
                            <Col size={2} style={styles.imageWrap}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: 'http://i.imgur.com/toH4mkL.jpg' }} style={styles.image} />
                                </View>
                            </Col>
                            <Col size={3} style={styles.infoWrap}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.unit}>{item.unit}</Text>
                                <Text style={styles.shopName}>{item.shopName}</Text>
                                <View style={{ width: 50 }}>
                                    {this.renderStar(item.rate)}
                                </View>
                                <Text style={styles.price}>{item.price}</Text>
                            </Col>
                            <Col size={3} style={styles.buyColumn}>
                                <Col style={styles.buttonWrap}>
                                    <TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
                                        <Icon name="md-add" style={styles.icon} />
                                    </TouchableOpacity>
                                    <Col style={styles.quantityContainer}>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                    </Col>
                                    <TouchableOpacity style={styles.iconWrapMinus} onPress={() => this.minus(data.index)} >
                                        <Icon style={styles.icon} name="md-remove" />
                                    </TouchableOpacity>
                                </Col>
                                 <Col style={styles.buttonAddCard}>
                                   <Button addCart>
                                       <Text numberOfLines={1} style={{color:'white',fontWeight:'normal',textAlign:'center', fontSize:12, alignSelf:'center'}}> Thêm vào giỏ </Text>
                                       </Button>
                                </Col>
                            </Col>
                        </Grid>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Content style={styles.contentWrap}>
                    <FlatList style={{marginBottom:5,marginTop:5}}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item)=>item.id}
                        renderItem={(item) => (
                            <ListItem style={{ marginBottom: -25, borderBottomWidth: 0 }} >
                                {this.renderItems(item)}
                            </ListItem>
                        )
                        }
                    />
                </Content>
            </Container>
        );
    }
}

export default FoodRelate;


{/* <Col style={styles.buttonWrap}>
<Button onPress={() => this.plus(id)} transparent >
    <Icon name="md-add" />
</Button>
<Text style={styles.quantity}>{item.quantity}</Text>
<Button onPress={() => this.minus(id)} transparent >
    <Icon name="md-remove" />
</Button>
</Col>
<Col style={styles.cartWrap}>
<Button transparent >
    <Icon active name="md-cart" />
</Button>
</Col> */}