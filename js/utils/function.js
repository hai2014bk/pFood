import { AsyncStorage } from 'react-native'
import * as mConstants from './Constants';
import {  Alert } from "react-native";

export async function add(item) {   
    let data = [];
    if (item.quantity == 0) {
        Alert.alert('', 'Hãy chọn số lượng')
    } else {
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