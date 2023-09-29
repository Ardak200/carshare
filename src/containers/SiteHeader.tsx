import React from "react";
import { useLocation } from "react-router-dom";
import Header2 from "components/Header/Header";
import Header from "shared/Header/Header";
import {useKeycloak} from "@react-keycloak/web";

const SiteHeader = () => {
  let location = useLocation();
  const { keycloak } = useKeycloak()
  return keycloak.authenticated ? (
    <Header2 />
  ) : (
    <Header />
  );
};

export default SiteHeader;
