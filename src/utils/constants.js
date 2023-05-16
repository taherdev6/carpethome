import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Our goal is to ensure that our customers receive garments of high quality and comfortability. ',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: "Whether you're shopping for casual wear or formal attire, you can trust us to deliver garments that look and feel great and that are built to last",
  },
];

export const products_url = '/.netlify/functions/products';

export const single_product_url = `/.netlify/functions/single-product?id=`;

export const auth_url = '/.netlify/functions/auth'