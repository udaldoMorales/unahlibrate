import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./index.css";

const Label = () => {
    return <label>¿No tienes aun cuenta?  <Link  to="/" >Registrate</Link> </label>;
};

export default Label;
