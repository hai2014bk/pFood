import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Text } from "react-native";

import { Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem } from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 0, name: 'Thit bo 1', shopName: 'Shop 1', price: '200000', unit: 'VND', quantity: 0 },
                { id: 1, name: 'Thit bo 2', shopName: 'Shop 2', price: '250000', unit: 'VND', quantity: 0 },
                { id: 2, name: 'Thit bo 3', shopName: 'Shop 3', price: '100000', unit: 'VND', quantity: 0 },
                { id: 3, name: 'Thit bo 4', shopName: 'Shop 4', price: '150000', unit: 'VND', quantity: 0 },
                { id: 4, name: 'Thit bo 5', shopName: 'Shop 5', price: '100000', unit: 'VND', quantity: 0 },
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

    renderItems(item) {
        let id = item.id
        return (
            <Grid style={{ flexDirection: 'row' }}>
                <Col style={{ marginLeft: -10, marginRight: 10 }}>
                    <Image source={{ uri: 'https://i.imgur.com/toH4mkL.jpg' }} style={{ height: 60, width: 70 }} resizeMode='contain' />
                </Col>
                <Col style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>{item.shopName}</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>{item.price} {item.unit}</Text>
                </Col>
                <Col style={{ flexDirection: 'row', flex: 1.5, marginLeft: 10 }}>
                    <Button onPress={() => this.plus(id)} transparent >
                        <Icon name="md-add" />
                    </Button>
                    <Text style={{ marginTop: 12, marginLeft: 5 }}>{item.quantity}</Text>
                    <Button onPress={() => this.minus(id)} transparent >
                        <Icon name="md-remove" />
                    </Button>
                </Col>
                <Col style={{ flex: 1, alignItems: 'flex-end', marginLeft: 5 }}>
                    <Button transparent >
                        <Icon active name="md-cart" />
                    </Button>
                </Col>
            </Grid>
        )
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate("Categories")}>
                            <Text style={{ color: 'white' }}>Categories</Text>
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>

                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon active name="md-cart" />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.contentWrap}>
                    <List dataArray={this.state.data} renderRow={(item, rowID) =>
                        <ListItem>
                            {this.renderItems(item)}
                        </ListItem>
                    } />
                </Content>
            </Container>
        );
    }
}

export default Category;
