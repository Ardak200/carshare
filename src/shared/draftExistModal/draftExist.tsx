import {CarModule} from "../../data/types";
import {FC, useState} from "react";
import { Dialog } from '@headlessui/react'
interface DraftExistProp {
    carModule:CarModule,
    setStep:Function
}
const DraftExist: FC<DraftExistProp> = ({
    carModule,
    setStep,
}) => {
    let [isOpen, setIsOpen] = useState(true)
    const clearStorage = () => {
        localStorage.removeItem("carPost");
        localStorage.removeItem("step");
        setIsOpen(false);
        window.location.reload();
    }

    const continueFill = () => {
        let step = localStorage.getItem("step")
        if(typeof step !== undefined && step != null) {
            let stepNumber = parseInt(step);
            if(!isNaN(stepNumber)) {
                setStep(parseInt(step))
            }
        }
        setIsOpen(false);
    }
    return(
        <Dialog as="div" className="relative z-10"  open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
                <Dialog.Title>У вас имеется черновик</Dialog.Title>
                <Dialog.Description>
                    {carModule.carModel + "/" + carModule.model}
                </Dialog.Description>

                <p>

                </p>

                <button onClick={() => continueFill}>Продолжить</button>
                <button onClick={() => clearStorage}>Сбросить</button>
            </Dialog.Panel>
        </Dialog>
    )
}

export default DraftExist