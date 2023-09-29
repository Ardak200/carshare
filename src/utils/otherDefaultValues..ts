import {CarModule, CarSearchParams, IdNameProp, OrderTypeProps, ProfilePhoneNumber, RegionType} from "../data/types";
import carUtilities1 from "../images/carUtilities/1.png";
import carUtilities2 from "../images/carUtilities/2.png";
import carUtilities3 from "../images/carUtilities/3.png";
import carUtilities4 from "../images/carUtilities/4.png";
import carUtilities5 from "../images/carUtilities/5.png";
import carUtilities6 from "../images/carUtilities/6.png";
import carUtilities7 from "../images/carUtilities/7.png";
import carUtilities8 from "../images/carUtilities/8.png";
import useQuery from "../hooks/useQuery";
import {HookCallbacks} from "async_hooks";
import * as H from "history";
import {Debugger} from "inspector";

export const allKzRegion:RegionType[] =[{
    "id": "",
    "name": "",
    "cities": [{
    "name": "",
    "id": ""
}]
}]


export const Amenities_demos =(data:CarModule) => [
    { name: data.engineVolume + "л.", icon: carUtilities1 },
    {
        name: data.engine || "Бензин",
        icon: carUtilities2,
    },
    { name: data.productionYear + "г.", icon: carUtilities7 },
    { name: data.carBody, icon: carUtilities3 },
    { name: data.transmission, icon: carUtilities4 },
    { name: data.rudderLocation, icon: carUtilities5 },
    { name: data.color || "Черный", icon: carUtilities6 },
    { name: data.transmission, icon: carUtilities8 },
];


export enum orderStatuses {
    RESERVED="RESERVED",
    PENDING_LEASE_APPROVAL="PENDING_LEASE_APPROVAL",
    APPROVED ="APPROVED",
    REJECTED="REJECTED",
    CANCELED="CANCELED",
    AWAITING_PAYMENT="AWAITING_PAYMENT",
    PAID="PAID",
    PAYMENT_DEADLINE_HAS_EXPIRED="PAYMENT_DEADLINE_HAS_EXPIRED",
    RENTED="RENTED",
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    EXTENDED="EXTENDED"
}

export const defaultCarModule:CarModule = {
    "id":"",
    "carModel": "",
    "model":"",
    "transmission": "",
    "rating": 0,
    "description": "",
    "priceByDay": "",
    "priceByHour": "",
    "engineVolume": "",
    "numberOfSeats": 2,
    "productionYear": 0,
    "carBody": "",
    "region": "",
    "city": "",
    "engine": "",
    "rudderLocation":"",
    "driveUnit": "",
    "color": "",
    "active":true,
    "files": [],
    "carModelName":"",
    "modelName":"",
}

export const defaultOrderModule:OrderTypeProps = {
    fromDate: "",
    toDate: "",
    car :defaultCarModule,
    status:orderStatuses.RESERVED
}

export const codePhone:ProfilePhoneNumber = {
    userId:"",
    code:"",
    phoneNumber:""
}

export const defaultIdName:IdNameProp = {
    id:"",
    name:""
}
//
// export const defaultCarSearchParams:CarSearchParams = (query:Location) =>  {
//     return
// }


