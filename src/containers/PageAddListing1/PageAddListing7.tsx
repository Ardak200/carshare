import React, {FC, useEffect, useState} from "react";
import {CarModule, CityType, FileImageType, ProfilePhoneNumber, RegionType} from "../../data/types";
import {getRegions} from "../../axios/lib/rent/references";
import Select from "../../shared/Select/Select";
import InputMask from 'react-input-mask';
import FileDropZone from "../../shared/FileUploader/FileDropZone";
import StayCard from "../../components/StayCard/StayCard";
import StayCarCard from "../../components/StayCard/StayCarCard";
import {getUserPhones, postPhoneNumber} from "../../axios/lib/rent/userProfile";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import {codePhone} from "../../utils/otherDefaultValues.";
import {errorMessage, successMessage} from "../../utils/toastMessage";
import CurrentImages from "../../shared/FileUploader/CurrentImages";

export interface PageAddListing7Props {
  files:any[],
  setFile:Function,
  carModule:CarModule,
  editPage:boolean
}

const PageAddListing7: FC<PageAddListing7Props> = ({
                                                       files = [],
                                                       setFile,
                                                       carModule,editPage}) => {
    const {user} = useAuth();
    const [priceByDay,setPriceByDay] = useState<number|"">(carModule.priceByDay);
    const [priceByHour,setPriceByHour] = useState<number|"">(carModule.priceByHour);
    const [region,setRegion] = useState(carModule.region);
    const [city,setCity] = useState(carModule.city)
    const [regions,setRegions] = useState<RegionType[]>([])
    const [cities,setCities] = useState<CityType[]>();
    const [phoneNumber,setPhoneNumber] = useState<string[]>(carModule.phoneNumbers || [])
    const [codeIsSend,setCodeIsSend] = useState<ProfilePhoneNumber>(codePhone);
    const [phoneNumberCheck,setPhoneNumberCheck] = useState<boolean>(false);
    useEffect(() => {
        getAllRegions();
        getUserPhoneNumbers();
    },[])

    const getAllRegions = () => {
        getRegions().then(res=> {
            setRegions(res.data)
            let cityVal = res.data?.find((d:any)=>d.id === carModule.region)?.cities;
            setCities(cityVal)
        })
    }

    const getUserPhoneNumbers = () => {
        getUserPhones().then(res=> {
            setPhoneNumber(res.data);
            carModule.phoneNumbers = res.data;
            setPhoneNumberCheck(res.data.length > 0)
        })
    }

    const changePriceByDay = (e:React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.currentTarget.value);
        setPriceByDay(val)
        carModule.priceByDay = val;
        if(val<0) {
            setPriceByDay(0)
            carModule.priceByDay = 0;
        }
    }

    const changePriceByHour = (e:React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.currentTarget.value);
        setPriceByHour(val)
        carModule.priceByHour = val;
        if(val<0) {
            setPriceByHour(0)
            carModule.priceByHour = 0;
        }
    }

    const changeRegion = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.currentTarget.value)
        setCity("");
        let cityVal = regions?.find(r=>r.id === e.currentTarget.value)?.cities;
        setCities(cityVal)
        carModule.region = e.currentTarget.value;
    }

    const changeCity = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setCity(e.currentTarget.value)
        carModule.city = e.currentTarget.value;
    }

    const changePhoneNumber = (e:React.ChangeEvent<HTMLInputElement>,index:number) => {
        let items = [...phoneNumber];
        let item = items[index];
        item = e.currentTarget.value;
        item = item.replace("(","").replace(")","").replace(/\s/g, '');
        items[index] = item;
        setPhoneNumber(items)
    }

    const changeCode = (e:React.ChangeEvent<HTMLInputElement>) => {
        let codeValue = e.currentTarget.value;
        console.log(codeValue)
        let codeIsSendVal = {userId:codeIsSend.userId,phoneNumber:codeIsSend.phoneNumber,code:codeValue};
        console.log(codeIsSendVal)
        setCodeIsSend(codeIsSendVal)
        if(codeValue.length === 4) {
            postPhoneNumber(codeIsSendVal).then(res=> {
                successMessage("Добавлен телефон номер")
                setPhoneNumberCheck(true);
                setCodeIsSend(codePhone)
                carModule.phoneNumbers = phoneNumber;
            }).catch(err=> {
                if(err.response) {
                    errorMessage("Код не прошел валидацию!")
                }
            });
        }
    }

    const addPhone = () => {
        let items = [...phoneNumber];
        if(items.length!=2) {
            items.push("");
            setPhoneNumber(items);
        }
    }

    const sendCodeToPhone = (phone:string) => {
        setCodeIsSend({
            phoneNumber:phone,
            code:"",
            userId:user.id || "",
        })
    }

    const addPhoneWithCode = () => {

    }

        return (
      <>
        <div>
          <h2 className="text-2xl font-semibold">Фотографии</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Объявление с фотографиями получает в 5 раз больше откликов
          </span>
        </div>
        {/* FORM */}

          <FileDropZone files={files} setFiles={setFile} carModule={carModule}  />
          {carModule.images?.length && carModule.images.length>0 &&
              <CurrentImages carModule={carModule}/>}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 gap-3">
              <div>
                  <label className="text-lg font-semibold" htmlFor="">
                      Цена, за час
                  </label>
                  <div className="">
                      <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl"
                             value={priceByHour} type={"number"} onChange={e=>changePriceByHour(e)}/>
                  </div>
              </div>
              <div className="mb-2">
                  <label className="text-lg font-semibold" htmlFor="">
                      Цена, за день
                  </label>
                  <div className="">
                      <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl"
                             value={priceByDay} type={"number"} onChange={e=>changePriceByDay(e)}/>
                  </div>
              </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 gap-3">
              <div>
                  <label className="text-lg font-semibold" htmlFor="">
                      Регион
                  </label>
                  <Select value={region} onChange={(e)=>changeRegion(e)}>
                      <option value=""></option>
                      {regions?.map(n=>(
                          <option value={n.id}>{n.name}</option>
                      ))}
                  </Select>
              </div>
              <div className="mb-2">
                  <label className="text-lg font-semibold" htmlFor="">
                      Город/Село
                  </label>
                  <Select value={city} onChange={(e)=>changeCity(e)}>
                      <option value=""></option>
                      {cities?.map(n=>(
                          <option value={n.id}>{n.name}</option>
                      ))}
                  </Select>
              </div>
              <div className="mb-2 flex flex-col">
                  <label className="text-lg font-semibold" htmlFor="">
                      Телефон номер
                  </label>
                  {phoneNumber.map((p,index)=>(
                      <> <InputMask mask="+7(999) 999 99 99"
                                    maskChar={""}
                                    disabled={phoneNumberCheck || codeIsSend != codePhone}
                                    value={p}
                                    onChange={e=>changePhoneNumber(e,index)}
                                    className={" p-2 mb-2 border-2 border-slate-600 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl"}
                      />
                          {codeIsSend != codePhone && <>
                              <label className="text-lg font-semibold" htmlFor="">
                                Введите код
                              </label>
                              <InputMask mask="9999"
                                                            maskChar={""}
                                                            value={codeIsSend.code}
                                                            onChange={e=>changeCode(e)}
                                                            className={" p-2 mb-2 border-2 border-slate-600 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl"}
                              /></>}
                          {phoneNumber.length == 1 && p.length == 12 && !phoneNumberCheck && codeIsSend == codePhone && <span className={"p-2 cursor-pointer"} onClick={()=>sendCodeToPhone(p)}>Получить код</span>}
                      </>

                  ))}
                  {phoneNumber.length == 0 &&
                      <span className={"p-2 cursor-pointer"} onClick={addPhone}>Добавить телефон</span>}
              </div>

              <div className="max-w-xs">
                  {/*<label className="text-lg font-semibold" htmlFor="">*/}
                  {/*    Предосмотр*/}
                  {/*</label>*/}
                  {/*<StayCarCard data={carModule}/>*/}
              </div>
          </div>
      </>
  );
};

export default PageAddListing7;
