import React from "react";

const CardsProducts = ({ item }) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 items-center gap-4 mb-4">
        <div className="col-span-2 flex items-center gap-4">
          <img
             src={item.imagen}
             alt={item.nombre}
            className="w-14 h-14 object-cover rounded-xl"
          />
          <div>
            <h3 className="font-bold">{item.nombre}</h3>
            
            <p className="text-gray-500">{item.categoria}</p>
          </div>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
           {item.status}
          </span>
        </div>
        
      </div>
    </>
  );
};

export default CardsProducts;
