import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories } from "../../actions/fetchCategories.js"
import { Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";

import styles from "./styles";
var circle = require('../../../images/greyCircle.png')
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
        this.props.fetch()
    }

    componentWillReceiveProps(props) {
	
    }
    
    renderDryFood(item) {
        return (
            <Grid style={styles.gridWrap}>
                <Col>
                    <Image source={circle} style={styles.cirlce} />
                </Col>
                <Col style={styles.nameWrap}>
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Button transparent >
                        <Icon style={styles.arrow} active name="ios-arrow-forward" />
                    </Button>
                </Col>
            </Grid>
        )
    }

    renderDrink(item) {
        return (
            <Grid style={styles.gridWrap}>
                <Col>
                    <Image source={circle} style={styles.cirlce} />
                </Col>
                <Col style={styles.nameWrap}>
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Button transparent >
                        <Icon style={styles.arrow} active name="ios-arrow-forward" />
                    </Button>
                </Col>
            </Grid>
        )
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <HeaderContent title="Danh mục" leftButton={() => navigation.goBack()} leftIcon="ios-arrow-back" />
                <Content style={styles.contentWrap}>
                    <Label style={styles.title}>Thực phẩm khô</Label>
                    <List style={styles.listWrap} dataArray={dryFood} renderRow={(item) =>
                        <ListItem style={styles.listItem}>
                            {this.renderDryFood(item)}
                        </ListItem>
                    } />
                    <Label style={styles.title}>Đồ uống</Label>
                    <List style={styles.listWrap} dataArray={drink} renderRow={(item) =>
                        <ListItem style={styles.listItem}>
                            {this.renderDrink(item)}
                        </ListItem>
                    } />
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetch: () => dispatch(fetchCategories()),
    };
}

const mapStateToProps = state => ({
    fetchCategories: state.fetchCategories
});

export default connect(mapStateToProps, bindActions)(Categories);
