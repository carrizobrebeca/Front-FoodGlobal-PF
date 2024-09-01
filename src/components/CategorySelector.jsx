import React from 'react';

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-semibold mb-4">Selecciona una Categoría</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <CategoryCard
          image="/images/comida-rapida.jpg" // Asegúrate de tener estas imágenes en tu carpeta public
          title="Comida Rápida"
          onClick={() => onSelectCategory('comida rápida')}
        />
        <CategoryCard
          image="/images/restaurantes.jpg"
          title="Restaurantes"
          onClick={() => onSelectCategory('restaurantes')}
        />
        <CategoryCard
          image="/images/supermercados.jpg"
          title="Supermercados"
          onClick={() => onSelectCategory('supermercado')}
        />
        <CategoryCard
          image="/images/kioscos.jpg"
          title="Kioscos"
          onClick={() => onSelectCategory('kiosco')}
        />
      </div>
    </div>
  );
};

const CategoryCard = ({ image, title, onClick }) => {
  return (
    <div
      className="flex items-center justify-center p-4 border rounded-lg cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url(${image})`, height: '200px' }}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-white bg-black bg-opacity-50 p-2 rounded">{title}</h2>
    </div>
  );
};

export default CategorySelector;
