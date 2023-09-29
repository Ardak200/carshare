import React, {FC, MutableRefObject, useState} from "react";
import Checkbox from "../Checkbox/Checkbox";

export interface SearchFilterProps {
    list:any[],
    active?:string[],
    onChange?:Function,
    close?:HTMLElement | MutableRefObject<HTMLElement | null>
    withoutName:boolean
}

const SearchFilter: FC<SearchFilterProps> = ({
    list=[],
    active,
    onChange,
    close,
    withoutName
}) => {
    const [value,setValue] = useState("");
    const [listOfElement,setListOfElement] = useState(list)
    const onChangeInput = (e:React.FormEvent<HTMLInputElement>) => {
       let inputValue = e.currentTarget.value;
       setValue(inputValue)
       if(list.length!=0) {
           if(withoutName) {
               list = list.filter(l=> {
                   return l.toLowerCase().includes(inputValue.toLowerCase());
               })
           } else {
               list = list.filter(l=> {
                   return l.name.toLowerCase().includes(inputValue.toLowerCase());
               })
           }
           setListOfElement(list);
       }
    }
    return(
        <div className="relative flex flex-col px-5 py-6 space-y-5 max-h-60 DayPicker_transitionContainer__verticalScrollable">
            {list.length>5 && <input
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                type="text" value={value}
                onChange={(e) => onChangeInput(e)}
            />}

            {listOfElement.length ? listOfElement.map((item) => (
                <div key={withoutName ? item : item.name} className="">
                    <Checkbox
                        name={withoutName ? item : item.name}
                        label={withoutName ? item :item.name}
                        subLabel={""}
                        onChange={onChange}
                        active={active}
                    />
                </div>
            )) : <div>Совпаданий не найдено</div>}
        </div>
    );
};

export default SearchFilter;