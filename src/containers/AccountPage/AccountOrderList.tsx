import {Tab} from "@headlessui/react";
import React, {useEffect, useState} from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import {OrderTypeProps} from "../../data/types";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import {getOrderByUserAndStatusRequest, getOrderByUserRequest} from "../../axios/lib/order/order";
import OrderCarCard from "../../components/CarCard/OrderCarCard";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import Select from "../../shared/Select/Select";
import {orderStatuses} from "../../utils/otherDefaultValues.";
import {orderStatusName} from "../../utils/carSearchParamConvert";

const AccountOrderList = () => {
  let [categories] = useState(["Активные","Неактивные"]);
  const [orders,setOrders] = useState<OrderTypeProps[]>();
  const [totalPages,setTotalPages] = useState(0);
  const [totalElements,setTotalElements] = useState(0)
  const [status,setStatus] = useState<orderStatuses|"">("");
  const [active,setActive] = useState(true);
  const {user} = useAuth();
  const getOrders = () => {
    getAllOrder();
  }

  const getAllOrder = () => {
    getOrderByUserRequest(user.id || "").then(res=> {
      setOrders(res.data)
    }).catch(e=> {
      if(e.response) {
        setOrders(e.response.data)
      }
    })
  }

  const changeStatus = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if(value == "") {
      getAllOrder();
    } else {
      setStatus(value as orderStatuses);
      getOrderByStatus(value as orderStatuses);
    }
  }
  const getOrderByStatus = (status:orderStatuses) => {
    getOrderByUserAndStatusRequest(user.id || "", status).then(res=> {
      setOrders(res.data)
    }).catch(e=> {
      if(e.response) {
        setOrders(e.response.data)
      }
    })
  }

  const selectStatus = () => {
    return (
        <Select className="lg:w-2/5" onChange={(e) =>changeStatus(e)}>
          <option value={""}>Все статусы</option>
          {(Object.keys(orderStatuses) as (keyof typeof orderStatuses)[]).map(
              (key, index) => (
                  <option value={orderStatuses[key]}>{orderStatusName(orderStatuses[key])}</option>
              ))}
        </Select>
    )
  }

  useEffect(() => {
    if(user.id) {
      getOrders()
    }
  },[user.id])

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Мои заказы</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <label>Заказы по статусам:</label>
            {selectStatus()}
            <Tab.Panels>
              {categories.map(c=> (
                  <Tab.Panel className="mt-8">
                    {orders && orders.length == 0 ?
                        <NoRecordFound /> :
                        <>
                          <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
                            {orders && orders.map((order) => (
                                <OrderCarCard data={order} ownCarRequest={false}/>
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

export default AccountOrderList;
