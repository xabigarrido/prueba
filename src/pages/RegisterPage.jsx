import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, online, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (online) {
      navigate("/tasks");
    }
  }, [online]);
  const onSubmit = handleSubmit((values) => {
    singup(values);
  });
  return (
    <div className="bg-zinc-900 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        {registerErrors.map((error, i) => (
          <p className="text-red-800" key={i}>
            {error}
          </p>
        ))}
        <input
          className="py-2 bg-zinc-700 text-white px-4 mt-2 w-full rounded-md"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <p className="text-red-500">usernamee requerido</p>}
        <input
          className="py-2 bg-zinc-700 text-white px-4 mt-2 w-full rounded-md"
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-500">Email requerido</p>}

        <input
          className="py-2 bg-zinc-700 text-white px-4 mt-2 w-full rounded-md"
          type="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="text-red-500">password requerido</p>}

        <button className="px-4 bg-green-800 py-2 mt-2 rounded-md hover:bg-green-700">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
