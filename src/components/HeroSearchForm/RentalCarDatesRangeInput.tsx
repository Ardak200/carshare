import React, { Fragment, useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
} from "react-dates";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { TimeRage } from "./RentalCarSearchForm";
import useWindowSize from "hooks/useWindowResize";
import 'moment/locale/ru';

type Fields = "pickUp" | "dropOff";

export interface RentalCarDatesRangeInputProps {
  defaultDateValue: DateRage;
  defaultTimeValue: TimeRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: { stateDate: DateRage; stateTimeRage: TimeRage }) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  fieldClassName?: string;
  wrapFieldClassName?: string;
  className?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  defaultDateValue,
  defaultTimeValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  wrapFieldClassName = "flex flex-col xl:flex-row xl:items-center w-full flex-shrink-0 relative [ nc-divide-field ]",
  numberOfMonths,
  anchorDirection,
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultDateValue);
  const [stateTimeRage, setStateTimeRage] = useState(defaultTimeValue);

  //
  useEffect(() => {
    setStateDate(defaultDateValue);
  }, [defaultDateValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange({ stateDate, stateTimeRage });
    }
  }, [stateDate, stateTimeRage]);

  const windowSize = useWindowSize();

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus);
    onFocusChange && onFocusChange(focus);
  };

  const renderEditTime = (field: Fields) => {
    const times = [
      "0:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    let timeValue = stateTimeRage.startTime;
    if (field === "dropOff") {
      timeValue = stateTimeRage.endTime;
    }
    return (
      <Listbox
        value={stateTimeRage.startTime}
        onChange={(time) => {
          if (field === "pickUp") {
            return setStateTimeRage((state) => ({ ...state, startTime: time }));
          }
          setStateTimeRage((state) => ({ ...state, endTime: time }));
        }}
        as="div"
        className="relative flex-shrink-0"
      >
        <Listbox.Button className="focus:outline-none inline-flex items-center group">
          <span className="text-base font-semibold">{`, ` + timeValue}</span>
          <span className="ml-1 absolute z-20 left-full top-0 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-40 min-w-max py-1 mt-1 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 ring-1 ring-black/5 dark:ring-white/20 focus:outline-none sm:text-sm">
          {times.map((time, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${
                  active
                    ? "text-amber-900 bg-amber-100"
                    : "text-gray-900 dark:text-neutral-200"
                } cursor-default select-none relative py-2 pl-10 pr-4`
              }
              value={time}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } block truncate`}
                  >
                    {time}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? "text-amber-600" : "text-amber-600"
                      }  absolute inset-y-0 left-0 flex items-center pl-3`}
                    >
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  };

  const renderInputpickUpDate = () => {
    const focused = focusedInput === "startDate";
    return (
      <div
        className={`flex flex-1 relative  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused" : " "
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
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
        </div>
        <div className="flex-grow flex-shrink-0">
          <div className="absolute inset-0" />

          <div className="inline-flex items-center text-base xl:text-lg font-semibold">
            <span className="flex-shrink-0">
              {stateDate.startDate
                ? stateDate.startDate.format("DD MMMM")
                : "Забрать"}
            </span>
            {stateDate.startDate && renderEditTime("pickUp")}
          </div>

          <span className="block mt-1 text-sm text-neutral-400 font-light leading-none">
            {stateDate.startDate ? "Забрать" : `Выберите дату`}
          </span>
        </div>
      </div>
    );
  };

  const renderInputdropOffDate = () => {
    const focused = focusedInput === "endDate";
    return (
      <div
        className={`flex relative flex-1  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused" : " "
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
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
        </div>
        <div className="flex-grow flex-shrink-0">
          <div className="absolute inset-0" />

          <div className="inline-flex items-center text-base xl:text-lg font-semibold">
            <span className="flex-shrink-0">
              {stateDate.endDate
                ? stateDate.endDate.format("DD MMMM")
                : "Вернуть"}
            </span>
            {stateDate.endDate && renderEditTime("dropOff")}
          </div>
          <span className="block mt-1 text-sm text-neutral-400 font-light leading-none">
            {stateDate.endDate ? "Вернуть" : `Выберите дату`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`RentalCarDatesRangeInput relative flex-shrink-0 flex nc-flex-2-auto z-10 ${className}  ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute inset-0 flex">
        <DateRangePicker
          startDate={stateDate.startDate}
          endDate={stateDate.endDate}
          focusedInput={focusedInput}
          required={true}
          onDatesChange={(date) => setStateDate(date)}
          onFocusChange={handleDateFocusChange}
          startDateId={"nc-hero-stay-startDateId"}
          endDateId={"nc-hero-stay-endDateId"}
          orientation={"horizontal"}
          showClearDates
          noBorder
          hideKeyboardShortcutsPanel
          numberOfMonths={
            numberOfMonths || (windowSize.width <= 1024 ? 1 : undefined)
          }
          anchorDirection={anchorDirection}
          reopenPickerOnClearDates
        />
      </div>

      <div className={wrapFieldClassName}>
        {renderInputpickUpDate()}
        {renderInputdropOffDate()}
      </div>
    </div>
  );
};

export default RentalCarDatesRangeInput;
