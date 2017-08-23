import React, { Component } from "react";
import { FlatList, Image, View, TouchableOpacity, Platform, Text } from "react-native";
import { fetchCategories, fetchSubCategories } from "../../actions/fetchCategories.js"
import { Thumbnail, Container, Header, Content, Button, Icon, Left, Right, Item, Body, List, ListItem, Label } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { connect } from "react-redux";

import styles from "./styles";
var circle = require('../../../images/greyCircle.png')
const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;

class SubCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({ data: params.data })
    }

    componentWillReceiveProps(props) {
        if (props.fetchSubCategories.successSub) {
            console.log('ssaaa')
            var subCategories = props.fetchSubCategories.data.model
            if (subCategories.length > 0) {
                this.props.navigation.navigate("SubCategories", { data: subCategories })
            } else {
                 this.props.navigation.navigate("Pruduct")
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
                <HeaderContent title={params.parent.name} leftButton={() => navigation.goBack()} leftIcon="ios-arrow-back" />
                <Content style={styles.contentWrap}>
                    <FlatList style={{margin:10}}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item)=> item.id}
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
