import axios from 'axios';
import {getCookie} from "typescript-cookie";
import {KeyCloakTokenType} from "../data/types";
const kcTokens = "keycloak-tokens";
const token = () => {
    let value:KeyCloakTokenType = {
        idToken: "",
        refreshToken:"",
        token: ""
    }
    let stringToken = JSON.stringify(value);
    if(typeof getCookie(kcTokens) != undefined) {
        value =  JSON.parse(getCookie(kcTokens) || stringToken);
    }
    console.log(value.token)
    return value.token;
}
// const token = JSON.parse(getCookie(kcTokens)|| "");
const axiosAuthClient = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${token()}`
    }
});

axiosAuthClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res.status == 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosAuthClient;