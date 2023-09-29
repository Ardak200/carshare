import React, {Fragment} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import {Tab} from "@headlessui/react";
import visaPng from "../../images/vis.png";
import mastercardPng from "../../images/mastercard.svg";
import Label from "../../components/Label/Label";
import Input from "../../shared/Input/Input";
import Textarea from "../../shared/Textarea/Textarea";

const AccountBilling = () => {

  const paymentMethods = () => {
    return (
        <div className="mt-6">
          <Tab.Group>
            <Tab.List className="flex">
              <Tab as={Fragment}>
                {({ selected }) => (
                    <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                            selected
                                ? "bg-neutral-800 text-white"
                                : " text-neutral-6000 dark:text-neutral-400"
                        }`}
                    >
                      <span className="mr-2.5">С картой</span>
                      <img className="w-8" src={visaPng} alt="" />
                      <img className="w-8" src={mastercardPng} alt="" />
                    </button>

                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                    <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                            selected
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-6000 dark:text-neutral-400"
                        }`}
                    >
                      Наличными
                    </button>
                )}
              </Tab>
            </Tab.List>

            <div className="w-14 border-b border-neutral-200 my-5"></div>
            <Tab.Panels>
              <Tab.Panel className="space-y-5">
                <div className="space-y-1">
                  <Label>Номер карты </Label>
                  <Input defaultValue="111 112 222 999" />
                </div>
                <div className="space-y-1">
                  <Label>Владелец карты (на латинском) </Label>
                  <Input defaultValue="ANSAR YERGESHOV" />
                </div>
                <div className="flex space-x-5  ">
                  <div className="flex-1 space-y-1">
                    <Label>Срок действие</Label>
                    <Input type="date" defaultValue="MM/YY" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label>CVC </Label>
                    <Input />
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="space-y-5">
                <div className="space-y-1">
                  <Label>Комментарий к оплате </Label>
                  <Textarea placeholder="..." />
                </div>
                <div className="pt-4">
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        )
  }

  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Карта</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="max-w-2xl">
            <span className="text-xl font-semibold block">Способ оплаты</span>
            <br />
            {paymentMethods()}
            <div className="pt-10">
              <ButtonPrimary>Обновить</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
