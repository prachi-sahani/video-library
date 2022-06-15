import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

 export const categories = [
  {
    _id: uuid(),
    categoryName: "Cakes",
    categoryIdentity:"CAKES",
    image:"assets/category-cake.webp",
  },
  {
    _id: uuid(),
    categoryName: "Pastries and Cupcakes",
    categoryIdentity:"PASTRIES",
    image:"assets/category-cupcakes.webp"
  },
  {
    _id: uuid(),
    categoryName: "Brownies and Dry Cakes",
    categoryIdentity:"BROWNIES",
    image: "assets/category-brownies.webp"
  },
  {
    _id: uuid(),
    categoryName: "Chocolates",
    categoryIdentity:"CHOCOLATES",
    image:"assets/category-chocolates.webp"
  },
  {
    _id: uuid(),
    categoryName: "Cookies",
    categoryIdentity:"COOKIES",
    image: "assets/category-cookies.webp"
  },
  {
    _id: uuid(),
    categoryName: "Donuts",
    categoryIdentity:"DONUTS",
    image:"assets/category-donuts.webp"
  },
  {
    _id: uuid(),
    categoryName: "Breads",
    categoryIdentity:"BREADS",
    image:"assets/category-breads.webp"
  }
];