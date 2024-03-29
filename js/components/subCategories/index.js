import React, { Component } from "react";
import {InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories, fetchSubCategories } from "../../actions/fetchCategories.js"
import { Thumbnail, Container, Header, Content, Button, Icon, Left, Right, Item, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import styles from "./styles";
var circle = require('../../../images/greyCircle.png')
const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const iconFood = ''

class SubCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            disabled: false,
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({ data: params.data })
    }

    componentWillReceiveProps(props) {
        this.setState({ isLoading: false })
        if (props.fetchSubCategories.successSub) {
            var subCategories = props.fetchSubCategories.data.model
            if (subCategories.length > 0) {
                if (subCategories[0].parentId == this.state.parentChoose.id) {
                    this.props.navigation.navigate("SubCategories", { data: subCategories, parent: this.state.parentChoose })
                    InteractionManager.runAfterInteractions(() => {
                        this.setState({disabled:false})            
                })
                }
            } else {
                console.log('22222', props.fetchSubCategories.data.checkId, this.state.parentChoose.id)
                if (props.fetchSubCategories.data.checkId == this.state.parentChoose.id) {
                    this.props.navigation.navigate("Pruduct", { parent: this.state.parentChoose })
                    InteractionManager.runAfterInteractions(() => {
                        this.setState({disabled:false})            
                })
                }
            }
        }
    }
    choseFood(food) {
        this.props.fetchSub(food.id)
        this.setState({ parentChoose: food })
    }

    renderCell(data) {
        var icon = '' 
        if(data.item.iconUrl) {
            icon = data.item.iconUrl
        }        
        console.log('jkhofdgjkdfsjkre', data.item)
        return (
            <TouchableOpacity disabled={this.state.disabled} style={{ flex: 1 }} onPress={() => {this.setState({disabled:true}),this.choseFood(data.item) }}>
                <Image resizeMode='cover' style={styles.imageBackgroundItem} source={{ uri: data.item.imageUrl }}>
                    <View style={styles.opacityView}>
                    <Image style={{width:'40%',aspectRatio:1, marginBottom:5}} resizeMode='contain' source={{uri:icon}}/>
                        <Text style={styles.title}>{data.item.name}</Text>
                        </View>
                    </Image>
            </TouchableOpacity>

        )
    }
    render() {
        const navigation = this.props.navigation;
        const { params } = this.props.navigation.state
        console.log('data state', this.state.data)
        return (
            <Container style={styles.container}>
                <HeaderContent title={params.parent.name} leftButton={() => navigation.goBack()}
                    leftIcon="ios-arrow-back" />
                <Spinner visible={this.state.isLoading} />
                <Content style={styles.contentWrap}>
                    <FlatList style={{ margin: 10 }}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={(item) => (
                            <View style={styles.listItem} >
                                {this.renderCell(item)}
                            </View>
                        )
                        }
                    />
                </Content>
            </Container>
        );
    }
}
function bindActions(dispatch) {
    return {
        fetchSub: (parentId) => dispatch(fetchSubCategories(parentId))
    };
}

const mapStateToProps = state => ({
    fetchSubCategories: state.fetchSubCategories
});

export default connect(mapStateToProps, bindActions)(SubCategories);
