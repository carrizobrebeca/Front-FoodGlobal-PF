import React, { useEffect, useState } from "react";
import Cloudinary from "../Cloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { crearNegocio, editNegocio } from "../../store/negociosSlice";
import Header from "../Header";
import SidebarAdmin from "../SidebarAdmin";
const CreateNegocio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allNegocios, setAllNegocios] = useState([]);
  const [selectedNegocioId, setSelectedNegocioId] = useState(""); // Estado para almacenar el ID del negocio seleccionado
  const optionDescripcion = [
    "comida rápida",
    "restaurantes",
    "supermercado",
    "kiosco",
  ];

  // Obtener datos del usuario desde el estado de Redux
  const user = useSelector((state) => state.login.user);

  const fetchNegocios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://back-foodglobal-pf.up.railway.app/negocios");
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

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    usuario_id: "",
    id: "",
    status: "activo"
  });

  const [errors, setErrors] = useState({
    nombre: "*",
    descripcion: "*",
    imagen: "*",
  });

  useEffect(() => {
    fetchNegocios();
    if (user && user.id) {
      setState((prevState) => ({
        ...prevState,
        usuario_id: user.id,
      }));
    }
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

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    validate(
      {
        ...state,
        [e.target.name]: e.target.value,
      },
      e.target.name
    );
  };

  const handleSelectChange =async (e) => {
    e.preventDefault();
    const selectedId = e.target.value;
   
    if (selectedId) {
      try {
        const response = await axios.get(
          `https://back-foodglobal-pf.up.railway.app/negocios/${selectedId}`
        );
        const negocio = response.data;

        // Actualizar el estado con los datos del producto
        setState({
          ...state,
          nombre: negocio.nombre,
          descripcion: negocio.descripcion,
          imagen: negocio.imagen,
          id: negocio.id,
          status: negocio.status,
        });
      } catch (error) {
        console.log("Error");
        
      }
      
    } else {
      setState({
        nombre: "",
        descripcion: "",
        imagen: "",
        usuario_id: user.id,
        id: "" // Resetear negocio_id si no hay selección
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(crearNegocio(state));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (state.id) {
      const negocioData = {
        nombre: state.nombre,
        descripcion: state.descripcion,
        imagen: state.imagen,
        status: state.status,
      };
  
      dispatch(editNegocio({ id: state.id, negocioData }));
    } else {
      alert("Por favor, seleccione un negocio para editarlo");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "ADVERTENCIA: ¿Está seguro que desea eliminar el negocio?"
    );
  
    if (confirmDelete) {
      if (state.id) {
        const negocioData = {
          nombre: state.nombre,
          descripcion: state.descripcion,
          imagen: state.imagen,
          status: state.status,
        };
    
        dispatch(editNegocio({ id: state.id, negocioData }));
      } else {
        alert("Por favor, seleccione un negocio para editarlo");
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };

  const handleImageUpload = (url) => {
    setState((prevState) => ({ ...prevState, imagen: url }));
  };

  const hasErrors = Object.values(errors).some((error) => error === "*");

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
    <SidebarAdmin />
    <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
      <Header />
      
      <section className="">
  
      <div className="flex justify-between bg-gray-300 p-4 rounded-md mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500"
        >
          ❮ Back
        </button>
        <h2 className="text-lg font-bold text-blue-600">
         
        </h2>
      </div>

      <div className="flex justify-around bg-gray-300 p-2 rounded-md mb-4">
        <div className="flex gap-2 mb-2">
          <label className="col-span-1 cursor-pointer text-blue-500">
            Negocio
          </label>
          <select
            onChange={handleSelectChange}
            value={state.id}
            name="id"
            id="id"
            className="col-span-2 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione Negocio</option>
            {allNegocios.map((negocio) => (
              <option key={negocio.id} value={negocio.id}>
                {negocio.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form>
        <div className="flex flex-col md:flex-row bg-gray-200 p-4 rounded-lg mb-4">
          <div className="flex flex-col flex-1 md:mr-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-col justify-between gap-4"></div>
              <label className="w-32">Imagen</label>
              <Cloudinary onImageUpload={handleImageUpload} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <label className="w-32">Imagen URL </label>
              <input
                type="text"
                value={state.imagen}
                name="imagen"
                id="imagen"
                onChange={handleChange}
                className="flex-1 p-2 border rounded-md"
              />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <label className="w-32">Nombre</label>
              <input
                type="text"
                onChange={handleChange}
                name="nombre"
                id="nombre"
                value={state.nombre}
                className="flex-1 p-2 border rounded-md"
              />
              <span className="text-red-500">{errors.nombre}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <label className="w-32">Descripción</label>
              <select
                onChange={handleChange}
                name="descripcion"
                id="descripcion"
                value={state.descripcion}
              >
                <option value="">Seleccione Categoría</option>
                {optionDescripcion.map((opc) => (
                  <option key={opc} value={opc}>
                    {opc}
                  </option>
                ))}
              </select>
              <span className="text-red-500">{errors.descripcion}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-around bg-gray-300 p-4 rounded-md mb-4">
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
            type="button"
            onClick={handleEdit}
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
            type="button"
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
      </section>
      </main>
    </div>
  );
};

export default CreateNegocio;