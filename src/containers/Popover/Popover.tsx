import React, {FC, Fragment, useState} from "react";
import {Popover, Transition} from "@headlessui/react";
import SearchFilterClick from "../../shared/searchFilter/SearchFilterClick";

interface PopOverComponentProp {
    list:any[],
    onClick:Function,
    active:string,
    label:string
}
const PopOverComponent:FC<PopOverComponentProp> = ({
    list,
    onClick,
    active="",
    label
}) => {
    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <Popover.Button
                        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                            open ? "!border-primary-500 " : ""
                        }`}
                    >
                        <span>{active != "" ? active : label}</span>
                        <i className="las la-angle-down ml-2"></i>
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
                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                            <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                <div className="relative flex flex-col px-5 py-6 space-y-5">
                                    <SearchFilterClick list={list}
                                                  onClick={() => onClick}
                                                  withoutName={false} />
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
        )

}

export default PopOverComponent;