import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Text } from "react-native";

import { Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const dryFood = [
    { name: 'Thit bo 1' },
    { name: 'Thit bo 2' },
    { name: 'Thit bo 3' },
    { name: 'Thit bo 4' },
    { name: 'Thit bo 5' },
]
const drink = [
    { name: 'Do uong 1' },
    { name: 'Do uong 2' },
    { name: 'Do uong 3' },
    { name: 'Do uong 4' },
    { name: 'Do uong 5' },
]

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    renderDryFood(item) {
        return (
            <Grid style={{ flexDirection: 'row', height: 20 }}>
                <Col style={{ flexDirection: 'column', flex: 2, alignItems: 'flex-start' }}>
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                </Col>
                <Col>

                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Button transparent >
                        <Icon active name="ios-arrow-forward" />
                    </Button>
                </Col>
            </Grid>
        )
    }

    renderDrink(item) {
        return (
            <Grid style={{ flexDirection: 'row', height: 20 }}>
                <Col style={{ flexDirection: 'column', flex: 2, alignItems: 'flex-start' }}>
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                </Col>
                <Col>
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Button transparent >
                        <Icon active name="ios-arrow-forward" />
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
                        <Button transparent onPress={() => navigation.goBack()}>
                           <Icon name="ios-arrow-back" /> 
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>

                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content style={styles.contentWrap}>
                    <Label style={{marginLeft: 10, marginTop:10}}>Thực phẩm khô</Label>
                    <List dataArray={dryFood} renderRow={(item) =>
                        <ListItem>
                            {this.renderDryFood(item)}
                        </ListItem>
                    } />
                    <Label style={{marginLeft: 10, marginTop:10}}>Đồ uống</Label>
                    <List dataArray={drink} renderRow={(item) =>
                        <ListItem>
                            {this.renderDrink(item)}
                        </ListItem>
                    } />
                </Content>
            </Container>
        );
    }
}

export default Categories;
