import React, {FC, useState} from "react";
import twFocusClass from "utils/twFocusClass";
import ReactPaginate from "react-paginate";
import {useHistory} from "react-router-dom";
import {CarSearchParams} from "../../data/types";
import {getCarPost} from "../../axios/lib/rent/carModule";
import {carSearchParamConvert} from "../../utils/carSearchParamConvert";
import {
    withQueryParams,
    StringParam,
    NumberParam,
    useQueryParams,
    DecodedValueMap,
    SetQuery,
    ArrayParam
} from 'use-query-params';
import {QueryParamConfigMap} from "serialize-query-params";
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
    models:ArrayParam
}

export interface PaginationProps {
  className?: string;
  totalPages:number;
  handlePageLinkClick:Function;
  currentPage:number;
    query: DecodedValueMap<typeof queryConfig>;
    setQuery: SetQuery<typeof queryConfig>;
}

const Pagination: FC<PaginationProps> = ({
                                           className = "",
                                           totalPages=0,
                                           handlePageLinkClick,
                                           currentPage,
    query,
    setQuery
                                         }) => {
  const [page,setPage] = useState(query.page || 0);
  const history = useHistory();
  const handlePageChange = (selected:number) =>{
    setQuery({page: selected})
    // handlePageLinkClick(carSearchParams);
  }
  return (
    <nav
      className={``}
    >
      <ReactPaginate
          onPageChange={(selectedItem => {handlePageChange(selectedItem.selected)})}
          forcePage={page}
          breakLabel="..."
          containerClassName={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
          activeClassName={`bg-primary-6000 ${twFocusClass()}`}
          pageLinkClassName={" w-8 h-8  rounded-full bg-dark-800 text-white flex justify-center inline-flex align-center items-center justify-center"}
          pageRangeDisplayed={2}
          nextClassName={"pr-5"}
          previousClassName={"pl-5"}
          pageCount={totalPages}
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
      />
    </nav>
  );
};

export default withQueryParams(queryConfig,Pagination);
