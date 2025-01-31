import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProteccionRoute from "./Proteccion";
import NavBar from "./components/NavBar";
import TasksList from "./pages/TasksList";
import TaskForm from "./pages/TaskForm";
function App() {
  return (
    <BrowserRouter>
      <main className="container content-container mx-auto px-10 md:px-0">
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>HomePage</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProteccionRoute />}>
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskForm />} />
            <Route path="/profile" element={<h1>profile</h1>} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
