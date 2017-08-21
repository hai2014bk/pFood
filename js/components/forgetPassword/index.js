import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView } from "react-native";
import { forgetPassword } from "../../actions/forgetPassword.js"
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
            email: '',
            isLoading: false
        };
        this.validateEmail = this.validateEmail.bind(this)
    }

    componentWillReceiveProps(props) {
        // console.log('props', props)
        if (props.forgetPassword.success) {
            this.setState({ isLoading: false })
            setTimeout(() => {
                Alert.alert(
                    '',
                    'Gửi yêu cầu thành công! Vui lòng kiểm tra lại hòm thư',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false }
                )
            }, 200)

        } else {
            this.setState({ isLoading: false })
            setTimeout(() => { Alert.alert('', 'Gửi yêu cầu thất bại! Vui lòng thử lại') }, 200)
        }
    }

    onSend() {
        if (this.state.email) {
            if (!this.validateEmail(this.state.email) || !this.validateUnicode(this.state.email)) {
                Alert.alert('', 'Địa chỉ email không hợp lệ')
            } else {
                let params = {}
                params.email = this.state.email
                this.props.forget(params)
                this.setState({isLoading:true})
            }
        } else {
            Alert.alert('', 'Hãy nhập địa chỉ email')
        }
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.containerWrap}>
                <Spinner visible={this.state.isLoading} />
                <Image source={background} style={styles.imageBackground}>
                    <Content>
                        <Icon name="ios-arrow-back" style={styles.iconBack} size={60} onPress={() => navigation.goBack()} />
                        <View style={styles.container}>
                            <View style={styles.questionWrap}>
                                <Text style={styles.questionText}>Bạn quên mật khẩu?{"\n"} Hãy nhập email của bạn.</Text>
                            </View>
                            <Form>
                                <Item style={styles.input} regular >
                                    <Input style={styles.textInput} value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Địa chỉ email' placeholderTextColor='#f4e6db' />
                                </Item>
                            </Form>
                            <View style={styles.questionWrap}>
                                <Text style={styles.questionText}>Hãy kiểm tra hòm thư của bạn sau khi ấn Gửi, chúng tôi sẽ gửi cho bạn mật khẩu mới để đăng nhập.</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onSend()} style={styles.button} >
                                <Text style={{ color: '#f4e6db' }}>Gửi</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Image>
            </Container>
        );
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateUnicode(email) {
        var regex = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
        if (regex.test(email)) {
            return true;
        }
        return false;
    }
}
function bindActions(dispatch) {
    return {
        forget: (params) => dispatch(forgetPassword(params)),
    };
}

const mapStateToProps = state => ({
    forgetPassword: state.forgetPassword
});

export default connect(mapStateToProps, bindActions)(ForgetPassword);
