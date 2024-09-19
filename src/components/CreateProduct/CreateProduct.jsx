import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../Cloudinary";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewProducts,
  deleteProductos,
  editproducto,
} from "../../store/productosSlice";
import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const [allNegocios, setAllNegocios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [negocioId, setNegocioId] = useState("");
  const optionStatus = ["bloqueado", "eliminado", "activo"];
  const handleNegocioChange = (e) => {
    setNegocioId(e.target.value);
  };

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/negocios");
        const negocios = response.data;

        // Filtrar negocios que pertenecen al usuario
        const userNegocios = negocios.filter(
          (negocio) => negocio.usuario_id === user.id
        );

        setAllNegocios(userNegocios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocios();
  }, [user]);

  useEffect(() => {
    const fetchProductos = async () => {
      if (negocioId) {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `http://localhost:3001/negocios/${negocioId}/productos`
          );
          const productosData = response.data;

          setProductos(productosData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductos();
  }, [negocioId]);

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    negocio_id: "",
    imagen: "",
    categoria: "",
    stock: "",
    id: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    nombre: "*",
    descripcion: "*",
    precio: "*",
    negocio_id: "*",
    categoria: "*",
    stock: "*",
    imagen: "*",
  });

  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:3001/negocios"
      );
      const negocios = response.data;

      // Filtrar negocios que pertenecen al usuario
      const userNegocios = negocios.filter(
        (negocio) => negocio.usuario_id === user.id
      );

      setAllNegocios(userNegocios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
  }, [user]);

  const validate = (state, name) => {
    let newErrors = { ...errors };
    if (name === "nombre") {
      newErrors.nombre = state.nombre === "" ? "*" : "";
    }
    if (name === "descripcion") {
      newErrors.descripcion = state.descripcion === "" ? "*" : "";
    }
    if (name === "imagen") {
      newErrors.imagen = state.imagen === "" ? "*" : "";
    }
    if (name === "stock") {
      newErrors.stock = state.stock === "" ? "*" : "";
    }
    if (name === "negocio_id") {
      newErrors.negocio_id = state.negocio_id === "" ? "*" : "";
    }
    if (name === "precio") {
      newErrors.precio = state.precio === "" ? "*" : "";
    }
    if (name === "categoria") {
      newErrors.categoria = state.categoria === "" ? "*" : "";
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validate(
      {
        ...state,
        [name]: value,
      },
      name
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.id) {
      dispatch(editproducto({ id: state.id, productData: state }));
    } else {
      dispatch(fetchNewProducts(state));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "ADVERTENCIA: ELIMINACION DEL PRODUCTO \n¿Estás seguro de que deseas eliminar este producto? \n\nSi desea restablecerlo dirijase a la vista anterior: Configuración de Productos"
    );

    // Si el usuario confirma, proceder con la eliminación
    if (confirmDelete) {
      if (state.id) {
        // Crear una copia del estado y actualizar el campo 'status' a 'eliminado'
        const updatedProductData = {
          ...state,
          status: "eliminado",
        };

        // Despachar la acción con los datos actualizados
        dispatch(
          editproducto({ id: state.id, productData: updatedProductData })
        );
      } else {
        alert("Por favor, seleccione producto para eliminar");
      }
    } else {
      // Si el usuario cancela, no hacer nada
      console.log("Eliminación cancelada");
    }
  };

  const handleImageUpload = (url) => {
    setState((prevState) => ({ ...prevState, imagen: url }));
    
  };
  const handleInfo = (e) => {
    e.preventDefault();
    alert("Modificar Producto: \n\n1) Seleccione el negocio al cual pertenece dicho producto. \n2) Seleccione el producto a editar. \n3)Complete solo los campos que desea modificar o actualizar. \n4)Presione botón editar.\n\nCrear Producto: \nAsegurese de crear un negocio antes de intentar crear un producto.\nComplete TODOS los campos. \nPresione boton Crear" )
  };
  const handleProductChange = async (e) => {
    const selectedProductId = e.target.value;

    if (selectedProductId) {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:3001/productos/${selectedProductId}`
        );
        const producto = response.data;

        // Actualizar el estado con los datos del producto
        setState({
          ...state,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          negocio_id: producto.negocio_id,
          imagen: producto.imagen,
          categoria: producto.categoria,
          stock: producto.stock,
          id: producto.id,
          status: producto.status,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Limpiar el estado si no se selecciona ningún producto
      setState({
        nombre: "",
        descripcion: "",
        precio: "",
        negocio_id: "",
        imagen: "",
        categoria: "",
        stock: "",
        id: "",
        status: "",
      });
    }
  };

  const hasErrors = Object.values(errors).some((error) => error === "*");

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
        <Header />

        <section className="">
     
          <div className="bg-gray-100 p-12">
            <div className="flex justify-between bg-gray-300 p-4 rounded-md mb-4">
              <button
                onClick={() => navigate("/products")}
                className="text-blue-600"
              >
                ❮ Back
              </button>
              <h2 className="text-lg text-blue-600 font-bold">Producto</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row bg-gray-200 p-4 rounded-lg mb-4">
                <div className="flex flex-col flex-1 md:mr-5">
                  <div className="flex gap-2 mb-2">
                    
                    <select
                      onChange={handleNegocioChange}
                      value={negocioId}
                      name="negocio_id"
                      id="negocio_id"
                      className="col-span-2 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="" className="text-blue-500">
                        Seleccione su negocio
                      </option>
                      {allNegocios.map((negocio) => (
                        <option key={negocio.id} value={negocio.id}>
                          {negocio.nombre}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={handleProductChange}
                      value={state.id}
                      name="id"
                      id="id"
                      className="col-span-2 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="" className="text-blue-500">
                        Seleccione producto a editar
                      </option>
                      {productos?.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                    
                    <button
                          className="col-span-1 flex items-center justify-center text-red-600"
                          title="Info"
                          onClick={handleInfo}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                            />
                          </svg>
                        </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label>Imagen</label>
                    <Cloudinary onImageUpload={handleImageUpload} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Imagen URL</label>
                    <input
                      type="text"
                      value={state.imagen}
                      name="imagen"
                      id="imagen"
                      onChange={handleChange}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.imagen}</label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Nombre</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="nombre"
                      id="nombre"
                      value={state.nombre} // Asegúrate de que el valor esté correctamente vinculado
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.nombre}</label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Descripción</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="descripcion"
                      id="descripcion"
                      value={state.descripcion} // Asegúrate de que el valor esté correctamente vinculado
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.descripcion}</label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Precio</label>
                    <input
                      type="number"
                      step="any"
                      onChange={handleChange}
                      name="precio"
                      id="precio"
                      value={state.precio} // Asegúrate de que el valor esté correctamente vinculado
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.precio}</label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Categoría</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="categoria"
                      id="categoria"
                      value={state.categoria} // Asegúrate de que el valor esté correctamente vinculado
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.categoria}</label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Stock</label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="stock"
                      id="stock"
                      value={state.stock} // Asegúrate de que el valor esté correctamente vinculado
                      className="flex-1 p-2 border rounded-md"
                    />
                    <label className="text-red-500">{errors.stock}</label>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <label className="w-32">Negocio </label>
                    <select
                      onChange={handleChange}
                      name="negocio_id"
                      id="negocio_id"
                      value={state.negocio_id}
                      className="flex-1 p-2 border rounded-md"
                    >
                      <option value="">Seleccione Negocio</option>
                      {allNegocios.map((opc) => (
                        <option key={opc.id} value={opc.id}>
                          {opc.nombre}
                        </option>
                      ))}
                    </select>
                    <label className="text-red-500">{errors.negocio_id}</label>
                  </div>

                  {hasErrors && (
                    <div className="text-red-500 py-5 pl-5">
                      Campos requeridos *
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 p-2 rounded-md text-white flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span>Borrar</span>
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 p-2 rounded-md text-white flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  Editar
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-500 p-2 rounded-md text-white flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Crear
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateProduct;
