import {FC} from "react";

interface FormStepperHeaderType {
    step:number,
    setStep:Function,
    activeMarkaName:string,
    activeModelName:string,
    clickStepper:Function,
    editPage:boolean
}


const FormStepperHeaderType:FC<FormStepperHeaderType> = ({
    step,
    setStep,
    activeMarkaName,activeModelName,
    clickStepper,
    editPage
}) => {

    const headerTypes = [
        {
            name:activeModelName|| "Марка",
            step:1,
        },
        {
            name:activeMarkaName || "Модель",
            step:2,
        },
        {
            name:"Параметры",
            step:3,
        },
        {
            name:"Добавление поста",
            step:4,
        },
    ]
    return (
        <div>
            <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                id="tabs-tab"
                role="tablist">
                {headerTypes.map(h=> (
                    <li aria-disabled={true} onClick={() =>clickStepper(h.step)} className={`nav-item ${(editPage && (h.step == 2 || h.step == 1)) && "pointer-events-none"}`} role="presentation">
                        <a href="#tabs-home" className={`
                          nav-link
                          block
                          font-medium
                          text-l
                          leading-tight
                          uppercase
                          bg-transparent-300
                          border-x-0 border-t-0 border-b-2 border-transparent
                          px-6
                          py-3
                          my-2
                          hover:border-transparent hover:bg-opacity-30
                          focus:border-transparent
                          ${step === h.step && "bg-opacity-30 bg-blue-500 active"}
                        `} id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                           aria-selected="true">{h.name}</a>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default FormStepperHeaderType;