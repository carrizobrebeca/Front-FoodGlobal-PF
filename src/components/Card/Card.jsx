import React from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div className={style.cardContainer}>
      <div className={style.content}>
        <div className={style.imgContainer}>
          <img src={item.imagen} alt={item.nombre} />
        </div>
        <h2>
          <span>{item.nombre}</span>
        </h2>
        <h2>
          <span>{item.apellido}</span>
        </h2>
        <button onClick={() => navigate(`/user/${item.id}`)}>+</button>
      </div>
    </div>
  );
}

export default Card;
