import React, { useEffect, useState } from "react";
import Cloudinary from "../Cloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { crearNegocio, editNegocio} from "../../store/negociosSlice";

const CreateNegocio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allNegocios, setAllNegocios] = useState([]);
  const optionStatus = ["activo", "bloqueado", "eliminado"];
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

  useEffect(() => {
    fetchNegocios();
    if (user && user.id) {
      setState((prevState) => ({
        ...prevState,
        usuario_id: user.id,
      }));
    }
  }, [user]);

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    usuario_id: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    nombre: "*",
    descripcion: "*",
    imagen: "*",
   
  });

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

    if (
      e.target.name === "nombre" ||
      e.target.name === "descripcion" ||
      e.target.name === "usuario_id" ||
      e.target.name === "status" ||
      e.target.name === "imagen"
    ) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }

    validate(
      {
        ...state,
        [e.target.name]: e.target.value,
      },
      e.target.name
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.id) {

      dispatch(editNegocio({ id: state.usuario_id, negocioData: state }))
     
    } else{
      dispatch(crearNegocio(state));
    }
    
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "ADVERTENCIA: ELIMINACION PERMANENTE DEL Negocio ¿Estás seguro de que deseas eliminar este Negocio?"
    );

    if (confirmDelete) {
      if (state.id) {
        // dispatch(deleteProductos(state.id));
      } else {
        alert("Por favor, ingrese un ID del negocio para eliminar");
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
    <div className="bg-gray-100 p-12">
      <div className="flex justify-between bg-gray-300 p-4 rounded-md mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500"
        >
          ❮ Back
        </button>
        <h2 className="text-lg font-bold text-blue-600">Negocio</h2>
      </div>

      <div className="flex justify-around bg-gray-300 p-2 rounded-md mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Buscar usuario por email"
            value={state.email}
            onChange={handleChange}
            name="email"
            id="email"
            className="flex-1 p-2 border rounded-md"
          />
          <button type="button" className="">
            &#128269;
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row bg-gray-200 p-4 rounded-lg mb-4">
          <div className="flex flex-col flex-1 md:mr-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-col justify-between gap-4"></div>
              <label className="w-32">Foto</label>
              <Cloudinary onImageUpload={handleImageUpload} />
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
                //{" "}
              </select>
              <span className="text-red-500">{errors.descripcion}</span>
            </div>
          </div>
        </div>
      </form>
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
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6" // Cambiado a className para la compatibilidad de JSX
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <span>Borrar Negocio</span>
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
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6" // Cambiado a className para la compatibilidad de JSX
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Crear
        </button>
      </div>
    </div>
    // <div>

    //     <div className="flex h-full bg-gray-100 m-10">
    //       <div className="m-auto">
    //         <div>
    //           <div className="mt-5 bg-white rounded-lg shadow">
    //             <div className="flex">
    //               <div className="flex-1 py-5 pl-5 overflow-hidden">
    //                 <button onClick={() => navigate("/dashboard")}>
    //                   ❮ Back
    //                 </button>
    //               </div>
    //             </div>
    //             <div className="flex">
    //               <div className="flex-1 py-5 pl-5 overflow-hidden">
    //                 <h1 className="inline text-2xl font-semibold leading-none">
    //                   Negocio
    //                 </h1>
    //               </div>
    //             </div>

    //             <div className="flex">
    //               <div className="flex-1 py-5 pl-5 overflow-hidden">
    //                 <h2 className="inline text-2xl font-semibold leading-none">
    //                   Crear - Editar - Eliminar
    //                 </h2>
    //               </div>
    //               <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
    //             </div>

    //             <div className="px-5 pb-5">
    //               <div className="flex items-center">
    //                 <div className="flex-1">
    //                   <input
    //                     placeholder="Nombre"
    //                     name="nombre"
    //                     id="nombre"
    //                     onChange={handleChange}
    //                     className="text-black placeholder-gray-600 w-full px-4 py-2.5 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:text-white focus:bg-gray-700 dark:focus:bg-gray-800 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
    //                   />
    //                 </div>
    //                 <label className="ml-3 text-red-500">{errors.nombre}</label>
    //               </div>

    //               <Cloudinary onImageUpload={handleImageUpload} />

    //               <div className="flex items-center">
    //                 <div className="flex-1">
    //                   <input
    //                     type="text"
    //                     value={state.imagen}
    //                     name="imagen"
    //                     id="imagen"
    //                     onChange={handleChange}
    //                     placeholder="URL de la imagen"
    //                     className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:text-white focus:bg-gray-700 dark:focus:bg-gray-800 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
    //                   />
    //                 </div>
    //                 {/* <label className="ml-3 text-red-500">{errors.imagen}</label> */}
    //               </div>

    //               <div className="flex items-center">
    //                 <div className="flex-1">
    //                   <select
    //                     onChange={handleChange}
    //                     name="descripcion"
    //                     id="descripcion"
    //                     value={state.descripcion}
    //                   >
    //                     <option value="">Seleccione Categoría</option>
    //                     {optionDescripcion.map((opc) => (
    //                       <option key={opc} value={opc}>
    //                         {opc}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 </div>
    //                 <label className="ml-3 text-red-500">
    //                   {errors.descripcion}
    //                 </label>
    //               </div>

    //               <div className="flex">
    //                 <div className="flex items-center">
    //                   <div className="flex-1">
    //                     <input
    //                       name="usuario_id"
    //                       id="usuario_id"
    //                       onChange={handleChange}
    //                       placeholder="Usuario ID"
    //                       value={state.usuario_id}
    //                       className="text-black placeholder-gray-600 w-full px-4 py-2.5 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:text-white focus:bg-gray-700 dark:focus:bg-gray-800 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
    //                       readOnly
    //                     />
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="flex">
    //                 <div className="flex items-center">
    //                   <div className="flex-1">
    //                     <select

    //                       name="status"
    //                       id="status"
    //                       value={state.status}
    //                       // onChange={handleChange}
    //                     >
    //                       <option value="">Seleccione Estado</option>
    //                       {optionStatus.map((opc) => (
    //                         <option key={opc} value={opc}>
    //                           {opc}
    //                         </option>
    //                       ))}
    //                     </select>
    //                   </div>
    //                   <label className="ml-3 text-red-500">
    //                     {errors.status}
    //                   </label>
    //                 </div>
    //               </div>
    //               {hasErrors && (
    //                 <div className="flex items-center py-5 pl-5">
    //                   <label className="text-red-500">
    //                     Campos requeridos *
    //                   </label>
    //                 </div>
    //               )}
    //             </div>
    //             <hr className="mt-4" />
    //             <div className="flex flex-row p-3">
    //               <div className="flex-initial pl-3">
    //                 <button
    //                   type="submit"
    //                   onClick={handleSubmit}
    //                   className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-orange-600 rounded-md hover:bg-orange-200 hover:fill-current hover:text-orange-600 focus:outline transition duration-300 transform active:scale-95 ease-in-out"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     height="24px"
    //                     viewBox="0 0 24 24"
    //                     width="24px"
    //                     fill="#b86826"
    //                   >
    //                     <path d="M0 0h24v24H0V0z" fill="none"></path>
    //                     <path
    //                       d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
    //                       opacity=".3"
    //                     ></path>
    //                     <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
    //                   </svg>
    //                   <span className="pl-2 mx-1">Crear</span>
    //                 </button>
    //               </div>

    //               <div className="flex-initial pl-3">
    //                 <button
    //                   type="button"
    //                   className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-green-600 rounded-md hover:bg-green-200 hover:fill-current hover:text-green-600 focus:outline transition duration-300 transform active:scale-95 ease-in-out"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     height="24px"
    //                     viewBox="0 0 24 24"
    //                     width="24px"
    //                     fill="#1a3818"
    //                   >
    //                     <path d="M0 0h24v24H0V0z" fill="none"></path>
    //                     <path
    //                       d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
    //                       opacity=".3"
    //                     ></path>
    //                     <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
    //                   </svg>
    //                   <span className="pl-2 mx-1">Guardar</span>
    //                 </button>
    //               </div>

    //               <div className="flex-initial">
    //                 <button
    //                   type="button"
    //                   className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md hover:bg-red-200 hover:fill-current hover:text-red-600 focus:outline transition duration-300 transform active:scale-95 ease-in-out"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     height="24px"
    //                     viewBox="0 0 24 24"
    //                     width="24px"
    //                   >
    //                     <path d="M0 0h24v24H0V0z" fill="none"></path>
    //                     <path d="M8 9h8v10H8z" opacity=".3"></path>
    //                     <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
    //                   </svg>
    //                   <span className="pl-2 mx-1">Borrar</span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    // </div>
  );
};

export default CreateNegocio;
