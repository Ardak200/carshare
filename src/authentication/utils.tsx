import * as React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'
import {useCallback, useEffect} from "react";
import {setCookie} from "typescript-cookie";
import {kcTokens} from "../App";

interface PrivateRouteParams extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
}

export function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteParams) {
    useEffect(() => {
        // window.location.reload();
    },[localStorage.getItem("keycloak-tokens")])
  const { keycloak } = useKeycloak()
    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])
    useEffect(() => {
        if(!keycloak.authenticated) {
            keycloak.login();
            const tokens = {
                idToken: keycloak.idToken,
                refreshToken:keycloak.refreshToken,
                token:keycloak.token
            }

            setCookie(kcTokens,JSON.stringify(tokens))
        }
    },[])
  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : null
      }
    />
  )
}
