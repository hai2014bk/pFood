import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
var background = require('../../../images/background.png')

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.validateEmail = this.validateEmail.bind(this)
    }

    componentWillReceiveProps(props) {

    }

    onSend(){
        if(this.state.email){
            if(!this.validateEmail(this.state.email)){
                Alert.alert('','Email is not a valid type')
            } else {

            }
        } else {
            Alert.alert('','Please type your email.')
        }
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <ScrollView>
                <Container style={styles.containerWrap}>
                    <Spinner visible={this.state.isLoading} />
                    <Image source={background} style={styles.imageBackground}>
                        <Icon name="ios-arrow-back" style={styles.iconBack} size={50} onPress={() => navigation.goBack()} /> 
                        <View style={styles.container}>
                            <View style={styles.questionWrap}>
                                <Text style={styles.questionText}>Forgot your password?{"\n"} Please type your email.</Text>
                            </View>
                            <Form>
                                <Item style={styles.input} regular >
                                    <Input style={styles.textInput} value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Input your email' placeholderTextColor='#f4e6db' />
                                </Item>
                            </Form>
                            <View style={styles.questionWrap}>
                                <Text style={styles.questionText}>Please check your email after sending, {"\n"} we will send to you new password to login.</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onSend()} style={styles.button} >
                                <Text style={{ color: '#f4e6db' }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </Container>
            </ScrollView>
        );
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
function bindActions(dispatch) {
    return {
        register: (params) => dispatch(createAccount(params)),
    };
}

const mapStateToProps = state => ({
    createAccountSuccess: state.createAccountSuccess,
    createAccountFailed: state.createAccountFailed
});

export default connect(mapStateToProps, bindActions)(ForgetPassword);
