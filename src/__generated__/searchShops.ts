/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchShops
// ====================================================

export interface searchShops_searchShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface searchShops_searchShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: (searchShops_searchShops_photos | null)[] | null;
}

export interface searchShops {
  searchShops: (searchShops_searchShops | null)[] | null;
}

export interface searchShopsVariables {
  keyword: string;
  lastId?: number | null;
}
