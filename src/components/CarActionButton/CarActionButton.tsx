import {FC} from "react";
import { Menu } from '@headlessui/react'
import { Link } from "react-router-dom";
import {CarModule} from "../../data/types";

interface CarActionButtonProps {
    className?:string,
    removeAction:Function,
    activeAction:Function,
    data:CarModule,
    activePage:boolean
}

const CarActionButton:FC<CarActionButtonProps> = ({
    className="",
    removeAction,
    data,
    activeAction,
    activePage=true
                                                  }) => {
    const activeButtonName = activePage ? "Деактивировать" : "Активировать"
    return (
        <div className={className}>
            <Menu as="div" className="relative">

                <Menu.Button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"> <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                                                            xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg></Menu.Button>
                    <Menu.Items className="absolute mt-1 right-0 py-1 text-sm text-gray-700 dark:text-gray-200 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div className={"flex flex-col"}>
                            <Menu.Item>
                                <Link  target="_blank" to={`/add-listing-1/${data.id}`}>
                                <span className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Редактировать</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <span onClick={(e) =>activeAction()} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{activeButtonName}</span>
                            </Menu.Item>
                            <Menu.Item >
                                <span onClick={(e)=>removeAction()} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Удалить</span>
                            </Menu.Item>
                        </div>

                    </Menu.Items>

            </Menu>
        </div>


    )
}

export default CarActionButton;