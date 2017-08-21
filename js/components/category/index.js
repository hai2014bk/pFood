import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Text } from "react-native";

import { Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";

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
                <Col style={styles.imageWrap}>
                    <Thumbnail borderRadius={15} square source={{ uri: 'http://i.imgur.com/toH4mkL.jpg' }} style={styles.image} />
                </Col>
                <Col style={styles.infoWrap}>
                    <Text style={[styles.info, { fontSize: 15 }]}>{item.name}</Text>
                    <Text style={styles.info}>{item.shopName}</Text>
                    <Text></Text>
                    <Text style={[styles.info, { fontWeight: 'bold' }]}>{item.price} {item.unit}</Text>
                </Col>
                <Col style={styles.buttonWrap}>
                    <TouchableOpacity style={styles.iconWrap} onPress={() => this.plus(id)} >
                        <Icon name="md-add" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.iconWrap}  onPress={() => this.minus(id)} >
                        <Icon style={styles.icon} name="md-remove" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconWrap} >
                        <Icon style={styles.icon} name="md-cart" />
                    </TouchableOpacity>
                </Col>
            </Grid>
        )
    }

    render() {
        const navigation = this.props.navi;
        return (
            <Container style={styles.container}>
                <HeaderContent rightButton={true} title="Thực phẩm" textLeft="Danh mục" leftButton={() => navigation.navigate("Categories")}/>
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