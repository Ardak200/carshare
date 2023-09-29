import axiosAuthClient from "../../appAuthorized";
import {OrderTypeProps} from "../../../data/types";
import {orderStatuses} from "../../../utils/otherDefaultValues.";

export const createOrder = (data:OrderTypeProps) => {
    return axiosAuthClient.post(process.env.REACT_APP_ORDER_URL + "v1/orders/order", data)
}

//Обновить заказ
export const editOrder = (data:OrderTypeProps) => {
    return axiosAuthClient.put(process.env.REACT_APP_ORDER_URL + "v1/orders/order", data)
}
//Получить все заказы
export const getAllOrder = () => {
    return axiosAuthClient.get(process.env.REACT_APP_ORDER_URL + "v1/orders/")
}

//заказы по собственным автомобилям
export const getOrderFromOwncar = (userId:string) => {
    return axiosAuthClient.get(process.env.REACT_APP_ORDER_URL+`v1/orders/cars/${userId}`)
}

//заказы по собственным автомобилям
export const getOrderFromOwncarByStatus = (userId:string, orderStatus:orderStatuses|"") => {
    return axiosAuthClient.get(process.env.REACT_APP_ORDER_URL+`v1/orders/cars/${userId}/${orderStatus}`)
}


//заказы отправленные вами запросы
export const getOrderByUserRequest = (userId:string) => {
    return axiosAuthClient.get(process.env.REACT_APP_ORDER_URL+`v1/orders/byUserId/${userId}`)
}

// Получить заказа по user кто отправил запрос и по статусу заказа
export const getOrderByUserAndStatusRequest = (userId:string, orderStatus:orderStatuses|"") => {
    return axiosAuthClient.get(process.env.REACT_APP_ORDER_URL+`v1/orders/byUserIdAndStatus/${userId}/${orderStatus}`)
}






