import React, {FC, ReactNode, useState} from "react";
import imagePng from "images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import {CarSearchParams, CityType, RegionType} from "../../data/types";
import {DateRage} from "../HeroSearchForm/StaySearchForm";
import {TimeRage} from "../HeroSearchForm/FlightSearchForm";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Машины" | "Flights";
  currentTab: SearchTab;
  rightImage?: string;
  location?:RegionType|CityType,
  setLocation:Function,
  dateRangeValue?:DateRage,
  timeRangeValue?:TimeRage,
  searchParams?:CarSearchParams
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
  location,
  setLocation,
  dateRangeValue,
  timeRangeValue,
    searchParams
}) => {

  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">{location?.name || "Весь Казахстан"} </span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          <HeroSearchForm currentPage={currentPage}
                          currentTab={currentTab}
                          location={location}
                          setLocation={setLocation}
                          carSearchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
