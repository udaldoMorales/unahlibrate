import React from "react";
import {
  MdHome,
  MdShoppingBasket,
  MdExitToApp,
  MdAddShoppingCart, 
} from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { FaExchangeAlt, FaShoppingBag } from "react-icons/fa";
import { logout } from "../modules/helper";

const items = [
  {
    name: "home",
    label: "Inicio",
    icon: <MdHome size={30} />,
    link: "/portal/",
  },
  {
    name: "requests",
    label: "Pedidos",
    icon: <FaShoppingBag size={30} />,
    link: "/portal/requests-summary",
  },

  {
    name: "addPurchase",
    label: "Compras",
    icon: <MdAddShoppingCart size={30} />,
    link: "/portal/purchases-request",
  },
  {
    name: "referrals",
    label: "Remisiones",
    icon: <FaExchangeAlt size={30} />,
    link: "/portal/referrals",
  },


  {
    name: "inventory",
    label: "Inventario",
    icon: <GoPackage size={30} />,
    link: "/portal/inventory",
  },
  {
    name: "logout",
    label: "Cerrar sesion",
    icon: <MdExitToApp size={30} />,
    onClick: logout,
  },
];

export default items;
