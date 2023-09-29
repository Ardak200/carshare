import UserService from "../keycloak/UserService";
import {ComponentType} from "react";

const RenderOnAnonymous = (children:ComponentType<Object>) => (!UserService.isLoggedIn()) ? children : null;

export default RenderOnAnonymous