import React, {FC, Fragment, useEffect, useState} from "react";
import {OrderTypeProps} from "../../data/types";
import {convertDate, convertDateTime, convertFullDate} from "../../utils/convertDate";
import {Link} from "react-router-dom";
import {carCardDescription, orderStatusName} from "../../utils/carSearchParamConvert";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import {Dialog, Transition} from "@headlessui/react";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import {orderStatuses} from "../../utils/otherDefaultValues.";
import {editOrder} from "../../axios/lib/order/order";
import {successMessage} from "../../utils/toastMessage";

export interface OrderCardProps {
    className?: string;
    data: OrderTypeProps;
    ownCarRequest?:boolean
}

const OrderCarCard: FC<OrderCardProps> = ({ className = "", data,ownCarRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusOpen,setStatusOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const closeModal = () => {
        setStatusOpen(false)
        setOrderStatus("")
    }
    const [orderStatus,setOrderStatus] = useState<orderStatuses|"">("")
    const changeOrder = () => {
        setLoading(true)
        data.status=orderStatus || orderStatuses.RESERVED;
        editOrder(data).then(res=> {
            setLoading(false)
            setStatusOpen(false)
            setOrderStatus("")
            successMessage("Статус заявки обновлен на " + `"` + orderStatusName(orderStatus) + `"n`)
        }).catch(err=> {
            setLoading(false)
        })
    }
    useEffect(() => {
        setOrderStatus("")
    },[])
    const statusChange = () => {
        return (
            <div>
                <Transition appear show={isStatusOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl dark:bg-neutral-900 dark:border dark:border-neutral-700 transition-all dark:text-neutral-100">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-"
                                        >
                                            {"Поменять статус заявки"}
                                        </Dialog.Title>
                                        <span className="absolute right-3 top-3">
                                        <ButtonClose onClick={closeModal} />
                                    </span>
                                        <div className="mt-2">
                                            <ul>
                                                {(Object.keys(orderStatuses) as (keyof typeof orderStatuses)[]).map(
                                                    (key, index) => (
                                                        <li onClick={() => setOrderStatus(orderStatuses[key])}
                                                            className={`p-1 cursor-pointer dark:hover:bg-blue-300 ${orderStatuses[key] == orderStatus && "bg-opacity-80 bg-blue-500 "}`}
                                                        >
                                                            {orderStatusName(orderStatuses[key])}
                                                        </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between">
                                            <ButtonPrimary
                                                loading={loading}
                                                disabled={orderStatus == ""}
                                                onClick={() =>changeOrder()}
                                                sizeClass="px-4 py-2 sm:px-5"
                                            >
                                                Редактировать статус
                                                {/*{timer && `(${timer})`}*/}
                                            </ButtonPrimary>
                                            <ButtonSecondary
                                                onClick={closeModal}
                                                sizeClass="px-4 py-2 sm:px-5"
                                            >
                                                Закрыть
                                                {/*{timer && `(${timer})`}*/}
                                            </ButtonSecondary>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        )
    }
    const renderDetailTop = () => {
        return (
            <div>
                <div className="flex flex-col md:flex-row ">
                    <div className="w-150 md:w-120 lg:w-150 flex-shrink-0 md:pt-7">
                            <Link to={`/listing-car-detail/${data.car.id}`} target={"_blank"}>
                                {<img  src={data.car.images && data.car.images?.length &&  "http://192.168.1.2:8092" + data.car.images[0].link || ""} className="w-44 cursor-pointer rad" alt="" />}
                            </Link>
                    </div>
                    <div className="flex my-5 md:my-0">

                        <div className="ml-4 space-y-10 text-sm">
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  Цена за час
                </span>
                                <span className=" font-semibold">
                  {data.car.priceByHour || "0" + " тг"}
                </span>
                            </div>
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  Цена за день
                </span>
                                <span className=" font-semibold">
                  {data.car.priceByDay || "0" + " тг"}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
                    <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
                        <li className={"font-bold"}>Местоположения машины: </li>
                        <li>{(data.car.regionName || "Алматы обл.")} {(data.car.cityName || ", Алматы")}</li>
                        <li className={"font-bold"}>Параметры машин: </li>
                        <li>{carCardDescription(data.car)}</li>
                    </ul>


                </div>

            </div>
        );
    };

    const renderDetailTopAuthor = () => {
        return (
            <div>
                <div className="flex flex-col md:flex-row ">
                    <div className="flex my-5 md:my-0">

                        <div className="ml-4 space-y-10 text-sm">
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  Цена за час
                </span>
                                <span className=" font-semibold">
                  {data.car.priceByHour || "0" + " тг"}
                </span>
                            </div>
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  Цена за день
                </span>
                                <span className=" font-semibold">
                  {data.car.priceByDay || "0" + " тг"}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
                    <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
                        <li className={"font-bold"}>Местоположения машины: </li>
                        <li>{(data.car.regionName || "Алматы обл.")} {(data.car.cityName || ", Алматы")}</li>
                        <li className={"font-bold"}>Параметры машин: </li>
                        <li>{carCardDescription(data.car)}</li>
                    </ul>


                </div>

            </div>
        );
    };

    const renderDetail = () => {
        if (!isOpen) return null;
        return (
            <div className="p-4 md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl ">
                {renderDetailTop()}
                <div className="my-7 md:my-10 space-y-5 md:pl-24">
                    <div className="border-t border-neutral-200 dark:border-neutral-700" />
                    <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                        Последное обновление статуса: {convertFullDate(data.lastModifiedDate || "")}
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700" />
                </div>
                {/*{renderDetailTopAuthor()}*/}
                <ButtonPrimary className={"mt-5"}>
                <Link to={`/listing-car-detail/${data.car.id}`} target={"_blank"}>
                        Подробнее
                </Link>
                </ButtonPrimary>
            </div>
        );
    };

    return (
        <div
            className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
            data-nc-id="FlightCard"
        >
            <div
                className={` sm:pr-20 relative  ${className}`}
                data-nc-id="FlightCard"
            >
                {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a href="##" className="absolute inset-0" />

                <span
                    className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
                        isOpen ? "transform -rotate-180" : ""
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
          <i className="text-xl las la-angle-down"></i>
        </span>

                <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
                    {/* LOGO IMG */}
                    <div className="w-24 lg:w-32 flex-shrink-0">
                        {/*<img src={data.airlines.logo} className="w-10" alt="" />*/}
                    </div>

                    {/* FOR MOBILE RESPONSIVE */}
                    <div className="block lg:hidden space-y-1">
                        <div className="flex font-semibold">
                            <div>
                                {convertDate(data.fromDate)}- {convertDate(data.toDate)}
                                <div className="text-sm text-neutral-500 font-normal mt-0.5">
                                    <span>{convertDateTime(data.fromDate)}- {convertDateTime(data.toDate)}</span>

                                </div>
                                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  HND
                </span>
                            </div>
                            <span className="w-12 flex justify-center">
                <i className=" text-2xl las la-long-arrow-alt-right"></i>
              </span>
                            <div>
                                <span>20:00</span>
                                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  SIN
                </span>
                            </div>
                        </div>

                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            <span className="VG3hNb">Nonstop</span>
                            <span className="mx-2">·</span>
                            <span>7h 45m</span>
                            <span className="mx-2">·</span>
                            <span>HAN</span>
                        </div>
                    </div>

                    {/* TIME - NAME */}
                    <div className="hidden lg:block  min-w-[150px] flex-[4] ">
                        {convertDate(data.fromDate)}- {convertDate(data.toDate)}
                        {/*<div className="font-medium text-sm text-gray-400">{convertDate(data.fromDate)}- {convertDate(data.toDate)}</div>*/}
                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            <div className="font-medium text-sm">{convertDateTime(data.fromDate)}- {convertDateTime(data.toDate)}</div>
                        </div>
                    </div>

                    {/* TIMME */}
                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                        <div className="font-medium text-lg">{data.orderId}</div>
                        {/*<div className="text-sm text-neutral-500 font-normal mt-0.5">*/}
                        {/*    7 hours 15 minutes*/}
                        {/*</div>*/}
                    </div>

                    {/* TYPE */}
                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                        <Link to={`/listing-car-detail/${data.car.id}`} target={"_blank"}><div className="font-medium text-lg">{data.car.carModelName || data.car.carBody}</div>
                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            {data.car.modelName}
                        </div>
                        </Link>
                    </div>

                    {/* PRICE */}
                    <div className="flex-[4] whitespace-nowrap sm:text-right">
                        <div>
              <span className="text-xl font-semibold text-secondary-6000">
              </span>
                        </div>
                        {!ownCarRequest &&
                            <div className={`text-xs sm:text-sm text-green-800  font-bold mt-0.5 alert `}>
                                {orderStatusName(data.status)}
                            </div>
                        }

                        {ownCarRequest == true && <ButtonSecondary onClick={() => setStatusOpen(true)}>
                            {orderStatusName(data.status)}
                        </ButtonSecondary>}
                        {statusChange()}
                    </div>
                </div>
            </div>

            {/* DETAIL */}
            {renderDetail()}
        </div>
    );
};

export default OrderCarCard;
