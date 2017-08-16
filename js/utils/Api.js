import {AsyncStorage} from 'react-native'

import * as mConstants from './Constants';

export function APIRequestGET(url,isAuth,successCallback,errorCallback) {
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
            if(model.status=="Success") {
                successCallback(responseJson)
            } else {
                errorCallback(response.errorMessage)
            }
            })
        })
        .catch((error) => {
        });
    } else {
    var token;
     AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
     token = JSON.parse(result).accessToken
     console.log('token',token)
      fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then((response) => {
     response.json().then((responseJson) => {
            let model = responseJson.model
            if(model.status=="Success") {
                successCallback(responseJson)
            } else {
                errorCallback(response.errorMessage)
            }
            })
     })
    .catch((error) => {
      console.log(error);
    });
     });
    }
}

export function APIRequestPOST(url,param,isAuth,successCallback,errorCallback) {

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
            if(model.status=="Success") {
                successCallback(responseJson)
            } else {
                errorCallback(response.errorMessage)
            }
            })
        })
        .catch((error) => {
        });
    } else {
    var token;
     AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
     token = JSON.parse(result).accessToken
      fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(param)
    }).then((response) => {
     response.json().then((responseJson) => {
            let model = responseJson.model
            if(model.status=="Success") {
                successCallback(responseJson)
            } else {
                errorCallback(response.errorMessage)
            }
            })
     })
    .catch((error) => {
    });
     });
    }
}
