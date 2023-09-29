import React, {useEffect} from "react";
import MyRouter from "routers/index";
import {ReactKeycloakProvider, useKeycloak} from '@react-keycloak/web'
import {AuthClient} from "@react-keycloak/core"
import keycloak from "./keycloak/keycloak";
import axiosAuthClient from "./axios/appAuthorized";
import './i18n/config';
import {setCookie} from "typescript-cookie";

export const kcTokens = "keycloak-tokens";
const eventLogger = (event: unknown, error: unknown) => {
    console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens: Pick<AuthClient, "idToken" | "refreshToken" | "token">) => {
    console.log('onKeycloakTokens', tokens)
    setCookie(kcTokens,JSON.stringify(tokens))
}

function App() {
    return (
      <ReactKeycloakProvider authClient={keycloak}
                             onEvent={eventLogger}
                             onTokens={tokenLogger}
      >
          <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
              <MyRouter />
          </div>
      </ReactKeycloakProvider>

  );
}

export default App;
