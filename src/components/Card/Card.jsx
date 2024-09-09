import React from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-1 bg-gradient-to-tr hover:bg-gradient-to-l from-gray-300 to-gray-100 shadow-xl rounded-lg text-gray-200">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            classNameName="object-cover object-top w-full"
            src="https://cdn.savageuniversal.com/media/catalog/product/cache/1e202d28d8edf998f177b5b7593fcd58/b/a/backgrounds-savage-vinyl-backgrounds-sa-v01-01.jpg"
            alt="Card"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={item.imagen}
            alt={item.nombre}
          />
        </div>
        <div className="text-center">
          <h2 className="text-gray-500">{item.nombre} {item.apellido}</h2>
         
        </div>
      
        <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-blue-600 hover:shadow-lg font-semibold text-white px-6 py-2" onClick={() => navigate(`/user/${item.id}`)}>
            Detail
          </button>
        </div>
      </div>
    </div>
    // <div className={style.cardContainer}>
    //   <div className={style.content}>
    //     <div className={style.imgContainer}>
    //       <img src={item.imagen} alt={item.nombre} />
    //     </div>
    //     <h2>
    //       <span>{item.nombre}</span>
    //     </h2>
    //     <h2>
    //       <span>{item.apellido}</span>
    //     </h2>
    //     <button onClick={() => navigate(`/user/${item.id}`)}>+</button>
    //   </div>
    // </div>
  );
}

export default Card;
