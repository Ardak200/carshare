import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import moment from "moment";
import {CarSearchParams, CityType, RegionType} from "../../data/types";
import AddressInputRegion from "./AddressInputRegion";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface RentalCarSearchFormProps {
  haveDefaultValue?: boolean;
  location?:CityType|RegionType;
  setLocation:Function,
  carSearchParams?:CarSearchParams
}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({
  haveDefaultValue,
    location,
    setLocation,
    carSearchParams
}) => {
  const defaultPickUpInputValue = location?.name || "Весь Казахстан";
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00",
    endTime: "10:00",
  });
  const [pickUpInputValue,
    setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("same");

  // USER EFFECT
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue({
        startDate: moment(),
        endDate: null,
      });

      setPickUpInputValue(defaultPickUpInputValue);
    }
  }, []);
  //

  const renderForm = () => {
    return (
      <div className="w-full">
        <form className="w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
          <div className=" flex flex-col md:flex-row w-full rounded-full [ nc-divide-field ] ">
            <div className="relative flex flex-col md:flex-row flex-grow [ nc-divide-field ] ">
              <AddressInputRegion
                  setLocation={setLocation}
                defaultValue={pickUpInputValue}
                onChange={(e) => setPickUpInputValue(e)}
                onInputDone={() =>
                  setFieldFocused(
                    dropOffLocationType === "different"
                      ? "dropOffInput"
                      : "startDate"
                  )
                }
                placeHolder={location?.name ||"Весь Казахстан" }
                desc="Регион"
              />
              {dropOffLocationType === "different" && (
                <AddressInputRegion
                  defaultValue={dropOffInputValue}
                  onChange={(e) => setDropOffInputValue(e)}
                  onInputDone={() => setFieldFocused("startDate")}
                  placeHolder="City or Airport"
                  desc="Drop off location"
                  autoFocus={fieldFocused === "dropOffInput"}
                  setLocation={setLocation}
                  location={location}
                />
              )}
            </div>
            <RentalCarDatesRangeInput
              defaultDateValue={dateRangeValue}
              defaultTimeValue={timeRangeValue}
              defaultFocus={
                fieldFocused === "dropOffInput" ? null : fieldFocused
              }
              onFocusChange={(focus) => setFieldFocused(focus)}
              onChange={(data) => {
                setDateRangeValue(data.stateDate);
                setTimeRangeValue(data.stateTimeRage);
              }}
            />
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3 flex items-center justify-center">
              <ButtonSubmit />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return renderForm();
};

export default RentalCarSearchForm;
