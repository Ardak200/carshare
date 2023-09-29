import React, { FC } from "react";

export interface RadioButtonProps {
    label?: string;
    subLabel?: string;
    className?: string;
    name: string;
    defaultChecked?: boolean;
    onChange?: Function;
    active?:string;
}

const RadioButton: FC<RadioButtonProps> = ({
                                         subLabel = "",
                                         label = "",
                                         name,
                                         className = "",
                                         onChange,
                                         active=[]
                                     }) => {
    return (
        <div className={`flex text-sm sm:text-base ${className}`}>
            <input
                id={name}
                name={name}
                type="radio"
                className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
                defaultChecked={active == name}
                checked={active == name}
                onChange={() => onChange && onChange(name)}
            />
            {label && (
                <label
                    htmlFor={name}
                    className="ml-3.5 flex flex-col flex-1 justify-center"
                >
          <span className=" text-neutral-900 dark:text-neutral-100">
            {label}
          </span>
                    {subLabel && (
                        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light">
                            {subLabel}
                        </p>
                    )}
                </label>
            )}
        </div>
    );
};

export default RadioButton;
