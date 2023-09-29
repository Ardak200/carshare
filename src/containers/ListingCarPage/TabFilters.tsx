import React, {ChangeEvent, FC, Fragment, useEffect, useRef, useState} from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import convertNumbThousand from "utils/convertNumbThousand";
import { Range } from "rc-slider";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import {getCarModels, getTransmissionOptions} from "../../axios/lib/rent/references";
import {CarSearchParams, IdNameProp} from "../../data/types";
import Input from "shared/Input/Input";

import {
  ArrayParam,
  DecodedValueMap,
  encodeQueryParams,
  NumberParam,
  SetQuery,
  StringParam, withDefault,
  withQueryParams
} from "use-query-params";
import {defaultIdName} from "../../utils/otherDefaultValues.";
import {returnIdMarkaByName, returnNameById} from "../../utils/carSearchParamConvert";
import useQuery from "../../hooks/useQuery";
import {useOnClickOutside} from "usehooks-ts";

const typeOfColor = [
  { id:1,name: "Черный"},
  { id:2,name: "Синий"},
  { id:3,name: "Красный"},
  { id:4,name: "Золотистый"},
  { id:5,name: "Белый"},
  { id:6,name: "Серебристый"}
];

const typeOfDvigatel = [
  { id:1,name: "Бензин"},
  { id:2,name: "Газ"},
  { id:3,name: "Гибрид"},
  { id:4,name: "Электричество"},
  { id:5,name: "Газ-бензин"},
  { id:6,name: "Дизель"}
];

const typeOfPrivod = [
  { name: "Передний" },
  { name: "Полный " },
  { name: "Задний " },
];
//
const typeOfDirection = [{ name: "Справа" }, { name: "Слева" }];

