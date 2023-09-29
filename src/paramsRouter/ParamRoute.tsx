import {Route, RouteComponentProps, RouteProps} from "react-router-dom";
import * as React from "react";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useEffect} from "react";

interface PrivateRouteParams extends RouteProps {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>
}

export function ParamRoute({
                                 component: Component,
                                 ...rest
                             }: PrivateRouteParams) {

    return (
        <Route
            {...rest}
            render={(props,) =>
                    <Component {...props} />
            }
        />
    )
}