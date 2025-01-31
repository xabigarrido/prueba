import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { tasks, createTask, getTask, updateTask } = useTask();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });
  return (
    <div className="flex justify-center items-center max-h-screen">
      <form
        className="bg-zinc-800 max-w-md w-full rounded-md mt-2 p-10"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl font-bold">Add Task</h1>
        <input
          type="text"
          placeholder="Title"
          className="bg-white w-full p-2 text-black"
          autoFocus
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500">Titulo requerido</p>}

        <textarea
          placeholder="Description"
          className="bg-white w-full p-2 text-black mt-2"
          rows={3}
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="text-red-500">Description requerida</p>
        )}
        <button className="px-4 py-2 rounded-md bg-green-700">Add</button>
      </form>
    </div>
  );
}

export default TaskForm;
