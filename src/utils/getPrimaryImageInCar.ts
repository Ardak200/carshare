import {CarImageType} from "../data/types";

export const getPrimaryImageInCar = (images:CarImageType[] | null | undefined) => {

    if(images != null) {
        console.log("http://192.168.1.2:8092" + images.find(i=>i.primary)?.link)
        return images.find(i=>i.primary)?.link
    }

    return null;
}