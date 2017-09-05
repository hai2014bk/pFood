import {Platform, AsyncStorage } from 'react-native'
import * as mConstants from './Constants';
import {  Alert } from "react-native";
import {  Toast } from "native-base";
const primary = require("../themes/variable").brandPrimary;
const platform = Platform.OS
export async function add(item) {   
    let data = [];
    var quantity = item.quantity - item.quantityStep
    if (quantity  <= 0) {
        Alert.alert('', 'Hãy chọn số lượng')
    } else {
        Toast.show({
            text: 'Đã thêm vào giỏ hàng',
            position: 'bottom',
            duration:1800,
            type:'success',
            style: {
                backgroundColor:primary,
                width:'90%',
                height:35,
                justifyContent:'center',
                alignItems:'center',
                alignSelf:'center',
                borderRadius:5,
                marginBottom:platform === "ios" ? 0 : 60,
            }
          })
        try {
            const value = await AsyncStorage.getItem('cartUser');
            if (value !== null) {
                data = JSON.parse(value);
            }

        } catch (error) {
        }
        var temp = []
        for (i = 0; i < data.length; i++) {
            temp.push(data[i].id)
        }
        var a = temp.indexOf(item.id)
        if (a >= 0) {
            for (i = 0; i < data.length; i++) {
                if (data[i].id == item.id) {
                    let quantity = item.quantity
                    data[i].quantity += quantity
                }
            }
        } else {
            data.push(item);
        }
        try {
            await AsyncStorage.setItem('cartUser', JSON.stringify(data));
        } catch (error) {
        }
    }
}