import { AsyncStorage } from 'react-native'

import * as mConstants from './Constants';

export function APIRequestGET(url, isAuth, successCallback, errorCallback) {
    if (!isAuth) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            response.json().then((responseJson) => {
                let model = responseJson.model
                if (model) {
                    if (responseJson.requestStatus == "Success") {
                        successCallback(responseJson)
                    } else {
                        errorCallback(responseJson.errorMessage)
                    }
                } else {
                    errorCallback(responseJson.errorMessage)
                }
            })
        })
            .catch((error) => {
            });
    } else {
        var token;
        AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
            console.log(result)
            token = JSON.parse(result).model.accessToken
            console.log('token', token)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token,
                },
            }).then((response) => {
                console.log('aaa',response)
                response.json().then((responseJson) => {
                    let model = responseJson.model
                    if (model) {
                        if (responseJson.requestStatus == "Success") {
                            successCallback(responseJson)
                        } else {
                            errorCallback(responseJson.errorMessage)
                        }
                    } else {
                        errorCallback(responseJson.errorMessage)
                    }
                })
            })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
}

export function APIRequestPOST(url, param, isAuth, successCallback, errorCallback) {

    if (!isAuth) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        }).then((response) => {
            response.json().then((responseJson) => {
                let model = responseJson.model
                console.log('res',responseJson)
                if (model) {
                    if (responseJson.requestStatus == "Success") {
                        successCallback(responseJson)
                    } else {
                        errorCallback(responseJson.errorMessage)
                    }
                } else {
                    errorCallback(responseJson.errorMessage)
                }
            })
        })
            .catch((error) => {
            });
    } else {
        var token;
        AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
            token = JSON.parse(result).model.accessToken
            console.log('paraaa',param,url)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token,
                },
                body: JSON.stringify(param)
            }).then((response) => {
                console.log('res1',response)
                response.json().then((responseJson) => {
                    console.log('res',responseJson)
                    let model = responseJson.model
                    if (model) {
                        if (responseJson.requestStatus == "Success") {
                            successCallback(responseJson)
                        } else {
                            errorCallback(responseJson.errorMessage)
                        }
                    } else {
                        errorCallback(responseJson.errorMessage)
                    }
                })
            })
                .catch((error) => {
                });
        });
    }
}
