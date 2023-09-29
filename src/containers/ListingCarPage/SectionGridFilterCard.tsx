import React, {FC, useState} from "react";
import sortParameter from "data/jsons/__sortParameter.json"
import {CarModule, CarSearchParams, CityType, RegionType, SortParameter} from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import CarCards from "../../components/CarCard/CarCards";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {Link, useHistory} from 'react-router-dom';
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import useQuery from "../../hooks/useQuery";
import {StringParam, useQueryParams} from "use-query-params";
import {validDirection} from "../../utils/carSearchParamConvert";
import {Menu} from "@headlessui/react";

export interface SectionGridFilterCardProps {
  className?: string;
  data: CarModule[];
  setData:Function;
  sortType:string;
  setSortType:Function;
  location?:CityType|RegionType;
  totalPages?:number;
  currentPage?:number;
  getCarPostByFilter:Function,
  loading:boolean
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
    className = "",
    data = [],
    sortType = "createdDate",
    setSortType,
    location,
    totalPages = 0,
    currentPage=0,
    getCarPostByFilter,
    loading
}) => {
    const [query,setQuery] = useQueryParams({
        direction:StringParam,
        parameter:StringParam,
        page:StringParam
    })

    const [filterValue,setFilterValue] = useState({

    })

    const setSortValue = (parameter:string,direction:string) => {
        setQuery({parameter: parameter,direction: direction,page:undefined})
        setSortType(parameter)
        setDirection(direction)
    }
    const [direction,setDirection] = useState(validDirection(query.direction))


    const history = useHistory();

    const header = () => {
        const parameters = sortParameter;
        const activeParameter = () => {
            return sortParameter.find(s=> s.parameter == sortType && s.direction == direction);
        }
        return (
            <div className="pb-6 flex justify-between items-center md:flex-row">
                <Menu as="div" className="relative">

                    Сортировать по:<Menu.Button className={"p-2 text-white-200 font-bold"}>{activeParameter()?.name}</Menu.Button>
                    <Menu.Items className="absolute mt-1 left-0 py-1 text-sm text-gray-700 dark:text-gray-200 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div className={"flex flex-col"}>
                            {parameters.map(p=> (
                                <>
                                    <Menu.Item>
                                        <span onClick={()=> setSortValue(p.parameter,p.direction)} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{p.name}</span>
                                    </Menu.Item>
                                </>
                            ))}

                        </div>

                    </Menu.Items>

                </Menu>
                <ButtonPrimary onClick={() => history.push("/add-listing-1")}>Подать объявление</ButtonPrimary>
            </div>
        )
    }
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
        {header()}
        {data.length>0 &&
            <>
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((car) => (
                        <CarCards key={car.id} data={car} loading={loading}/>
                    ))}
                </div>
                <div className="flex mt-16 justify-center items-center">
                    <Pagination totalPages={totalPages} handlePageLinkClick={getCarPostByFilter} currentPage={currentPage} />
                </div></>
        }
        {data.length == 0 && <NoRecordFound />}

    </div>
  );
};

export default SectionGridFilterCard;
