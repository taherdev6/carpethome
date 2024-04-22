import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "service_heading_1",
    text: "service_text_1",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "service_heading_2",
    text: "service_text_2",
  },
];

export const products_url = "/.netlify/functions/products";

export const single_product_url = `/.netlify/functions/single-product?id=`;

export const auth_url = "/.netlify/functions/auth";
