import React, { Component } from "react";
import { Dimensions, FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories, fetchSubCategories } from "../../actions/fetchCategories.js"
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
                this.props.navi.navigate("SubCategories", { data: subCategories })
            } else {
                console.log('ddddd')
            }
        }
    }

    renderCell(data) {
        console.log('11111', data)
        // return (
        //     <Item style={{backgroundColor:'blue', flex: 1, alignItems: 'center', borderBottomWidth: 0 }}>
        //         <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.props.fetchSub(data.item.id) }}>
        //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                 <Thumbnail style={styles.thumnail} square size={70} source={{ uri: data.item.imageUrl }} />
        //                 <Text style={styles.title}>{data.item.name}</Text>
        //             </View>
        //         </TouchableOpacity>
        //     </Item>
        // )
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.props.fetchSub(data.item.id) }}>
                <Image resizeMode='cover' style={styles.imageBackgroundItem} source={{ uri: data.item.imageUrl }}>
                    <View style={styles.opacityView}>
                        </View>
                    </Image>
            </TouchableOpacity>

        )

    }
    render() {
        const navigation = this.props.navi;
        console.log('data state', this.state.data)
        return (
            <Container style={styles.container}>
                <HeaderContent title="Danh mục" leftButton={() => navigation.goBack()} leftIcon="ios-arrow-back" />
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