export const queryConfig = {
  page:NumberParam,
  parameter:StringParam,
  direction:StringParam,
  transmission:ArrayParam,
  engineVolume:ArrayParam,
  numberOfSeats:ArrayParam,
  yearTo:NumberParam,
  yearFrom:NumberParam,
  carBody:ArrayParam,
  engine:ArrayParam,
  rudderLocation:ArrayParam,
  location:StringParam,
  driveUnit:ArrayParam,
  color:ArrayParam,
  carModels:ArrayParam,
  models:ArrayParam,
  priceFrom:StringParam,
  priceTo:StringParam
}
interface TabFiltersProp {
  query: DecodedValueMap<typeof queryConfig>;
  setQuery: SetQuery<typeof queryConfig>;
}
const TabFilters:FC<TabFiltersProp> = ({
      query,
    setQuery
                                       }) => {
  const refCarModels = useRef(null);
  const objectsParam = encodeQueryParams(queryConfig,query)
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);

  const [rangePriceFrom, setRangePriceFrom] = useState(query.priceFrom || "");
  const [rangePriceTo, setRangePriceTo] = useState(query.priceTo || "");
  const [rangeYear, setRangeYear] = useState<[number|"",number|""]>(["",""]);
  const [isOnSale, setIsOnSale] = useState(true);
  const [typeOfCar,setTypeOfCar] = useState<IdNameProp[]>([defaultIdName]);
  const [carModel,setCarModel] = useState<string[]>(  []);
  const [korobka,setKorobka] = useState<string[]>( []);
  const [color,setColor] = useState<(string)[]>((typeof objectsParam.color == "undefined" || objectsParam.color != null) ? []
      : objectsParam.color || []);
  const [direction,setDirection] = useState<(string)[]>((typeof objectsParam.direction == "undefined" || objectsParam.direction != null) ? []
      : objectsParam.direction || []);
  const [placeQuantity,setPlaceQuantity] = useState("");
  const [kuzov,setKuzov] = useState("");
  const [dvigatel,setDvigatel] = useState("");
  const [privod, setPrivod] = useState<(string)[]>((typeof objectsParam.driveUnit == "undefined" || objectsParam.driveUnit != null) ? []
      : objectsParam.driveUnit || []);
  const [engineOption,setEngineOption] = useState<(string)[]>((typeof objectsParam.engine == "undefined" || objectsParam.engine != null) ? []
      : objectsParam.engine || []);
  const [sideDrive,setSideDrive] = useState("");

  const onBlurTypeOfCars = () => {
    setQuery({carModels: [returnIdMarkaByName(carModel[0],typeOfCar) || ""]})
  }

  useOnClickOutside(refCarModels,onBlurTypeOfCars);

  // Lists
  const [typeOfKorobka,setTypeOfKorobka] = useState([]);
  const queryParam = useQuery();
  useEffect(() => {
    getTransmissionOptions().then(res=> {
      setTypeOfKorobka(res.data)
    })

    getCarModels().then(res=> {
      setTypeOfCar(res.data)
      var name = returnNameById(queryParam.get("carModels") || "",res.data);
      if(typeof queryParam.get("carModels") == "string" && name != "") {
        setCarModel([name || ""] )
      }
    })
  },[])
  //
  const closeModalMoreFilter = () => {
    setQuery({color: color, rudderLocation: direction,engine: engineOption,driveUnit: privod})
    setisOpenMoreFilter(false);
  }
  const clearModalMoreFilter=()=> {
    setQuery({color: undefined, rudderLocation: undefined,engine: undefined,driveUnit: undefined})
    setColor([])
    setDirection([])
    setEngineOption([])
    setPrivod([])
    setisOpenMoreFilter(false);
  }
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);
  const renderXClear = (onClickEvent?:Function) => {
    return (
      <span onClick={() => onClickEvent} className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer z-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTypeOfKorobka = () => {
    const korobkaModelAdd = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      if(!e.currentTarget.checked) {
        setKorobka(korobka.filter(c=>c!= e.currentTarget.name))
      } else {
        setKorobka([...korobka,e.currentTarget.name])
      }
    }
    return (
      <Popover className="relative z-[1]">
        {({ open, close }) => {
          return (
              <>
                <Popover.Button
                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                        open ? "!border-primary-500 " : ""
                    }`}
                >
                  <span> {`Коробка передач ${korobka.length!=0 ?  "("+korobka.length+")" : ""}`}</span>
                  {korobka.length != 0 ? renderXClear() :
                      <i className="las la-angle-down ml-2"></i>
                  }
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute  w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                    <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                      <div className="relative flex flex-col px-5 py-6 space-y-5">
                        <SearchFilter list={typeOfKorobka} active={korobka} onChange={(e:React.ChangeEvent<HTMLInputElement>) => korobkaModelAdd(e)} withoutName={true} />
                      </div>
                      <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                        <ButtonThird onClick={() => {
                          close();
                          setKorobka([]);
                        }} sizeClass="px-4 py-2 sm:px-5">
                          Очистить
                        </ButtonThird>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
          )}
        }
      </Popover>
    );
  };



  const renderTabsTypeOfCars = () => {
    const carModelAdd = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      if(!e.currentTarget.checked) {
        setCarModel(carModel.filter(c=>c!= e.currentTarget.name))
      } else {
        setCarModel([e.currentTarget.name])
      }
    }

    return (
        <Popover className="relative z-[1]">
          {({ open, close }) => {
            return (
                <>
                  <Popover.Button
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                          open ? "!border-primary-500 " : ""
                      }`}
                  >
                    {carModel.length > 0 && <span>{`${carModel[0]}`}</span>}
                    {carModel.length == 0 && <span>{`Марка машины`}</span>}
                    {
                        <i className="las la-angle-down ml-2"></i>
                    }


                  </Popover.Button>
                  <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute  w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                      <div ref={refCarModels} className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                        <div className="relative flex flex-col px-5 py-6 space-y-5">
                          <SearchFilter list={typeOfCar} active={carModel} onChange={(e:React.ChangeEvent<HTMLInputElement>) => carModelAdd(e)} withoutName={false} />
                        </div>
                        <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                          <ButtonThird onClick={() => {
                            close()
                            setQuery({carModels: undefined})
                            setCarModel([])
                          }} sizeClass="px-4 py-2 sm:px-5">
                            Очистить
                          </ButtonThird>
                          <ButtonPrimary onClick={() => {
                            close()
                            onBlurTypeOfCars()
                          }} sizeClass="px-4 py-2 sm:px-5">
                            Применить
                          </ButtonPrimary>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
            )}
          }
        </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover  className="relative z-[1]" onBlur={() =>setQuery({priceFrom: rangePriceFrom, priceTo: rangePriceTo})}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span> Цена за день:
                {rangePriceFrom && ` от ${convertNumbThousand(parseInt(rangePriceFrom))} тг`}
                {rangePriceTo && ` до ${convertNumbThousand(parseInt(rangePriceTo))} тг`}
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel onClickCapture={() => console.log("closed")} onMouseLeave={() => console.log("move")} onCompositionEnd={() => console.log("closed")} className="absolute w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Цена за день</span>
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Цена от
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              тг
                            </span>
                          </div>
                          <input
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            onChange={(e) => setRangePriceFrom(e.currentTarget.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePriceFrom}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Цена до
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              тг
                            </span>
                          </div>
                          <input
                            type="text"
                            name="maxPrice"
                            id="maxPrice"
                            onChange={(e) => setRangePriceTo(e.currentTarget.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePriceTo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Очистить
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Применить
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const RenderTabsYear = () => {
    const ref = useRef(null)
    const changeYearQuery = () => {
      setQuery({
        yearFrom: typeof rangeYear[0] == "number" ? rangeYear[0] : undefined,
        yearTo: typeof rangeYear[1] == "number" ? rangeYear[1] : undefined})
    }

    const clearFilter = () => {
      setRangeYear(["",""])
      setQuery({
        yearFrom:  undefined,
        yearTo: undefined})
    }

    useOnClickOutside(ref,changeYearQuery)

    return (
        <Popover  className="relative z-[1]">
          {({ open, close }) => (
              <>
                <Popover.Button
                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
                >
              <span> Год:
                { ` от ${rangeYear[0]} г. -`}
                { ` до ${rangeYear[1]} г.`}
              </span>
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel  className="absolute w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                    <div ref={ref} className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                      <div className="relative flex flex-col px-5 py-6 space-y-8">
                        <div className="space-y-5">
                          <span className="font-medium">Год от и до</span>
                        </div>

                        <div className="flex justify-between space-x-5">
                          <div>
                            <label
                                htmlFor="minPrice"
                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                            >
                              Год от
                            </label>
                            <div className="mt-1 relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              г.
                            </span>
                              </div>
                              <input
                                  type="text"
                                  name="minPrice"
                                  id="minPrice"
                                  onChange={(e) => !isNaN(parseInt(e.target.value)) ?
                                      setRangeYear([parseInt(e.target.value),rangeYear[1]]) : setRangeYear(["",rangeYear[1]])}
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                  value={rangeYear[0]}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                                htmlFor="maxPrice"
                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                            >
                              Год до
                            </label>
                            <div className="mt-1 relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              г.
                            </span>
                              </div>
                              <input
                                  type="text"
                                  name="maxPrice"
                                  id="maxPrice"
                                  onChange={(e) => !isNaN(parseInt(e.target.value)) ?
                                      setRangeYear([rangeYear[0],parseInt(e.target.value)]) : setRangeYear([rangeYear[0],""])}
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                  value={rangeYear[1]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                        <ButtonThird onClick={()=> {
                          close();
                          clearFilter();
                        }} sizeClass="px-4 py-2 sm:px-5">
                          Очистить
                        </ButtonThird>
                        <ButtonPrimary
                            onClick={() => {
                              close();
                              changeYearQuery();
                            }}
                            sizeClass="px-4 py-2 sm:px-5"
                        >
                          Применить
                        </ButtonPrimary>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
          )}
        </Popover>
    );
  };

  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isOnSale
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>On sale</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  const renderTabsGuestsAndBags = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Guests & Bags</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <NcInputNumber label="Passengers" max={40} />
                    <NcInputNumber label="Bags" max={40} />
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Очистить
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Применить
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[],
    active:string[],
    onChange:Function
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              active={active}
              onChange={onChange}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              active={active}
              onChange={onChange}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // Morefilter for mobile mode
  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>
            <span className="hidden sm:inline">Car</span> filters (3)
          </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilterMobile}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 h-screen w-full"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Experiences filters
                    </Dialog.Title>
                    <span className="absolute right-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Type of car</h3>
                        <div className="mt-6 relative ">
                          {/*{renderMoreFilterItem(typeOfCar)}*/}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Car specifications
                        </h3>
                        <div className="mt-6 relative ">
                          {/*{renderMoreFilterItem(carSpecifications)}*/}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <span className="font-medium">Год выпуска</span>

                              <Range
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangeYear[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangeYear[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Passengers & Bags
                        </h3>
                        <div className="mt-6 relative flex-col px-5 py-6 space-y-5">
                          <NcInputNumber label="Passengers" max={40} />
                          <NcInputNumber label="Bags" max={40} />
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Расположение руля</h3>
                        <div className="mt-6 relative ">
                          {/*{renderMoreFilterItem(typeOfDirection,direction,setDirection)}*/}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Привод</h3>
                        <div className="mt-6 relative ">
                          {/*{renderMoreFilterItem(typeOfPrivod,privod)}*/}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Insurance</h3>
                        <div className="mt-6 relative ">
                          {/*{renderMoreFilterItem(insurance)}*/}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Очистить
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Применить
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderTabMoreFilter = () => {
    const addMoreFilterColor = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      setColor([e.currentTarget.name])
    }
    const addMoreFilterDirection = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      setDirection([e.currentTarget.name])
    }
    const addMorePrivod = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      setPrivod([e.currentTarget.name])
    }
    const addMoreEngine = (e:React.ChangeEvent<HTMLInputElement>) =>  {
      setEngineOption([e.currentTarget.name])
    }
    return (
        <div>
          <div
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
              onClick={openModalMoreFilter}
          >
            <span>Расширенный поиск </span>
          </div>

          <Transition appear show={isOpenMoreFilter} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={closeModalMoreFilter}
            >
              <div className="min-h-screen text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                &#8203;
              </span>
                <Transition.Child
                    className="inline-block py-8 h-screen w-full"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                    <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </div>

                    <div className="flex-grow overflow-y-auto">
                      <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                        {/*<div className="py-7">*/}
                        {/*  <h3 className="text-xl font-medium">*/}
                        {/*    Количество мест*/}
                        {/*  </h3>*/}
                        {/*  <div className="mt-6 relative ">*/}
                        {/*    /!*{renderMoreFilterItem(typeOfplaceQuantity)}*!/*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div className="py-7">
                          <h3 className="text-xl font-medium">
                            Цвет
                          </h3>
                          <div className="mt-6 relative ">
                            {renderMoreFilterItem(typeOfColor,color,addMoreFilterColor)}
                          </div>
                        </div>
                        <div className="py-7">
                          <h3 className="text-xl font-medium">Расположение руля</h3>
                          <div className="mt-6 relative ">
                            {renderMoreFilterItem(typeOfDirection,direction,addMoreFilterDirection)}
                          </div>
                        </div>
                        <div className="py-7">
                          <h3 className="text-xl font-medium">Двигатель</h3>
                          <div className="mt-6 relative ">
                            {renderMoreFilterItem(typeOfDvigatel,engineOption,addMoreEngine)}
                          </div>
                        </div>
                        <div className="py-7">
                          <h3 className="text-xl font-medium">Привод</h3>
                          <div className="mt-6 relative ">
                            {renderMoreFilterItem(typeOfPrivod,privod,addMorePrivod)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                      <ButtonThird
                          onClick={clearModalMoreFilter}
                          sizeClass="px-4 py-2 sm:px-5"
                      >
                        Очистить
                      </ButtonThird>
                      <ButtonPrimary
                          onClick={closeModalMoreFilter}
                          sizeClass="px-4 py-2 sm:px-5"
                      >
                        Применить
                      </ButtonPrimary>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfCars()}
        {/*{renderTabsTypeOfKorobka()}*/}
        {/*price*/}
        {renderTabsPriceRage()}
        {RenderTabsYear()}
        {renderTabMoreFilter()}
      </div>
      <div className="flex lg:hidden space-x-4">
        {renderTabMobileFilter()}
        {renderTabOnSale()}
      </div>
    </div>
  );
};

export default withQueryParams(queryConfig,TabFilters);
