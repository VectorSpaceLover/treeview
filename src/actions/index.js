import axios from 'axios';
import {SERVER_URL} from '../constant'


export const createIssueFix = (convDate, invDate, 
    convocationTime, presidentName, recipients, auditors, dirTree) => {
    
    var params = {
      lockedForFileInsert: false,
      invitationDate: invDate,
      convocationDate: convDate,
      convocationTime: convocationTime,
      formattedConvocationDate: convDate,
      presidentName: presidentName,
      recipients: recipients,
      auditors: auditors,
      dirTree:dirTree};
    
    var operationParams = 
    {
      app_user: "app", 
      app_password: "meeting",
      operation: "createIssue", 
      issueName: "Seduta del " + convDate, 
      params: JSON.stringify(params)
    };
    
    return operationParams;
};

export const checkIssueFix = (convDate) => {
    
    var params = null;
    
    var operationParams = 
    {
      app_user: "app", 
      app_password: "meeting",
      operation: "issueExists", 
      issueName: "Seduta del " + convDate, 
      params: JSON.stringify(params)
    };
    
    return operationParams;
};

export const checkPost = () => {
    let checkRT = {"operation":"CHECKEXISTS","failureMessage":null,"failureCode":null,"status":"ok","result":true};
    return checkRT;
}

export const createPost = () => {
    let createRT = {
        "operation":"CREATE","failureMessage":null,"failureCode":null,"status":"ok",
        "result":{
            "issueName":"Seduta del 2021-12-02","lockedForFileInsert":false,"convocationDate":"2021-12-02","formattedConvocationDate":"2021-12-02","convocationTime":"19:34","invitationDate":"2021-12-02","presidentName":"","recipients":[],"auditors":[],
            "dirTree":[
                {
                  "id": 1,
                  "parent": 0,
                  "droppable": true,
                  "text": "Seduta del 2021-12-02",
                  "data": {
                    "fileSize": "Standard"
                  }
                }
            ]
        }
    };
    return createRT;
}


export const doPost = (operationParams) => {
    return axios.post(SERVER_URL, operationParams)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err.message);
        return false;
    })
}
