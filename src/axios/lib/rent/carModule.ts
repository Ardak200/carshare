import axiosAuthClient from "../../appAuthorized";
import {CarModule, CarSearchParams} from "../../../data/types";
import {FileValidated} from "@dropzone-ui/react";
import axiosClient from "../../appClient";
import {DecodedValueMap} from "use-query-params";
import {queryConfig} from "../../../shared/Pagination/Pagination";
const BASE_URL = process.env.REACT_APP_RENT_URL+"v1";
const BASE_URL_PUBLIC = process.env.REACT_APP_RENT_URL+"public/v1";
export function addCarPost(carModule:CarModule, token:string|undefined) {
    axiosAuthClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axiosAuthClient.post(`${BASE_URL}/cars/`, carModule)
}

export function getCarPost(query:Object) {
    return axiosClient.post(`${BASE_URL_PUBLIC}/cars/getAllCar`, query)
}

// Добавить фото машины
export function addImageForCarPost(id:string,files:FileValidated[],token:string|undefined) {
    axiosAuthClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    var formData =new FormData();
    files.map(f=> {
        if(f.valid) {
            formData.append("multipartFileList", f.file)
        }
    })
    return axiosAuthClient.post(`${BASE_URL}/cars/addImage/${id}`, formData, {
        headers: {
            "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    })
}

//Получить детальное описание машины
export function getCarById(id:string) {
    return axiosClient.get(`${BASE_URL_PUBLIC}/cars/${id}`);
}

//Получить все свои машины
export function getAllMyCars(isActive:boolean) {
    return axiosAuthClient.get(`${BASE_URL}/cars/myCars`,{params: {
        isActive:isActive
    }})
}

//Удалить машину
export function removeCar(id:string) {
    return axiosAuthClient.delete(`${BASE_URL}/cars/${id}`)
}

//Редактировать машину
export function editCarById(id:string,carModule:CarModule) {
    return axiosAuthClient.put(`${BASE_URL}/cars/${id}`, carModule);
}

//Изменить статус машины
export function changeCarStatus(id:string, activeFlag:boolean) {
    return axiosAuthClient.post(`${BASE_URL}/cars/active/${id}`,{}, {params: {
        isActive:activeFlag
    }})
}