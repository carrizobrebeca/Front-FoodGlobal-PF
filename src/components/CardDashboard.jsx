import React from "react";

const CardDashboard = ({ item }) => {
  return (
    <div className="flex items-center gap-4 mb-10 bg-white rounded-l-custom-left">
      <img
        src={item.imagen}
        alt={item.nombre}
        className="w-14 h-14 object-cover rounded-full"
      />

      <div>
        <h2 className="text-gray-500 text-bold">
          {item.nombre} {item.apellido}
        </h2>
        {/* <p className="text-gray-500">
          {item.email} */}
        {/* {new Date(item.createdAt).toLocaleDateString()} */}
        {/* </p> */}
      </div>
    </div>
  );
};

export default CardDashboard;
