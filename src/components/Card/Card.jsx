import React from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function Card (){
  const navigate = useNavigate();
  return (
    <>
      <div className={style.cardContainer}>
        <div>
          <div className={style.content}>
            <img src="" alt="" />
          </div>
          
          <h2>
            <span>Name</span>
          </h2>
          <h2>
            <span>Description</span>
          </h2>
         
          <button onClick={() => navigate("")}>+</button>
        </div>
      </div>
    </>
  );
};

export default Card;
