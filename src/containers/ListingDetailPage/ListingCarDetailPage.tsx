import React, {FC, useCallback, useEffect, useState} from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import RentalCarDatesRangeInput from "components/HeroSearchForm/RentalCarDatesRangeInput";
import { TimeRage } from "components/HeroSearchForm/RentalCarSearchForm";
import {RouteComponentProps, useHistory, useParams} from "react-router-dom";
import {
    CarImageType,
    CarModule,
    CarParams,
    CityType,
    OrderTypeProps,
    RegionType,
    UserProfileProp
} from "../../data/types";
import {getCarById} from "../../axios/lib/rent/carModule";
import ModalPhotosNew from "./ModalPhotosNew";
import {Amenities_demos, defaultOrderModule} from "../../utils/otherDefaultValues.";
import {createOrder} from "../../axios/lib/order/order";
import {maskPhoneString} from "../../utils/carSearchParamConvert";
import {getUserProfile} from "../../axios/lib/rent/userProfile";
import {errorMessage, successMessage} from "../../utils/toastMessage";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import {useKeycloak} from "@react-keycloak/web";
import LoginRequiredModal from "../AccountPage/LoginRequiredModal";
import SuccessRequestModal from "../AccountPage/SuccessRequestModal";

export interface ListingCarDetailPageProps {
  className?: string;
  id?:string;
}

type CarsProp = RouteComponentProps<CarParams>;


const PHOTOS: string[] = [
  "http://192.168.1.2:8092/api/minio/public/downloadFile/3eb28d63",
  "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",

  "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",

];

const includes_demo = [
  { name: "Бесплатная отмена бронирования за 48 часов" },
  { name: "Отказ от возмещения ущерба при столкновении "},
  { name: "Защита от угона" },
  { name: "Неограниченный пробег" },
  {
    name: "Внутренняя и внешняя уборка автомобиля с использованием дезинфицирующего средства перед получением машины",
  },
];


