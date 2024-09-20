import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logofood.png";
import { fetchLogin } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.login);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "Email no puede estar vacío",
    password: "Password no puede estar vacía",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/dashboard");
    }
  }, [status, navigate]);

  const validate = (state, name) => {
    if (name === "email") {
      setErrors({ ...errors, email: state.email === "" ? "Email no puede estar vacío" : "" });
    }

    if (name === "password") {
      setErrors({ ...errors, password: state.password === "" ? "Password no puede estar vacío" : "" });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    validate({ ...state, [name]: value }, name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(false);
  
    if (!disable()) {
      dispatch(fetchLogin(state))
        .unwrap()
        .then((response) => {
          localStorage.setItem('usuario_id', response.usuario_id); // Guardar el ID de usuario en localStorage
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };


const handleValidateGoogle = (googleCredential) => {
  dispatch(fetchLogin(googleCredential))
    .unwrap()
    .then((response) => {
      localStorage.setItem('usuario_id', response.usuario_id); // Guardar el ID de usuario en localStorage
    })
    .catch((err) => {
      console.error(err);
    });
};
  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };
  
  const handleReset = async () => {
    if (!state.email) {
      alert("Por favor, introduce tu correo electrónico.");
      return;
    }

    try {
      const response = await axios.post(
        "https://back-foodglobal-pf.up.railway.app/reset-password",
        { email: state.email }
      );
      alert(response.data.message); // Mensaje de éxito
    } catch (error) {
      alert(
        error.response?.data.error ||
          "Error al solicitar el restablecimiento de contraseña"
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.campdenbri.co.uk/images/food-cuisine-large.jpg')" }}
    >
      <form onSubmit={handleSubmit} className="bg-[rgba(53,51,50,0.97)] p-6 rounded-xl shadow-md w-96">
        <div className="text-center mb-6">
          <img src={logo} alt="FoodGlobal Logo" className="w-32 h-auto mx-auto animate-pulse" />
          <h1 className="text-xl font-bold text-white">Ingresá para continuar!</h1>
        </div>
        <label className="block text-white">Mail</label>
        <input
          onChange={handleChange}
          name="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />
        {/* <label className="text-red-600 mb-2">{errors.email}</label> */}
        <label className="block text-white">Contraseña</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded mb-6"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={showPassword ? "https://img.icons8.com/ios-filled/50/000000/visible.png" : "https://img.icons8.com/ios-filled/50/000000/invisible.png"}
              alt={showPassword ? "Show" : "Hide"}
              className="w-5 h-5"
            />
          </button>
        </div>
        {/* <label className="text-red-600 mb-4">{errors.password}</label> */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ingresar
        </button>
        <button
          onClick={handleReset}
          className="block text-center underline mt-2 text-white mb-6"
        >
          Olvidó su contraseña?
        </button>

        
        <h5 className="text-center my-4 text-white">o ingrese con</h5>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleValidateGoogle(credentialResponse);
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <p className="text-center mt-4 text-white">
          Al continuar aceptas{" "}
          <Link to="/terms" className="underline text-white">Términos y Condiciones</Link>{" "} |{" "}
          <Link to="/privacy" className="underline text-white">Política de Privacidad</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;