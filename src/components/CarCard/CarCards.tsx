import React, {FC, useState} from "react";
import {CarDataType, CarModule} from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import NcImage from "shared/NcImage/NcImage";
import {getPrimaryImageInCar} from "../../utils/getPrimaryImageInCar";
import {carCardDescription} from "../../utils/carSearchParamConvert";
import CarActionButton from "../CarActionButton/CarActionButton";
import {changeCarStatus, removeCar} from "../../axios/lib/rent/carModule";
import {fireOnRemove} from "../CarActionButton/SwalActions";
export interface CarCardProps {
    className?: string;
    data: CarModule;
    size?: "default" | "small";
    myCars?:boolean;
    activePage?:boolean
    loading?:boolean
}
const CarCards: FC<CarCardProps> = ({
                                       size = "default",
                                       className = "",
                                       data ,
    loading=false,
    activePage = true,
    myCars = false
                                   }) => {
    const [imgUrl,setImgUrl] = useState(process.env.REACT_APP_MINIO);
    const removeAction = () => {
        fireOnRemove(data.id)
    }

    const activatePage = () => {
        changeCarStatus(data.id,!activePage).then(res=> {
            window.location.reload();
        })
    }
    const renderSliderGallery = () => {
        return (
            <div className="relative w-full rounded-2xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 ">
                    <NcImage
                        containerClassName="flex items-center justify-center"
                        className="w-full"
                        src={data.images?.length && "http://192.168.1.2:8092" + data.images[0].link || ""}
                    />
                </div>
                {!myCars &&
                    <BtnLikeIcon className="absolute right-3 top-3 z-[1]" />}
                {myCars && <CarActionButton activePage={activePage} activeAction={activatePage} data={data} removeAction={removeAction}  className="absolute right-3 top-3 z-[1]"/>}
            </div>
        );
    };


    const loadingContent = () => {
        return(
            <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
                <div className="bg-gray-200 w-full animate-pulse h-32 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            </div>
        )
    }
    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        {/*{isAds && <Badge name="ADS" color="green" />}*/}
                        <h2
                            className={`  capitalize ${
                                size === "default"
                                    ? "text-xl font-semibold"
                                    : "text-base font-medium"
                            }`}
                        >
                            <Link  target="_blank" to={`/listing-car-detail/${data.id}`}><span className="line-clamp-1">{(data.carModelName || "Марка") + " "  + (data.modelName || "Модель")}</span></Link>
                        </h2>
                    </div>
                    <div className=" items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2 w-100">
                        <span>{carCardDescription(data)}</span>
                    </div>
                </div>
                <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
              {size === "default" && (
                  <div className="flex flex-col">
                     <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                {data && data.priceByHour && `${data.priceByHour.toLocaleString()} тг/час`}

              </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              {data && data.priceByDay && `${data.priceByDay.toLocaleString()} тг/день`}

                  </span>
                  </div>

              )}
          </span>
                    <StartRating reviewCount={5} point={5} />
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform ${className}`}
            data-nc-id="CarCard"
        >
            {loading && loadingContent()}
            {!loading && renderSliderGallery()}
                {!loading && renderContent()}
        </div>
    );
};

export default CarCards;
