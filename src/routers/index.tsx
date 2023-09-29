import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import {useKeycloak} from "@react-keycloak/web";
import FormStepperAdd from "../containers/PageAddListing1/FormStepperAdd";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { parse, stringify } from 'query-string';
import AccountOrderList from "../containers/AccountPage/AccountOrderList";
import {PrivateRoute} from "../authentication/utils";
import {ToastContainer} from "react-toast";
import AccountRequestList from "../containers/AccountPage/AccountRequestList";
export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome,onlyAuthenticated:false },
  {path:"/cars",exact:true,component:PageHome},
  { path: "/#", exact: true, component: PageHome },
  { path: "/home-1-header-2", exact: true, component: PageHome,onlyAuthenticated:false },
  { path: "/add-listing-1", component: FormStepperAdd,onlyAuthenticated:false,exact:true },
  { path: "/add-listing-1/:id", component: FormStepperAdd,onlyAuthenticated:false },
  //
  { path: "/listing-stay", component: ListingStayPage,onlyAuthenticated:false },
  { path: "/listing-stay-map", component: ListingStayMapPage,onlyAuthenticated:false },
  { path: "/listing-stay-detail", component: ListingStayDetailPage,onlyAuthenticated:false },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage,exact:true},
  { path: "/listing-car-detail/:id", component: ListingCarDetailPage },

  //
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage, onlyAuthenticated:true   },
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists, onlyAuthenticated:true },
  { path: "/account-orderlists", component: AccountOrderList, onlyAuthenticated:true },
  { path: "/account-requests", component: AccountRequestList, onlyAuthenticated:true },
  { path: "/account-billing", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //

  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
  //
];

const Routes = () => {
  const { initialized } = useKeycloak()
  if (!initialized) {
    return <div className="h-screen flex items-center justify-center">Car Share...</div>
  }

  return (
    <BrowserRouter >
      <ScrollToTop />
      <SiteHeader />

      <ToastContainer delay={3000} position={"bottom-right"} />

        <QueryParamProvider adapter={ReactRouter5Adapter} options={{
          searchStringToObject: parse,
          objectToSearchString: stringify,
        }}>
          <Switch>

          {pages.map(({ component, path, exact,onlyAuthenticated = false,params }) => {
          if(onlyAuthenticated != undefined && onlyAuthenticated) {
            return (
                  <PrivateRoute path={path} component={component} exact={!!exact} />
            );
          }  else {
            return (
                <Route
                    key={path}
                    component={component}
                    exact={!!exact}
                    path={path}
                />
            );
          }
        })}
            <Route component={Page404} />
          </Switch>
        </QueryParamProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
