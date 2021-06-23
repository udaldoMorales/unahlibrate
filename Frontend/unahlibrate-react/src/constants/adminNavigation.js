import React from "react";
import { MdHome, MdExitToApp } from "react-icons/md";
import { logout } from "../modules/helper";
import { IoIosPerson } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { FaTruckMoving } from 'react-icons/fa'

const items = [
  {
    name: "home",
    label: "Inicio",
    icon: <MdHome size={30} />,
    link: "/admin",
  },
  {
    name: "employees",
    label: "Empleados",
    icon: <IoIosPerson size={30} />,
    link: "/admin/formulario-empleado",
  },
  {
    name: "products",
    label: "Productos",
    icon: <FiPackage size={30} />,
    link: "/admin/lista-productos",
  },
  {
    name: "providers",
    label: "Proveedores",
    icon: <FaTruckMoving size={30} />,
    link: "/admin/formulario-proveedores",
  },
  {
    name: "logout",
    label: "Cerrar sesion",
    icon: <MdExitToApp size={30} />,
    onClick: logout,
  },
];

export default items;
