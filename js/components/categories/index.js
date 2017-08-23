import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories,fetchSubCategories } from "../../actions/fetchCategories.js"
import { Thumbnail, Container, Header, Content, Button, Icon, Left, Right, Item, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";

import styles from "./styles";
var circle = require('../../../images/greyCircle.png')
const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.fetch()
    }

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
        if(!props.fetchCategories.success) {
            setTimeout(()=>{Alert.alert('Lỗi mạng','Có vấn đề khi kết nối đến máy chủ')})
        }
    }

    renderCell(data) {
        return (
            <Item style={{flex: 1,alignItems:'center',borderBottomWidth:0}}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { console.log(112) }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Thumbnail style={styles.thumnail} square size={70} source={{ uri: data.imageUrl }} />
                    <Text style={styles.title}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
            </Item>
        )
    }
    render() {
        const navigation = this.props.navigation;
        console.log('data state', this.state.data)
        return (
            <Container style={styles.container}>
                <HeaderContent title="Danh mục" leftButton={() => navigation.goBack()} leftIcon="ios-arrow-back" />
                <Content style={styles.contentWrap}>
                    <List style={styles.listWrap} dataArray={this.state.data} renderRow={(item) =>
                        <ListItem style={styles.listItem}>
                            {this.renderCell(item)}
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
        fetchSub:(parentId) => dispatch(fetchSubCategories(parentId))
    };
}

const mapStateToProps = state => ({
    fetchCategories: state.fetchCategories,
    fetchSubCategories:state.fetchSubCategories
});

export default connect(mapStateToProps, bindActions)(Categories);
