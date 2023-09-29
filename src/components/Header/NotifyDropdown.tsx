import {Popover, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import Avatar from "shared/Avatar/Avatar";
import {OrderTypeProps} from "../../data/types";
import {getOrderFromOwncarByStatus} from "../../axios/lib/order/order";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import {Link} from "react-router-dom";
import {orderStatusName} from "../../utils/carSearchParamConvert";
import {convertFullDate} from "../../utils/convertDate";
import {orderStatuses} from "../../utils/otherDefaultValues.";

const solutions = [
  {
    name: "Eden Tuan",
    description: "Measure actions your users take",
    time: "3 minutes ago",
    href: "##",
  },
  {
    name: "Leo Messi",
    description: "Create your own targeted content",
    time: "1 minute ago",
    href: "##",
  },
  {
    name: "Leo Kante",
    description: "Keep track of your growth",
    time: "3 minutes ago",
    href: "##",
  },
];

export default function NotifyDropdown() {
  const [orders,setOrders] = useState<OrderTypeProps[]>();
  const {user} = useAuth();

  const getOrderByStatus = (status:orderStatuses) => {
    getOrderFromOwncarByStatus(user.id || "", status).then(res=> {
      setOrders(res.data)
    }).catch(e=> {
      if(e.response) {
        setOrders(e.response.data)
      }
    })
  }

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
                onClick={() => getOrderByStatus(orderStatuses.RESERVED)}
              className={`
                ${open ? "" : "text-opacity-90"}
                 group  p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
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
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
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
              <Popover.Panel className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 mt-3 -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    <h3 className="text-xl font-semibold">Уведомления по машинам</h3>
                    {orders?.length ==0 && <span>Нету уведомления</span>}
                    {orders && orders != [] && orders.map((item, index) => (
                      <Link
                        key={index}
                        to={`/account-requests`}
                        target={"_blank"}
                        className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                      >
                        <Avatar sizeClass="w-8 h-8 sm:w-12 sm:h-12" />
                        <div className="ml-3 sm:ml-4 space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {item.car.carModelName ? (item.car.carModelName+ ", " +item.car.modelName) : item.car.carBody}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {orderStatusName(item.status)}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-400">
                            {convertFullDate(item.createdDate || "")}
                          </p>
                        </div>
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
