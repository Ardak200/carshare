import {CarModule} from "../data/types";

export const saveCarToLocalStorage = (carModule:CarModule,step:number) => {
    localStorage.setItem("carPost", JSON.stringify(carModule));
    localStorage.step = step;
}