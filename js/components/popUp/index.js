import React, { Component } from "react";
import { Image, View, Switch, TouchableOpacity, Platform } from "react-native";

import { NavigationActions } from "react-navigation";
import { Container, Header, Content, Text, Button, Icon, Thumbnail, Item, Input, Left, Right, Body, CheckBox } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import * as appFunction from "../../utils/function"

import styles from "./styles";

const primary = require("../../themes/variable").brandPrimary;

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })],
});
class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipTypes: {
                ViettelPost: true,
                Adayroi: false,
                Grab: false,
                Uber: false
            },
            item: {},
            ship: 'ViettelPost'
        };
    }

    componentDidMount() {
        console.log('visible',this.props.visible)
        if(this.props.visible){
            this.popupDialog.show()
        }
    }


    addCart() {
        let item = this.props.item
        item.shipType = this.state.ship
        appFunction.add(item)
        this.popupDialog.dismiss()
    }

    updateStatus(key) {
        let boxType = Object.assign({}, this.state.shipTypes)
        for (let k in boxType) {
            if (boxType.hasOwnProperty(k)) {
                boxType[k] = false;
                if (k === key) {
                    boxType[k] = true;
                }
            }
        }
        this.setState({ shipTypes: boxType, ship: key });
    }

    pickerWrap(text, key) {
        let shipTypes = this.state.shipTypes
        let checked = shipTypes[key] ? true : false;
        return (
            <TouchableOpacity style={styles.pickerWrap} onPress={() => this.updateStatus(key)}>
                <CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key)} />
                <Text style={styles.checkboxText}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Container>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Hình thức vận chuyển" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    onDismissed={() => this.popupDialog.dismiss()}
                    dialogStyle={{ marginTop: -200 }}
                    width={250}
                    height={250}
                    actions={[
                        <DialogButton
                            text="Xác nhận" t
                            onPress={() => {
                                this.addCart()
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                    <View style={styles.pickerContainer}>
                        {this.pickerWrap('Viettel Post', 'ViettelPost')}
                        {this.pickerWrap('Adayroi', 'Adayroi')}
                        {this.pickerWrap('Grab', 'Grab')}
                        {this.pickerWrap('Uber', 'Uber')}
                    </View>

                </PopupDialog>
            </Container>
        );
    }
}

export default Popup;
