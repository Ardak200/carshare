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

const PageAddListing1_2: FC<PageAddListing1Props> = ({
                                                       carModule,
                                                       setCarModule,
                                                       setStep,
                                                       step,
                                                       typeOfCar=[],
                                                       typeOfModules=[],
                                                       setTypeOfModules, }) => {
    const inputReference2 = useRef(null);
    const [activeMarka,setActiveMarka] = useState(carModule.carModel);
    const [activeModel,setActiveModel] = useState(carModule.model);
    const [carModules,setCarModules] = useState<any[]>([]);
    const [activeModuleName,setActiveModuleName] = useState(carModule.modelName);

    const onClickModel = (id:string, name?:string) => {
        console.log(id,name)
        carModule.model = id;
        setCarModule(carModule);
        setActiveModel(id);
        let moduleName = name || "";
        setActiveModuleName(moduleName || "")
        carModule.modelName = moduleName;
        saveCarToLocalStorage(carModule,step)
        setStep(step+1)
    }

    useEffect(() => {
        getCarModelById(activeMarka).then(res=> {
            setCarModules(res.data)
        })
    },[])


    return (
        <>
            <div className="w-500 border-b border-neutral-200 dark:border-neutral-800 "><b className="shadow-black/10">Модель машины :</b> {activeModuleName || ""}</div>
            {activeMarka!="" &&
                <div className="space-y-8">
                    {/* Модель МАШИНЫ */}
                    <ListOfElementSearch refinput={inputReference2} list={typeOfModules} active={activeModel} setActiveName={setActiveModuleName}
                                         placeholder={"Поиск по модели"} setActive={onClickModel} activeName={activeModuleName}/>
                </div>
            }
        </>
    );
};

export default PageAddListing1_2;
