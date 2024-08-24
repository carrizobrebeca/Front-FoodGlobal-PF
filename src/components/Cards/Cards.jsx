import React from "react";

import style from "./cards.module.css"
import Card from "../Card/Card";
function Cards () {
  return (
    <div className={style.container}>
      <Card />
      <Card /> 
      <Card /> 
      
    </div>
  );
};

export default Cards;
