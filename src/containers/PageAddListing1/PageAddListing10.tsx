import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import React, {FC, useEffect} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { Link } from "react-router-dom";
export interface PageAddListing10Props {}

const PageAddListing10: FC<PageAddListing10Props> = () => {
  return (
      <>
        <div className="text-center p-16">
          <h2 className="text-2xl font-semibold ">Успешно добавлено 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Можете проверить в <Link to={"/account-savelists"}>Личный кабинет</Link>
          </span>
        </div>
      </>
  );
};

export default PageAddListing10;
