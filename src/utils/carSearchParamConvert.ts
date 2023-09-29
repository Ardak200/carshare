import {CarModule, CarSearchParams, IdNameProp} from "../data/types";
import {orderStatuses} from "./otherDefaultValues.";

const addElems = (searchParam:string) => {
    var finalSearchParam = searchParam
    if(searchParam.length == 0) {
        finalSearchParam = "?";
    } else {
        finalSearchParam = "&";
    }
    return finalSearchParam;
}
export const carSearchParamConvert = (searchParams:CarSearchParams ) => {
    var queryParams= "";
    if(searchParams.page) {
        queryParams = queryParams.concat(addElems(queryParams),"page=" + searchParams.page.toString())
    }
    if(searchParams.carBody) {
        queryParams = queryParams.concat(addElems(queryParams),"carBody=" +searchParams.carBody.toString())
    }
    if(searchParams.carModels) {
        queryParams = queryParams.concat(addElems(queryParams),"carModels="+searchParams.carModels.toString())
    }
    // if(searchParams.transmission) {
    //     queryParams = queryParams.concat(addElems(queryParams),"transmission=["+searchParams.transmission.toString()+"]")
    // }
    // if(searchParams.timeRange) {
    //     queryParams = queryParams.concat(addElems(queryParams),searchParams.timeRange.toString())
    // }
    // if(searchParams.dateRangeValue) {
    //     queryParams = queryParams.concat(addElems(queryParams),searchParams.dateRangeValue.toString())
    // }
    return queryParams;
}


export const carPostAddValidationError = (carModule:CarModule) => {
    var error = "";
    if(carModule.carModel == "") {
        error = error.concat("\n","formStepper.carModelRequired")
    }
    if(carModule.model == "") {
        error = error.concat("\n","formStepper.modelRequired")
    }
    if(carModule.carBody == "") {
        error = error.concat("\n","formStepper.carBodyRequired")
    }
    if(!carModule.productionYear || carModule.productionYear == 0) {
        error = error.concat("\n","formStepper.yearRequired")
    }
    if(carModule.engineVolume == "") {
        error = error.concat("\n","formStepper.engineVolumeRequired")
    }
    if(carModule.color == "") {
        error = error.concat("\n","formStepper.colorRequired")
    }
    if(carModule.transmission == "") {
        error = error.concat("\n","formStepper.transmissionRequired")
    }
    if(carModule.engine == "") {
        error = error.concat("\n","formStepper.engineRequired")
    }
    if(carModule.driveUnit == "") {
        error = error.concat("\n","formStepper.driveUnitRequired")
    }
    if(carModule.rudderLocation == "") {
        error = error.concat("\n","formStepper.rudderLocationRequired")
    }
    if(carModule.priceByDay == "" && carModule.priceByHour == "") {
        error = error.concat("\n","formStepper.priceRequired")
    }
    if(carModule.region == "") {
        error = error.concat("\n","formStepper.regionRequired")
    }
    if(carModule.phoneNumbers == []) {
        error = error.concat("\n","formStepper.phoneRequired")
    }

    return error;
}

export const carCardDescription = (data:CarModule) => {
    let description = "";
    let engineVolume = data.engineVolume != "" ? data.engineVolume : "0";
    description = description.concat(data.productionYear + "г. , ");
    description = description.concat((data.carBody || "Седан") + ", ");
    description = description.concat(engineVolume + "л., ");
    description = description.concat((data.engine || "Бензин") + ", ");
    description = description.concat((data.driveUnit || "Привод")+", ");
    description = description.concat((data.numberOfSeats || "0") + "мест, ")
    description = description.concat((data.color || "Черный") + ", ")
    description = description.concat((data.transmission || ""))
    return description;
}

export const maskPhoneString = (phone:string) => {
    let num = "";
    if(phone.length == 12) {
        num = `${phone.substring(0,2)} (${phone.substring(2, 5)}) ${phone.substring(5, 8)} ${phone.substring(8, phone.length)}`;

    }
    return num

}

export const validParam = (val:string | null | undefined) => {
    const parameters = ["createDate","priceByDay"]
    if(val && parameters.includes(val)) {
        return val;
    } else {
        return "createdDate";
    }
}

export const validDirection = (val:string | null | undefined) => {
    const parameters = ["ASCENDING","DESCENDING"]
    if(val && parameters.includes(val)) {
        return val;
    } else {
        return "ASCENDING";
    }
}

export const returnIdMarkaByName = (val:string,typeOfCar:IdNameProp[])=> {
    if(typeOfCar.length>0) {
        var objectVal = typeOfCar.find(f=>f.name == val);
        if(objectVal) {
            return objectVal.id;
        } else {
            return "";
        }
    }
}

export const returnNameById = (val:string,typeOfCar:IdNameProp[])=> {
    if(typeOfCar.length>0) {
        var objectVal = typeOfCar.find(f=>f.id == val);
        console.log("console.log(typeOfCar.length)")
        console.log(typeOfCar.length)
        if(objectVal) {
            return objectVal.name;
        } else {
            return "";
        }
    }
}

export const isValidYear = (year:number|undefined|"")=> {
    if(year != "" && typeof year == "number" && year>= new Date().getFullYear()) {
        return year;
    }else {
        return undefined
    }
}

export const orderStatusName = (name:string) => {
    if(name == orderStatuses.RESERVED) {
        return ("Зарезервирован");
    }else if(name == orderStatuses.PENDING_LEASE_APPROVAL) {
        return ("Ожидает одобрения об аренде");
    } else if(name==orderStatuses.APPROVED) {
        return ("Одобрен");
    } else if (name==orderStatuses.REJECTED) {
        return ("Отклонён");
    } else if (name==orderStatuses.CANCELED) {
        return ("Отменён");
    } else if(name==orderStatuses.AWAITING_PAYMENT) {
        return ("Ожидает оплату");
    } else if (name==orderStatuses.PAID) {
        return ("Оплачен");
    } else if (name==orderStatuses.PAYMENT_DEADLINE_HAS_EXPIRED) {
        return ("Истёк срок оплаты");
    } else if(name==orderStatuses.RENTED) {
        return ("В аренде");
    } else if (name == orderStatuses.ACTIVE) {
        return "Активный"
    } else if (name== orderStatuses.INACTIVE) {
        return "Неактивный"
    } else if (name == orderStatuses.EXTENDED) {
        return ("Продлен");
    } else {
        return "Статус не определен"
    }
}