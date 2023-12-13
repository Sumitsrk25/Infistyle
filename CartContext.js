import React, { createContext, useState } from "react";
import { getProduct } from "./services/ProductService.js";

export const CartContext = createContext();

export function CartProvider(props) {
  function addItemToCart() {}

  function getItemsCount() {}

  function getTotalPrice() {}

  return {};
}
