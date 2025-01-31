import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { user, online, logout } = useAuth();
  return (
    <nav className="bg-zinc-700 py-5 flex justify-between px-4">
      <h1>Alicante</h1>
      <div className="flex">
        {online ? (
          <p>Welcomes {user.username}</p>
        ) : (
          <>
            <Link to="/register" className="mx-2">
              Register
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {!online == false && (
          <>
            <Link className="mx-3" to="/add-task">
              Add Task
            </Link>
            <p onClick={() => logout()}>Logout</p>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
