import React, {FC, useEffect, useState} from "react";
import {CityType, RegionType} from "../../data/types";
import OutsideClickHandler from "react-outside-click-handler";
import {getRegions} from "../../axios/lib/rent/references";
import {allKzRegion} from "../../utils/otherDefaultValues.";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {ArrayParam, DecodedValueMap, NumberParam, SetQuery, StringParam, withQueryParams} from "use-query-params";

interface CityAndRegionType {
    show:boolean,
    setShow:Function,
    setLocation:Function,
    location?:CityType|RegionType,
    setQuery: SetQuery<typeof queryConfig>;
    query: DecodedValueMap<typeof queryConfig>;
}
const queryConfig = {
    page:NumberParam,
    location:StringParam,
}
const CityAndRegion: FC<CityAndRegionType> = ({
    show,
    setShow,
    setLocation,
    location,
    setQuery,query
                                              })=> {
    var noScroll = require('no-scroll');

    const [value,setValue] = useState<CityType|RegionType>()
    const [regions,setRegions] = useState<RegionType[]>([]);
    const [cities,setCities] = useState<CityType[] | []>([]);
    const [list,setList] = useState<RegionType[] | CityType[]>([])
    const [region,setRegion] = useState<RegionType>();
    const [city,setCity] = useState<CityType>();
    const [activeTab,setActiveTab] = useState<"region" | "city">("region")
    useEffect(() => {
        if (show) {
            noScroll.on();
        }
    }, [show])

    useEffect(() => {
        getRegions().then(res=> {
            setRegions([...allKzRegion,...res.data])
            setList([...allKzRegion,...res.data])
        })
    },[])

    const selectRegion = (r:RegionType) => {
        if(r.id && r.cities) {
            setCities(r.cities);
            setActiveTab("city")
        }
        setRegion(r);
    }

    const selectCity = (c:CityType) => {
        setCity(c);
    }

    const selectAllRegion = () => {
        setActiveTab("region")
        setRegion(allKzRegion[0]);
        setCity(undefined);
    }

    const closeModal= () => {
        setShow(false)
        noScroll.off();
        if(city || region) {
            localStorage.location = JSON.stringify(city || region);
            setLocation(city || region)
            setQuery({location: city ? city.id : region?.id, page:null})
        }
    }
    return (
        <>
        <div
            className="px-0 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto ">
                {/*content*/}
                <OutsideClickHandler
                    onOutsideClick={() => closeModal()}>
                    <div className=" dark:bg-neutral-800 border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none md:min-w-[600px] min-w-screen-sm ">
                        <div className="relative p-6 flex-auto">
                            <span onClick={closeModal} className="absolute right-2 p-2 top-1 cursor-pointer font-bold">X</span>
                            <h5 className="text-xl font-semibold mb-2">
                                Регионы или города
                            </h5>
                            <Input placeholder={"Введите город или регион"}/>
                            {activeTab == "city" && <div className="p-2">
                                <span className="cursor-pointer p-1 mr-2" onClick={() => selectAllRegion()}>{"Все регионы >"}</span>
                                <span className="cursor-pointer p-1 bg-opacity-30 bg-indigo-100 rounded-2xl">{region?.name}</span>
                            </div>}
                            <div className={"p-2 mt-1 h-96 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thumb-rounded"}>
                                {/*regions*/}<ul className={` ${activeTab == "city" && "hidden" }`}>
                                    {regions.map(r=> (
                                        <li onClick={()=>selectRegion(r)} className={`${r == region && "bg-opacity-30 bg-blue-500"} p-2 cursor-pointer`}>{r.name || "Весь Казахстан"}</li>
                                    ))}
                                    </ul>
                                    <ul className={`${activeTab == "region" && "hidden" } pl-2`} >
                                        <li className={`${!city && "bg-opacity-30 bg-blue-500 p-2"} `} onClick={() => setCity(undefined)}>{`Весь ${region?.name}`}</li>
                                        {cities.map(r=> (
                                            <li onClick={() => selectCity(r)} className={`${r == city && "bg-opacity-30 bg-blue-500"} p-2 cursor-pointer `} >{r.name || "Весь Казахстан"}</li>
                                        ))}
                                    </ul>

                            </div>
                            <div className="mt-1">
                                <ButtonPrimary type={"button"} onClick={closeModal} className="la-pull-right ">Выбрать</ButtonPrimary>
                            </div>

                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default withQueryParams(queryConfig,CityAndRegion);