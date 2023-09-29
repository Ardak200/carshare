import Label from "components/Label/Label";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import {useKeycloak} from "@react-keycloak/web";
import {useAuth} from "../../hooks/auth-hook/auth-hook";
import {UserProfileProp} from "../../data/types";
import {getUserProfile, postOrEdit} from "../../axios/lib/rent/userProfile";
import {use} from "i18next";
import {successMessage} from "../../utils/toastMessage";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const {user} = useAuth();
  const [userProfile,setUserProfile] = useState<UserProfileProp>({
    "userId": "",
    "email": "",
    "name": "",
    "address": "",
    "userName": "",
  })
  const [loading,setLoading] = useState(false)

  function handleChange(evt:ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setUserProfile({
      ...userProfile,
      [evt.target.name]: value
    });
    console.log("asdasd")
  }


  const changeProfile=()=> {
    setLoading(true)
    postOrEdit({
      userId:user.id||"",
      userName:user.username||"",
      email:user.email||"",
      name:userProfile.name,
      address:userProfile.address
    }).then(res=> {
      successMessage("Успешно обновлено")
      setLoading(false)
    }).catch(e=>{
      setLoading(false)
    })
  }
  useEffect(()=> {
    if(user.id) {
      getUserProfile(user.id||"").then(res=> {
        setUserProfile(res.data)
      })
    }
  },[user.id])

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Аккаунт || Carshare</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Ваш аккаунт</h2>
          <h3>Добро пожаловать!  {user.firstName+" " + user.lastName}</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>ФИО</Label>
                <Input name="name" className="mt-1.5" value={userProfile.name || user.firstName + " " + user.lastName}  onChange={() => handleChange} />
              </div>
              {/* ---- */}
              {/* ---- */}
              <div>
                <Label>Логин</Label>
                <Input className="mt-1.5" value={user.username} disabled={true} />
              </div>
              {/* ---- */}
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" value={user.email} disabled={true} />
              </div>
              {/* ---- */}
              <div>
                <Label>Телефон номер</Label>
                <Input className="mt-1.5" defaultValue={userProfile?.phoneNumbers?.length && userProfile.phoneNumbers[0]} />
              </div>
              <div>
                <Label>Адрес</Label>
                <Input defaultValue={"Алматы"} className="mt-1.5" value={userProfile.address} name="address" onChange={()=>handleChange} />
              </div>
              <div className="pt-2">
                <ButtonPrimary onClick={() =>changeProfile()} loading={loading}>Обновить</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
