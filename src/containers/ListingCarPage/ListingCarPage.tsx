import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import {CarModule, CarSearchParams, CityType, RegionType} from "data/types";
import React, {FC, useEffect, useState} from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import heroRightImage from "images/hero-right-car.png";
import {SortParameter} from "data/types";
import {DateRage, TimeRage} from "../../components/HeroSearchForm/RentalCarSearchForm";
import {getCarPost} from "../../axios/lib/rent/carModule";
import useQuery from "../../hooks/useQuery";
import {carSearchParamConvert, validParam} from "../../utils/carSearchParamConvert";
import {useHistory} from "react-router-dom";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault, encodeQueryParams, DecodedValueMap, SetQuery, withQueryParams, searchStringToObject, decodeQueryParams,
} from 'use-query-params';
export interface ListingCarPageProps {
  className?: string;
  query: DecodedValueMap<typeof queryConfig>;
  setQuery: SetQuery<typeof queryConfig>;
}

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

const ListingCarPage: FC<ListingCarPageProps> = ({ className = "",   query,
                                                   setQuery }) => {
  const history = useHistory();
  const [data,setData] = useState<CarModule[]|[]>([])
  const [totalElements,setTotalElements] = useState<number>();
  const [totalPages,setTotalPages] = useState<number>()
  const [currentPage,setCurrentPage] = useState(query.page || 0);
  const [sortParameter,setSortParameter] = useState<string>(validParam(query.parameter));
  const [location,setLocation] = useState<RegionType|CityType>(typeof localStorage.location != "undefined" ? JSON.parse(localStorage.location || "") : "");
  const [loading,setLoading] = useState(false);

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });

  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "00:00",
    endTime: "00:00",
  });

  useEffect(() => {
    console.log("++++++++++++++++++++++++")
    console.log(typeof localStorage.location)
      setQuery({location: location?.id})
  },[])

  useEffect(() => {
    getCarPostByFilter()
  },[query])

  const getCarPostByFilter = () => {
    setLoading(true);
    getCarPost(encodeQueryParams(queryConfig,query)).then(res=> {
      setData(res.data.content)
      setTotalElements(res.data.totalElements);
      setTotalPages(res.data.totalPages)
      setLoading(false)
    }).catch(e=> {
      setLoading(false)
    })
  }

  return (
    <div
      className={`nc-ListingCarPage relative overflow-hidden ${className}`}
      data-nc-id="ListingCarPage"
    >
      <Helmet>
        <title>CarShare || Машины</title>
      </Helmet>
      <BgGlassmorphism />
      <div className="container relative">
        <SectionHeroArchivePage
          rightImage={heroRightImage}
          currentPage="Машины"
          currentTab="Машины"
          location={location}
          setLocation={setLocation}
          timeRangeValue={timeRangeValue}
          dateRangeValue={dateRangeValue}
          listingType={
            <>
              <i className="text-2xl las la-car"></i>
              <span className="ml-2.5">{totalElements} {totalElements && totalElements>1 ? "автомобилей":"автомобиль"}  </span>
            </>
          }
          className="pt-10 pb-5 lg:pb-8 lg:pt-16 "
        />
        <SectionGridFilterCard
            loading={loading}
            totalPages={totalPages}
            location={location}
            data={data}
            setData={setData}
            sortType={sortParameter}
            setSortType={setSortParameter}
            getCarPostByFilter = {getCarPostByFilter}
            className="pb-24 lg:pb-32"
            currentPage={currentPage}
        />

      </div>
    </div>
  );
};

export default withQueryParams(queryConfig,ListingCarPage) ;
