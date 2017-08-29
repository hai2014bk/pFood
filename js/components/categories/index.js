import React, { Component } from "react";
import {Alert, Dimensions, FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories, fetchSubCategories } from "../../actions/fetchCategories.js"
import { Thumbnail, Container, Header, Content, Button, Icon, Left, Right, Item, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";

import styles from "./styles";
var circle = require('../../../images/greyCircle.png')
const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const iconFood = require("../../../images/vegeterian_food1600.png")
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentChoose : ''
        };
    }

    componentDidMount() {
        this.props.fetch()
    }
    _keyExtractor = (item, index) => item.id;

    componentWillReceiveProps(props) {
        if (props.fetchCategories.success) {
            var dataParentFood = []
            var listFood = props.fetchCategories.data.model
            console.log(listFood)
            for (i in listFood) {
                if (!listFood[i].parentId) {
                    console.log(listFood[i])
                    dataParentFood.push(listFood[i])
                }
            }
            this.setState({ data: dataParentFood })
        }
        if (!props.fetchCategories.success) {
            setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
        }
        if (props.fetchSubCategories.successSub) {
            console.log('ssaaa')
            var subCategories = props.fetchSubCategories.data.model
            if (subCategories.length > 0) {
                console.log(this.state.parentChoose.id,"vassssaas",subCategories[0])
                if(subCategories[0].parentId == this.state.parentChoose.id)
                    this.props.navigation.navigate("SubCategories", { data: subCategories,parent:this.state.parentChoose})
            } else {
                console.log('ddddd')
            }
        }
    }
    choseFood(food){
        this.props.fetchSub(food.id)
        this.setState({parentChoose:food})
    }

    renderCell(data) {
        var icon = '' 
        if(data.item.icon) {
            icon = data.item.icon
        }        
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {this.choseFood(data.item) }}>
                <Image resizeMode='cover' style={styles.imageBackgroundItem} source={{ uri: data.item.imageUrl }}>
                    <View style={styles.opacityView}>
                    <Image style={{width:'40%', marginBottom:5}} resizeMode='contain' source={{uri:icon}}/>
                        <Text style={styles.title}>{data.item.name}</Text>
                        </View>
                    </Image>
            </TouchableOpacity>

        )
    }

    render() {
        const navigation = this.props.screenProps.navi;
        console.log('data state', this.state.data)
        return (
            <Container style={styles.container}>
                <HeaderContent title="Danh mục" leftIcon={'menu'} leftButton={() => navigation.navigate("DrawerOpen")} />
                <Content style={styles.contentWrap}>
                    <FlatList style={{margin:10}}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={this._keyExtractor}
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
        fetch: () => dispatch(fetchCategories()),
        fetchSub: (parentId) => dispatch(fetchSubCategories(parentId))
    };
}

const mapStateToProps = state => ({
    fetchCategories: state.fetchCategories,
    fetchSubCategories: state.fetchSubCategories
});

export default connect(mapStateToProps, bindActions)(Categories);
