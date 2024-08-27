import React from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function Card({ user }) { 
  const navigate = useNavigate();

  return (
    <div className={style.cardContainer}>
      <div className={style.content}>
        <div className={style.imgContainer}>
          <img
            src={user.imagen || "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}
            alt={user.nombre}
          />
        </div>
        <h2>
          <span>{user.nombre}</span>
        </h2>
        <h2>
          <span>{user.apellido}</span>
        </h2>
        <button onClick={() => navigate(`/user/${user.id}`)}>+</button>
      </div>
    </div>
  );
}

export default Card;
