import React from 'react';
import image1 from '../assets/images/fastfood.png';
import image2 from '../assets/images/Kioscos.png';
import image3 from '../assets/images/supermercado.png';
import image4 from '../assets/images/restaurantes.png';
const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-semibold mb-4">Selecciona una Sección</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <CategoryCard
          image={image1} // Asegúrate de tener estas imágenes en tu carpeta public
          title="Comida Rápida"
          onClick={() => onSelectCategory('comida rápida')}
        />
        <CategoryCard
          image={image4}
          title="Restaurantes"
          onClick={() => onSelectCategory('restaurantes')}
        />
        <CategoryCard
          image={image3}
          title="Supermercados"
          onClick={() => onSelectCategory('supermercado')}
        />
        <CategoryCard
          image={image2}
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
    
    </div>
  );
};

export default CategorySelector;
