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
import * as appFunction from "../../utils/function"
import { MapView, Constants, Location, Permissions } from 'expo';

const primary = require("../../themes/variable").brandPrimary;


class StoreNear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: ''
        };
    }
    componentDidMount() {


    }
    componentWillReceiveProps(props) {

    }

    render() {

        const navigation = this.props.navi;
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} navi={navigation} leftButton={() => navigation.navigate("DrawerOpen")} navi={navigation}
                    rightButton={true} title='Cửa hàng gần bạn'>
                </HeaderContent>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>

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

export default connect(mapStateToProps, bindActions)(StoreNear);