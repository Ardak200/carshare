import {CarSearchParams, ProfilePhoneNumber, UserProfileProp} from "../../../data/types";
import axiosAuthClient from "../../appAuthorized";
import axiosClient from "../../appClient";
const BASE_URL = process.env.REACT_APP_RENT_URL+"v1";
const BASE_URL_PUBLIC = process.env.REACT_APP_RENT_URL+"public/v1";

export function getUserPhones() {
    return axiosAuthClient.get(`${BASE_URL}/userProfile/phoneNumbers/`)
}

export function postPhoneNumber(profilePhoneNumber:ProfilePhoneNumber) {
    return axiosAuthClient.post(`${BASE_URL}/userProfile/phoneNumbers/`,profilePhoneNumber)
}

//Получить профиль по айди
export function getUserProfile(userId:string) {
    return axiosClient.get(`${BASE_URL_PUBLIC}/userProfile/${userId}/`)
}

export function postOrEdit(userProfile:UserProfileProp) {
    return axiosAuthClient.put(`${BASE_URL}/userProfile`,userProfile)
}
