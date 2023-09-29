import React, {FC, MutableRefObject, useState} from "react";

export interface ListOfElementSearchProps {
    list:any[],
    active?:string,
    placeholder:string,
    setActive:Function,
    setActiveName?:Function,
    activeName?:string,
    refinput:React.Ref<any>
}

const SearchFilter: FC<ListOfElementSearchProps> = ({
                                                 list,
                                                 active,
                                                 placeholder="",
                                                 setActive,
                                                 setActiveName,
                                                 refinput,
                                                 activeName
                                             }) => {
    const onClickAction = (id:string,name?:string) => {
        setActive(id,name)
        if(setActiveName) {
            setActiveName(name);
        }
    }
    const [value, setValue] = useState("");
    const [listOfElement,setListOfElement] = useState(list)
    const onChangeInput = (e:React.FormEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value;
        setValue(inputValue)
        if(list.length!=0) {
            list = list.filter(l=> {
                return l.name.toLowerCase().includes(inputValue.toLowerCase());
            })
            setListOfElement(list);
        }
    }
    return(
       <div>
           <input
               placeholder={placeholder}
               ref={refinput}
               className="focus:ring-primary-500 focus:border-primary-500 block max-w-7xl pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
               type="text" value={value}
               onChange={(e) => onChangeInput(e)}
           />
           <div className="p-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
               {listOfElement.length ? listOfElement.map((item) => (
                   <div onClick={() => onClickAction(item.id,item.name)} className={`${(active == item.id || activeName == item.name) && "bg-opacity-30 bg-blue-500"} cursor-pointer p-4`}>
                       {item.name}
                   </div>
               )) : <div>Совпаданий не найдено</div>}
           </div>

       </div>
    );
};

export default SearchFilter;
