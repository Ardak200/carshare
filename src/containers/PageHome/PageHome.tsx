import React, {useEffect, useState} from "react";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import {CarModule, TaxonomyType} from "data/types";
import { Helmet } from "react-helmet";
import ListingCarPage from "../ListingCarPage/ListingCarPage";
import {getCarPost} from "../../axios/lib/rent/carModule";


function PageHome() {
    const [carData,setCarData] = useState<CarModule[]>([]);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Car Share</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />
      <ListingCarPage />
    </div>
  );
}

export default PageHome;
