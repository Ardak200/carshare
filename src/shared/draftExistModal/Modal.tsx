import * as React from "react"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import {CarModule} from "../../data/types";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";

type ModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setStep:Function
    carModule:CarModule
    setCarModule:Function
}

export const Modal = ({ isOpen, setIsOpen,setStep,carModule,setCarModule }: ModalProps) => {
    const clearStorage = () => {
        localStorage.removeItem("carPost");
        localStorage.removeItem("step");
        setIsOpen(false);
        setStep(1)
        setCarModule({ "id":"",
            "carModel": "",
            "model":"",
            "transmission": "",
            "rating": 0,
            "description": "",
            "priceByDay": "",
            "priceByHour": "",
            "engineVolume": "",
            "numberOfSeats": 2,
            "productionYear": 0,
            "carBody": "",
            "region": "",
            "city": "",
            "engine": "",
            "rudderLocation":"",
            "driveUnit": "",
            "color": "",
            "active":true,
            "files": []})

    }

    const continueFill = () => {
        let step = localStorage.getItem("step")
        if(step!==null) {
            setStep(parseInt(step))
        }
        setIsOpen(false);
    }
    return (
        <Dialog
            open={isOpen}
            onClose={setIsOpen}
            as="div"
            className={clsx(
                "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
                {
                    "": isOpen === true,
                },
            )}
        >
            <div className="flex flex-col bg-gray-800 text-white w-96 py-8 px-4 text-center">
                <Dialog.Overlay />

                <Dialog.Title className="text-neutral-500 text-xl">
                    Продолжить заполнение?
                </Dialog.Title>
                <Dialog.Description className="text-xl m-2">
                    У вас есть черновик объявление
                </Dialog.Description>

                <p className="text-md m-4">
                    Вы можете продолжить его заполнение или начать все заново
                </p>
                <div className={"flex justify-end flex-column space-x-5"}>
                    <ButtonPrimary onClick={continueFill}>Продолжить</ButtonPrimary>
                    <ButtonSecondary onClick={clearStorage}>Начать заново</ButtonSecondary>
                </div>

            </div>
        </Dialog>
    )
}
