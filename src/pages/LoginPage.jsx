import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, errors: loginErrors, online } = useAuth();
  console.log(online);
  const navigate = useNavigate();
  useEffect(() => {
    if (online) {
      navigate("/tasks");
    }
  }, [online]);
  const onSubmit = handleSubmit((values) => {
    singin(values);
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded-md">
        <form className="  p-10  bg-zinc-800 " onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Login</h1>
          {loginErrors.map((error, i) => {
            return (
              <div key={i} className="bg-red-400 p-2 rounded-md my-2">
                <p className="font-black">{error}</p>
              </div>
            );
          })}
          <input
            className="bg-white w-full p-2 text-black mb-2"
            type="text"
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-600">E-mail is required</p>}
          <input
            className="bg-white w-full p-2 text-black mb-2"
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-600">Password is required</p>
          )}

          <button className="bg-green-800 py-2 px-3 rounded-md font-bold w-full hover:bg-green-700">
            Access
          </button>
          <div className="bg-blue-800 py-2 px-3 rounded-md font-bold w-full text-center mt-2 hover:bg-blue-700">
            <Link to="/register">Crear Cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
