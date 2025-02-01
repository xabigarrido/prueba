import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";

function TasksList() {
  const { user } = useAuth();
  const { getTasks, tasks, deleteTask } = useTask();
  useEffect(() => {
    getTasks();
  }, [tasks]);
  return (
    <div className="grid gap-2 grid-cols-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-zinc-800 mt-2 p-3">
          <h1 className="text-2xl text-center">{task.title}</h1>
          <p className="text-gray-300 text-center">{task.description}</p>
          <p className="text-gray-300 text-center">
            {new Date(task.date).toLocaleDateString()}
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                deleteTask(task._id);
              }}
              className="bg-red-500 px-3 py-1 rounded-sm font-bold"
            >
              Delete
            </button>
            <Link
              to={`/tasks/${task._id}`}
              className="bg-yellow-500 px-3 py-1 rounded-sm font-bold"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
      {tasks.length === 0 && <p>No hay tareas</p>}
    </div>
  );
}

export default TasksList;