interface IParams {
  id:string
}
const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({
  className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [timer,setTimer] = useState(5);
    const [isSuccess,setSuccess] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    const [data,setData] = useState<CarModule>();
    const [dataOrder,setDataOrder] = useState<OrderTypeProps>(defaultOrderModule);
    const [receivedOrder,setReceivedOrder] = useState<OrderTypeProps>(defaultOrderModule);
    const [city,setCity] = useState<CityType>()
    const [region,setRegion] = useState<RegionType>();
    const {id} = useParams<IParams | any>();
    let history = useHistory();
    let user = useAuth();
    const [phoneNumber,setPhoneNumber] = useState("+77001112222");
    const[userProfile,setUserProfile] = useState<UserProfileProp>();
    const [loginModal,setLoginModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const closeModal = () => {
        setLoginModal(false)
    }
    useEffect(() => {
        if(id != null) {
            getCarById(id).then(res=> {
                getUserProfile(res.data.createdByUser).then(res=> {
                    setUserProfile(res.data)
                })
                setData(res.data);
                setDataOrder({...dataOrder,car:res.data})
                if(!res.data) {
                    errorMessage("Запись удалена или не существует")
                    setTimeout(() => {
                        history.push("/")
                    },1000)
                } else {
                    if(res.data.phoneNumbers.length > 0) {
                        setPhoneNumber(res.data.phoneNumbers[0]);
                    }
                    dataOrder.fromDate = (dateRangeValue.startDate?.format("l LT") || "");
                    dataOrder.toDate = (dateRangeValue.endDate?.format("l LT") || "");
                }


            }).catch(err=> {
                history.push("/")
            })
        } else {
            history.push("/")
        }

    },[])
  // USE STATE
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: moment(),
    endDate: moment().add(1, "days"),
  });
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00",
    endTime: "10:00",
  });

  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>("startDate");

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const onReserve = () => {
      setLoading(true)
      if(user.isAuthenticated) {
          if(dateRangeValue.startDate && dateRangeValue.endDate) {
              setTimer(5)
              dataOrder.car.id = id;
              dataOrder.fromDate = dateRangeValue.startDate?.format("YYYY-MM-DDT"+timeRangeValue.startTime);
              dataOrder.toDate = dateRangeValue.endDate?.format("YYYY-MM-DDT"+timeRangeValue.endTime);
              createOrder(dataOrder).then(res=> {
                  setSuccess(true)
                  setLoading(false)
                  console.log(res)
                  setReceivedOrder(res.data)
              })
          }else {
              errorMessage("Выберите даты бронирование")
          }

      } else {
          setLoginModal(true)
      }
  }

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge color="pink" name={data?.carModelName} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {data?.modelName}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating point={5} />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1"> {data?.cityName}, {data?.regionName}</span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Автор объявлений{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {userProfile?.name || ""}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{data?.numberOfSeats} мест</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-car-side text-2xl"></i>
            <span className=""> {data?.carBody || "Седан"}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-palette text-2xl"></i>
            <span className="">{data?.engineVolume} л. {data?.engine || "Бензин"}</span>
          </div>
        </div>
      </div>
    );
  };

  //
  const renderSectionTienIch = (data:CarModule | undefined) => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">
            Параметры машин{" "}
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
          {/* TIEN ICH 1 */}
          {data && Amenities_demos(data).map((item, index) => (
            <div key={index} className="flex items-center space-x-4 ">
              <div className="w-10 flex-shrink-0">
                <img src={item.icon} alt="" />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection2 = (description:string) => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Описание машины</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>
            {description || "Описание машины"}
            <br />
            <br />

          </p>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Дополнительно </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Включено в стоимость
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {includes_demo
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Доступность</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {/*Prices may increase on weekends or holidays*/}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="listingSection__wrap__DayPickerRangeController flow-root">
          <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
            <DayPickerRangeController
              startDate={dateRangeValue.startDate}
              endDate={dateRangeValue.endDate}
              onDatesChange={(date) => setDateRangeValue(date)}
              focusedInput={focusedInputSectionCheckDate}
              onFocusChange={(focusedInput) =>
                setFocusedInputSectionCheckDate(focusedInput || "startDate")
              }
              initialVisibleMonth={null}
              numberOfMonths={windowSize.width < 1280 ? 1 : 2}
              daySize={getDaySize()}
              hideKeyboardShortcutsPanel
            />
          </div>
        </div>

        {/*  */}
        <div className="flex space-x-8">
          <div className="w-1/2 space-y-2">
            <label className="font-medium" htmlFor="startTime">
              Время от:
            </label>
            <Input
              defaultValue={timeRangeValue.startTime}
              rounded="rounded-xl"
              id="startTime"
              type="time"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="font-medium" htmlFor="endTime">
              Время до:
            </label>
            <Input
              defaultValue={timeRangeValue.endTime}
              rounded="rounded-xl"
              id="endTime"
              type="time"
              onChange={(e) => console.log(e)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Car Owner</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              Kevin Francis
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="##">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Отзывы</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <div className="pt-8">
            {/*<ButtonSecondary>View more 20 reviews</ButtonSecondary>*/}
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <div className="rounded-xl overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={15}
              defaultCenter={{
                lat: 55.9607277,
                lng: 36.2172614,
              }}
            >
              <LocationMarker lat={55.9607277} lng={36.2172614} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Что следует знать</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div className={""}>
          <h4 className="text-lg font-semibold">Правила отмены</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Зафиксируйте эту фантастическую цену сегодня, отмена бесплатна в любое время.
            Зарезервируйте сейчас и оплатите при получении.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      </div>
    );
  };

  const renderSidebarPrice = (data:CarModule | undefined) => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">
            {(data && data?.priceByDay.toLocaleString() || "0") + " тг"}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /день
            </span>
          </span>
            <span className="text-3xl font-semibold">
            {(data && data?.priceByHour.toLocaleString() || "0") + " тг"}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /час
            </span>
          </span>
          </div>

          <StartRating />
        </div>

        {/* FORM */}
        <form className="flex border  border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <RentalCarDatesRangeInput
            defaultDateValue={dateRangeValue}
            defaultTimeValue={timeRangeValue}
            numberOfMonths={1}
            fieldClassName="p-5"
            wrapFieldClassName="flex flex-col w-full flex-shrink-0 relative divide-y divide-neutral-200 dark:divide-neutral-700"
            className="RentalCarDetailPageDatesRangeInput"
            onChange={(data) => {
              setDateRangeValue(data.stateDate);
              setTimeRangeValue(data.stateTimeRage);
            }}
            anchorDirection={windowSize.width > 1400 ? "left" : "right"}
          />
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4 ">
        </div>
        <ButtonPrimary loading={loading} onClick={() => onReserve()}>Забронировать</ButtonPrimary>
      </div>
    );
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">
          Контакты автора
        </span>
        <div className="mt-8 flex">
          {/*<div className="flex-shrink-0 flex flex-col items-center py-2">*/}
          {/*  <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>*/}
          {/*  <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>*/}
          {/*  <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>*/}
          {/*</div>*/}
          <div className="ml-4 space-y-14 text-lg">
              <span className=" text-neutral-500 dark:text-neutral-400">
                {maskPhoneString(phoneNumber)}
              </span>

          </div>
        </div>
      </div>
    );
  };

  const headerDescriptionImages = (PHOTOS:CarImageType[]) => {
    const cols = () => {
      if(PHOTOS.length>2) {
        return 4;
      }else if (PHOTOS.length == 1) {
        return 2;
      } else if (PHOTOS.length == 2) {
        return 3;
      }
    }

    return (
        <div>
          {/* SINGLE HEADER */}
          <>
            <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
              <div className={`relative grid grid-cols-${cols()} gap-1 sm:gap-2`}>
                <div
                    className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleOpenModal(0)}
                >
                  <NcImage
                      containerClassName={PHOTOS.length ==1 ? "aspect-w-5 aspect-h-2" : "absolute inset-0"}
                      className="object-cover w-full h-full rounded-md sm:rounded-xl"
                      src={process.env.REACT_APP_MINIO + PHOTOS[0].link}
                  />
                  <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>

                {/*  */}
                {PHOTOS.length>1 &&
                    <div
                        className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => handleOpenModal(1)}
                    >
                      <NcImage
                          containerClassName={PHOTOS.length <4 ? "aspect-w-4 aspect-h-3" : "absolute inset-0"}
                          className="object-cover w-full h-full rounded-md sm:rounded-xl"
                          src={process.env.REACT_APP_MINIO + PHOTOS[1]?.link}
                      />
                      <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                }

                {/*  */}
                {PHOTOS.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
                    <div
                        key={index}
                        className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                            index >= 2 ? "block" : ""
                        }`}
                    >
                      <NcImage
                          containerClassName="aspect-w-4 aspect-h-3"
                          className="object-cover w-full h-full rounded-md sm:rounded-xl "
                          src={process.env.REACT_APP_MINIO + item.link || ""}
                      />

                      {/* OVERLAY */}
                      <div
                          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => handleOpenModal(index + 2)}
                      />
                    </div>
                ))}

                <div
                    className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                    onClick={() => handleOpenModal(0)}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="ml-2 text-neutral-800 text-sm font-medium">
                Посмотреть все рисунки
              </span>
                </div>
              </div>
            </header>
            {/* MODAL PHOTOS */}
            <ModalPhotosNew
                imgs={PHOTOS}
                isOpen={isOpen}
                onClose={handleCloseModal}
                initFocus={openFocusIndex}
                uniqueClassName="nc-ListingCarDetailPage__modalPhotos"
            />
          </>
        </div>
    )
  }

  return (
    <div
      className={`nc-ListingCarDetailPage  ${className}`}
      data-nc-id="ListingCarDetailPage"
    >
      {data?.images != null &&  data?.images?.length != 0 && headerDescriptionImages(data?.images || [])}
      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
          {renderSectionTienIch(data)}
          {renderSection2(data?.description || "")}
          {renderSection3()}
          {renderSectionCheckIndate()}
          {/*{renderSection5()}*/}
          {renderSection6()}
          {/*{renderSection7()}*/}
          {renderSection8()}
          <LoginRequiredModal
              setIsOpen={setLoginModal}
              isOpen={loginModal}
              title={"Требуется войти в систему"}
              content={"Чтобы забронировать вам необходимо войти в систему"}
          />
          <SuccessRequestModal
              timer={timer}
              setIsOpen={setSuccess}
              path={"/account-orderlists"}
              isOpen={isSuccess}
              title={"Запрос на бронирование отправлен"}
              content={`Сформирован заказ ${receivedOrder.orderId}. Вы можете следить статус заявки в своем личном кабинете`} />
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          <div>{renderSidebarDetail()}</div>
          <div className="mt-10 sticky top-24">{renderSidebarPrice(data)}</div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      <div className="block lg:hidden fixed bottom-0 inset-x-0 py-4 bg-white text-neutral-900 border-t border-neutral-200 z-20">
        <div className="container flex items-center justify-between">
          <span className="text-2xl font-semibold">
            $311
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span>

          <ButtonPrimary href="##">Забронировать</ButtonPrimary>
        </div>
      </div>

      {/* OTHER SECTION */}
      {/*<div className="container py-24 lg:py-32">*/}

      {/*</div>*/}
    </div>
  );
};

export default ListingCarDetailPage;
