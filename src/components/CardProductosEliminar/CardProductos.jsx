import React from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function CardProductos({ product }) { 
  const navigate = useNavigate();
console.log(product);

  return (
    <div className={style.cardContainer}>
      <div className={style.content}>
        <div className={style.imgContainer}>
          {/* <img
            src={product.imagen || "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}
            alt={user.nombre}
          /> */}
        </div>
        <h2>
          <span>{product.nombre}</span>
        </h2>
        <h2>
          <span>{product.precio}</span>
        </h2>
        <button onClick={() => navigate(`/`)}>+</button>
      </div>
    </div>
  );
}

export default CardProductos;
