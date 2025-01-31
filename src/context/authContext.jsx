import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No tienes context auth");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setOnline(true);
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };
  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setOnline(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setOnline(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const getOnline = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setLoading(false);
        setOnline(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setLoading(false);
          setOnline(false);
          setUser(null);
          return;
        }
        document.cookie = `authToken=${cookies.token}; path=/; domain=https://prueba-bay-eight.vercel.app; SameSite=None; Secure; max-age=3600`;
        setOnline(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setOnline(false);
        setUser(null);
        setLoading(false);
      }
    };
    getOnline();
  }, []);

  return (
    <AuthContext.Provider
      value={{ singup, user, online, errors, singin, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
