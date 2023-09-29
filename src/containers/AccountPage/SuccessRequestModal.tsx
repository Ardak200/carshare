import React, {FC, Fragment, useCallback} from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {useHistory} from "react-router-dom";

interface SuccessRequestProp {
    setIsOpen:Function,
    isOpen:boolean,
    title:string,
    content:string,
    timer?:number,
    path:string
}

const SuccessRequestModal:FC<SuccessRequestProp> = ({
                                                           setIsOpen,
                                                           path,
                                                           title, isOpen,
                                                           content,timer}) => {
    const history = useHistory()
    const closeModal = () => {
        setIsOpen(false);
        history.push(path);
    }
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
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
                                        {title}
                                    </Dialog.Title>
                                    <span className="absolute right-3 top-3">
                                        <ButtonClose onClick={closeModal} />
                                    </span>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {content}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
                                        <ButtonPrimary
                                            onClick={closeModal}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Закрыть
                                            {/*{timer && `(${timer})`}*/}
                                        </ButtonPrimary>
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

export default SuccessRequestModal;