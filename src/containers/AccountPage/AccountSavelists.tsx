import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import React, {Fragment, useEffect, useState} from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import {CarModule} from "../../data/types";
import {getAllMyCars} from "../../axios/lib/rent/carModule";
import CarCards from "../../components/CarCard/CarCards";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import {getCookie} from "typescript-cookie";
import {kcTokens} from "../../App";

const AccountSavelists = () => {
  let [categories] = useState(["Активные","Неактивные"]);
  const [cars,setCars] = useState<CarModule[]>();
  const [totalPages,setTotalPages] = useState(0);
  const [totalElements,setTotalElements] = useState(0)
  const [active,setActive] = useState(true);
  useEffect(() => {
    console.log(getCookie(kcTokens))
    getCars(true)
  },[getCookie(kcTokens)])


  const getCars = (isActive:boolean) => {
    getAllMyCars(isActive).then(res=> {
      setCars(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    })
  }
  const categoryChange = (item:string) => {
    if(item == "Активные") {
      getCars(true)
      setActive(true)
    }else {
      getCars(false)
      setActive(false)
    }
  }

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Мои объявление</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                        onClick={() => categoryChange(item)}
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {categories.map(c=> (
                  <Tab.Panel className="mt-8">
                    {cars && cars.length == 0 ?
                        <NoRecordFound /> :
                        <>
                          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {cars && cars.map((car) => (
                                <CarCards data={car} myCars={true} activePage={active} />
                            ))}
                          </div>
                          <div className="flex mt-11 justify-center items-center">
                            {totalPages > 1 &&
                                <ButtonSecondary>Больше записей</ButtonSecondary>}
                          </div>
                        </>}
                  </Tab.Panel>
              ))}

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
