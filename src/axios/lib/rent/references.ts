import axiosClient  from "../../appClient";
const BASE_URL = process.env.REACT_APP_RENT_URL+"public/v1";

// Коробка передач
export function getTransmissionOptions() {
    return axiosClient.get(`${BASE_URL}/commons/transmissionOptions`)
}

//Получить список Расположение руля машины
export function getRudderLocationOptions() {
    return axiosClient.get(`${BASE_URL}/commons/rudderLocationOptions`)
}

//Получить список Количество мест
export function getNumberOfSeatsOptions() {
    return axiosClient.get(`${BASE_URL}/commons/numberOfSeatsOptions`)
}

//Получить список Двигатель машины
export function getEngineOptions() {
    return axiosClient.get(`${BASE_URL}/commons/engineOptions`)
}

//Получить список Цвет машины
export function getColorOptions() {
    return axiosClient.get(`${BASE_URL}/commons/colorOptions`)
}

//Получить список Кузов машины
export function getCarBodyOptions() {
    return axiosClient.get(`${BASE_URL}/commons/carBodyOptions`)
}

//Получить все марки машин
export function getCarModels() {
    return axiosClient.get(`${BASE_URL}/carModels`)
}

//Получить все модель машин
export function getCarModelById(number:string) {
    return axiosClient.get(`${BASE_URL}/carModels/${number}/`)
}

//Получить список приводов
export function getDriveUnitOptions() {
    return axiosClient.get(`${BASE_URL}/commons/driveUnitOptions/`)
}

export function getRegions() {
    return axiosClient.get(`${BASE_URL}/regions`)
}
