import React, {FC, FormEvent, OptionHTMLAttributes, useEffect, useState} from "react";
import {numberOfSeats} from "../../data/numberOfSeats";
import {
  getCarBodyOptions, getColorOptions, getDriveUnitOptions,
  getEngineOptions,
  getRudderLocationOptions,
  getTransmissionOptions
} from "../../axios/lib/rent/references";
import RadioButton from "../../shared/RadioButton/RadioButton";
import Select from "../../shared/Select/Select";
import {CarModule} from "../../data/types";
import Textarea from "../../shared/Textarea/Textarea";
import {saveCarToLocalStorage} from "../../utils/storageSaveCar";
export interface PageAddListing4Props {
  carModule:CarModule,
  step:number,
  setStep:Function,
  editPage:boolean
}
const PageAddListing4: FC<PageAddListing4Props> = ({
    carModule,
    step,
    editPage
                                                   }) => {
  const [typeOfKuzov,setTypeOfKuzov] = useState([]);
  const [activeKuzov,setActiveKuzov] = useState(carModule.carBody);
  const [typeOfTransmission,setTypeOfTransmission] = useState([]);
  const [activeTransmission,setActiveTransmission] = useState(carModule.transmission);
  const [rudderLocations,setRudderLocations] = useState([]);
  const [activeRudderLocation,setActiveRudderLocation] = useState(carModule.rudderLocation);
  const [typeOfEngines,setTypeOfEngines] = useState([]);
  const [activeEngine,setActiveEngine] = useState(carModule.engine);
  const [activeNumberOfSeat,setActiveNumberOfSeat] = useState(carModule.numberOfSeats);
  const [typeOfColor,setTypeOfColor] = useState([]);
  const [activeColor,setActiveColor] = useState(carModule.color);
  const [obem,setObem] = useState(carModule.engineVolume)
  const [year,setYear] = useState(carModule.productionYear)
  const [driveUnitOptions,setDriveUnitOptions] = useState([]);
  const [activeDriveUnit,setActiveDriveUnit] = useState(carModule.driveUnit);
  const [years,setYears] = useState<number[]>([])
  const [description,setDescription] = useState(carModule.description);
  useEffect(() => {
    getCarBodyOptions().then(res=> {
      setTypeOfKuzov(res.data);
    });
    getTransmissionOptions().then(res=> {
      setTypeOfTransmission(res.data);
    });
    getRudderLocationOptions().then(res=> {
      setRudderLocations(res.data);
    });
    getEngineOptions().then(res=> {
      setTypeOfEngines(res.data);
    })
    getColorOptions().then(res=> {
      setTypeOfColor(res.data);
    })
    getDriveUnitOptions().then(res=> {
      setDriveUnitOptions(res.data)
    })

    for(let i=new Date().getFullYear();i>=1980;i--) {
       years.push(i)
      setYears(years)
    }
  },[])

  const changeKuzov = (name:string) => {
    carModule.carBody = name;
    setActiveKuzov(name);
    !editPage && saveCarToLocalStorage(carModule,step);
  }

  const changeTransmission = (name:string) => {
    carModule.transmission = name;
    setActiveTransmission(name);
    !editPage && saveCarToLocalStorage(carModule,step);
  }

  const changeDescription = (e:React.FormEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    setDescription(value)
    carModule.description = value;
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeRudderLocation = (name:string) => {
    carModule.rudderLocation = name;
    setActiveRudderLocation(name);
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeTypeOfEngine = (name:string) => {
    carModule.engine = name;
    setActiveEngine(name);
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeNumberOfSeat = (e:React.FormEvent<HTMLSelectElement>) => {
    let value = parseInt(e.currentTarget.value);
    carModule.numberOfSeats = value;
    setActiveNumberOfSeat(value);
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeYear = (e:React.FormEvent<HTMLSelectElement>) => {
    let value = parseInt(e.currentTarget.value);
    carModule.productionYear = value;
    setYear(value)
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeColor = (name:string) => {
    carModule.color = name;
    setActiveColor(name);
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeDriveUnit = (name:string) => {
    carModule.driveUnit = name;
    setActiveDriveUnit(name);
    !editPage && saveCarToLocalStorage(carModule,step);  }

  const changeVolume = (e:React.FormEvent<HTMLInputElement>) => {
    let firstValue = e.currentTarget.value;
    if(firstValue.length < 3 && firstValue.length == 2) {
      firstValue = firstValue.charAt(0) + "." + firstValue.charAt(1)
    }
    if(firstValue.length<4) {
      let value = parseFloat(firstValue)
      if(!isNaN(value) && value<9.01) {
        setObem(value)
        carModule.engineVolume = value;
      } else {
        if(e.currentTarget.value == "") {
          setObem("")
          carModule.engineVolume = ""
        }
      }
    }
  }

  return (
      <>
        <div>
          <h2 className="text-xl font-semibold">Параметры машин </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* Кузов */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Кузов
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeOfKuzov.map(t=> (
                  <RadioButton active={activeKuzov} onChange={changeKuzov} name={t} label={t} defaultChecked />
              ))}

            </div>
          </div>

          {/* Коробка передач */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Коробка передач
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeOfTransmission.map(t=> (
                  <RadioButton active={activeTransmission} onChange={changeTransmission} name={t} label={t} defaultChecked />
              ))}

            </div>
          </div>
          {/* Расположение руля машины */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Расположение руля машины
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rudderLocations.map(t=> (
                  <RadioButton active={activeRudderLocation} onChange={changeRudderLocation} name={t} label={t} defaultChecked />
              ))}

            </div>
          </div>
          {/* Двигатель машины */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Двигатель машины
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeOfEngines.map(t=> (
                  <RadioButton active={activeEngine} onChange={changeTypeOfEngine} name={t} label={t} defaultChecked />
              ))}

            </div>
          </div>
          {/* Привод */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Привод
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {driveUnitOptions.map(t=> (
                  <RadioButton active={activeDriveUnit} onChange={changeDriveUnit} name={t} label={t} defaultChecked />
              ))}
            </div>
          </div>
          {/* Количество мест */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Количество мест
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Select value={activeNumberOfSeat} onChange={(e)=>changeNumberOfSeat(e)}>
                  {numberOfSeats.map(n=>(
                      <option value={n.value}>{n.name}</option>
                  ))}
                </Select>
            </div>
          </div>
          {/* Двигатель машины */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Цвет машины
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeOfColor.map(t=> (
                  <RadioButton active={activeColor} onChange={changeColor} name={t} label={t} defaultChecked />
              ))}

            </div>
          </div>
          {/* Объем двигателя, л. */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Объем двигателя, л.
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl"
                  value={obem} type={"text"}  onChange={e=>changeVolume(e)}/>
            </div>
          </div>
          {/* Год выпуска */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Год выпуска
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Select value={year} onChange={(e)=>changeYear(e)}>
                <option value={""}>Год выпуска</option>
                {years.map(y=> (
                    <option value={y}>{y}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Дополнительно */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Дополнительно
            </label>
            <div >
              <Textarea className={"w-full"} placeholder={"Расскажите об автомобиле"} value={description} onChange={(e)=>changeDescription(e)} />
            </div>
          </div>


          {/* ITEM */}
        </div>
      </>
  );
};

export default PageAddListing4;
