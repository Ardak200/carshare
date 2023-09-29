//  ######  CustomLink  ######## //
import {DateRage} from "../components/HeroSearchForm/StaySearchForm";
import {orderStatuses} from "../utils/otherDefaultValues.";

export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export type SortParameter =
  | "createdDate" | "priceByDay"
//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface SortTypeList {
  parameter:| "data" | "price-asc" | "price-desc"
}


export interface CitiesMain {
  id:number,
  name:string,
  parent:string,
  child:string
}

export interface CarModule {
  "id":string
  "carModel": string,
  "model": string,
  "carModelName":string,
  "modelName":string,
  "transmission": string,
  "rating": number,
  "priceByDay": number|"",
  "priceByHour": number|"",
  "engineVolume": number|"",
  "numberOfSeats": number,
  "productionYear": number,
  "carBody": string,
  "region": string,
  "city": string,
  "engine": string,
  "rudderLocation": string,
  "driveUnit": string,
  "active": boolean,
  "color":string,
  "description":string,
  "files"?:any[],
  "images"?:CarImageType[] | null | undefined,
  "createdByUser"?:string,
  "phoneNumbers"?:string[],
  "regionName"?:string,
  "cityName"?:string,
  "modifiedByUser"?:string,
  "createdDate"?:string,
  "lastModifiedDate"?:string
}

export type FileImageType = {
  img: []
}

export interface RegionType {
  "id": string,
  "name": string,
  "cities": [
    {
      "id": string,
      "name": string
    }
  ]
}

export interface CityType {
  "id": string,
  "name": string,
}

export interface FileDropType {
  errors: []
  file: File
  id: number
  valid: boolean
}


export type CarParams = {
  id: string;
};

export interface CarSearchParams {
  "parameter"?:string,
  "direction"?:string,
  "page"?:number,
  "size"?:number,
  "transmission":string[]|"",
  "carModels":string[] | "",
  "models":string[] | "",
  "engineVolume":string[]|"",
  "numberOfSeats":string[]|"",
  // "yearFrom":number|"",
  "yearTo":number|"",
  "carBody": string[]|"",
  "engine":string[]|"",
  "rudderLocation":string[]|"",
  // "location":string,
  "driveUnit":string[],
  "color":string[],
}

export interface IdNameProp {
  id:string,
  name:string
}
export interface CarImageType {
  id:string,
  link:string,
  primary:boolean
}

export interface OrderTypeProps {
  "createdDate"?: string,
  "lastModifiedDate"?: string,
  "createdByUser"?: string,
  "modifiedByUser"?: string,
  "id"?: string,
  "orderId"?: string,
  "car": CarModule,
  "fromDate": string,
  "toDate": string,
  "status": orderStatuses
}

export interface KeyCloakTokenType {
  idToken:string,
  refreshToken: string,
  token: string
}

export interface ProfilePhoneNumber {
  userId: string,
  phoneNumber:string,
  code:string
}

export interface UserProfileProp {
  "userId": string,
  "email": string,
  "name": string,
  "address": string,
  "userName": string,
  "phoneNumbers"?:string[]
}