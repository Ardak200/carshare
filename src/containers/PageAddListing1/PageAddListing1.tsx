import React, {FC, useEffect, useRef, useState} from "react";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import ListOfElementSearch from "../../shared/listOfElement/ListOfElementSearch";
import {CarModule} from "../../data/types";
import {getCarModelById, getCarModels} from "../../axios/lib/rent/references";
import {saveCarToLocalStorage} from "../../utils/storageSaveCar";
export interface PageAddListing1Props {
    carModule:CarModule,
    setCarModule:Function,
    step:number,
    setStep:Function,
    typeOfCar?:[],
    typeOfModules?:any[],
    setTypeOfModules:Function
}

const PageAddListing1: FC<PageAddListing1Props> = ({
    carModule,
    setCarModule,
    typeOfCar=[],
    step,
    setStep,
    setTypeOfModules, }) => {
    const inputReference1 = useRef(null);
    const [activeMarka,setActiveMarka] = useState(carModule.carModel);
    const [carMarka,setCarMarkas] = useState<any[]>([]);
    const [carModules,setCarModules] = useState<any[]>([]);
    const [activeMarkaName,setActiveMarkaName] = useState(carModule.carModelName);
    const [activeModuleName,setActiveModuleName] = useState(carModule.modelName);

    const onClickMarka = (name:string) => {
        let markaName = carMarka.find(l=>l.id == name).name;
        setActiveMarka(name);
        setActiveModuleName("");
        setActiveMarkaName(markaName)
        carModule.carModelName = markaName;
        carModule.carModel = name;
        carModule.model = "";
        carModule.modelName = ""
        getCarModelById(name).then(res=> {
            setTypeOfModules(res.data)
        })
        saveCarToLocalStorage(carModule,step)
        setStep(step+1);
        setCarModule(carModule)
    }

    useEffect(() => {
      getCarModels().then(res=> {
          setCarMarkas(res.data)
      })
      if(carModule.carModel != "") {
          getCarModelById(activeMarka).then(res=> {
              setCarModules(res.data)
          })      }
    },[])


    return (
      <>
        <div className="w-500 border-b border-neutral-200 dark:border-neutral-800 "><b className="shadow-black/10">Марка машины :</b> {activeMarka != "" && activeMarkaName}</div>
        <div className="space-y-8">
          {/* МАРКА МАШИНЫ */}
                <ListOfElementSearch refinput={inputReference1} list={typeOfCar} active={activeMarka} placeholder={"Поиск по марке"} setActive={onClickMarka} />
        </div>
      </>
  );
};

export default PageAddListing1;
