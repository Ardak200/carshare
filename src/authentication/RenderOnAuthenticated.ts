import UserService from "../keycloak/UserService";
type ChilderTagProp = {
    children: any
}
const RenderOnAuthenticated = ({children}:ChilderTagProp) => (UserService.isLoggedIn()) ? children : null;

export default RenderOnAuthenticated