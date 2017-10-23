import React, { Component } from "react";
import { InteractionManager, Alert, Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';
import { Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
import * as appFunction from "../../utils/function"
import { MapView, Constants, Location, Permissions } from 'expo';
import { fetchStoresNear } from "../../actions/fetchStoreNear.js"

const primary = require("../../themes/variable").brandPrimary;


class StoreNear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataMakers: [],
            storeSelect: '',
            showCallout: false,
            position:''
        };
    }
    componentDidMount() {
        let params = {}
        params.city = 'Hanoi'
        params.pageSize = 100
        params.pageIndex = 1
        this.props.fetch(params)
        this.getLocationAsync()
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission to access location was denied"
            });
        }
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true
        });
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        });
        Location.watchPositionAsync(
            {
                enableHighAccuracy: false,
                distanceInterval: 200,
                timeInterval: 1000
            },
            result => {
            }
        );
    }
    componentWillReceiveProps(props) {
        if (props.fetchStoresNear.success) {
            this.setState({ isLoading: false })
            console.log('sadwdasdv331',props.fetchStoresNear.data.model)
            this.creatMaker(props.fetchStoresNear.data.model)
        }
    }

    creatMaker(list) {
        for (i in list) {
            var coordinate = {
                latitude: list[i].latitude,
                longitude: list[i].longtitude
            }
            list[i].coordinate = coordinate
        }
        this.setState({ dataMakers: list })
    }

    onRegionChange(region) {
        this.setState({ region });
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
        console.log('921321lmkcvbkmnlcvdf')
        this.setState({ disabled: true })
        this.props.navigation.navigate('StoreTab', { parrent: store })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ disabled: false })
        })
    }
    renderCallOut(store) {
        if (this.state.showCallout) {
            console.log('21321321',this.state.position)
            return (
                <Card style={styles.callOutWrap}>
                    <TouchableOpacity style={{flex:1}} disabled={this.state.disabled} onPress={()=>{this.openStoreDetail(store)}}>
                    <Grid>
                        <Col style={{ flex: 1, justifyContent:'center' }}>
                            <Image resizeMode='contain' style={styles.imageStore} source={{ uri: store.storeImageUrl }} />
                        </Col>
                        <Col style={{ flex:2.5, marginLeft:15, }}>
                            <Text style={styles.shopName}>{store.name}</Text>
                            <View style={styles.starWrap}>
                                {this.renderStar(4)}
                            </View>
                            <Text style={styles.address}>{store.hqAddress}</Text>
                        </Col>
                    </Grid>
                    </TouchableOpacity>
                </Card>
            )
        }
        return null
    }
    render() {
        const navigation = this.props.screenProps.navi
        console.log('sdsadas',this.state.dataMakers)
        return (
            <Container style={styles.container}>
                <HeaderContent leftIcon={'menu'} navi={this.props.screenProps.navi} leftButton={() => navigation.navigate("DrawerOpen")}
                    rightButton={true} title='Cửa hàng gần bạn'>
                </HeaderContent>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}
                    showsUserLocation={true}
                    onPress={()=> {this.setState({showCallout:false})}}
                    onMarkerPress={(e)=> {this.setState({showCallout:true})}}
                    showsMyLocationButton={true}
                >
                    {this.state.dataMakers.map(marker =>
                        <MapView.Marker
                            key={marker.id}
                            coordinate={marker.coordinate}
                            style={styles.marker}
                            onPress={(e)=> {this.setState({storeSelect:marker})}}
                        >
                        </MapView.Marker>
                    )}
                </MapView>
                   {this.renderCallOut(this.state.storeSelect)} 
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
        fetch: (params) => dispatch(fetchStoresNear(params)),
    };
}

const mapStateToProps = state => ({
    fetchStoresNear: state.fetchStoresNear,
});

export default connect(mapStateToProps, bindActions)(StoreNear);