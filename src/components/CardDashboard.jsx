import React from "react";

const CardDashboard = ({ item }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <img
        src={item.imagen ||
          "https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}
        alt={item.nombre}
        className="w-10 h-10 object-cover rounded-full"
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
