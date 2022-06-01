import { useContext, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, signup } from "../utilities/server-request/server-request";
import { useMessageHandling } from "./message-handling";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("token") || ""
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoadingLoginAsGuest, setIsLoadingLoginAsGuest] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const { showSnackbar } = useMessageHandling();
  async function loginAsGuest() {
    try {
      setIsLoadingLoginAsGuest(true);
      // default credentials
      const data = {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
      };
      const token = await login(data);
      setIsLoadingLoginAsGuest(false);
      setAuthToken(token.data.encodedToken);
      sessionStorage.setItem(
        "token",
        token.data.encodedToken ? token.data.encodedToken : ""
      );
      const lastRoute = location?.state?.from?.pathname || "/";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingLoginAsGuest(false);
      showSnackbar(
        err?.response
          ? err.response.data.errors[0]
          : "Some error occurred. Try again!"
      );
    }
  }
  async function loginUser(email, password) {
    try {
      setIsLoadingLoginUser(true);
      const data = {
        email,
        password,
      };
      const token = await login(data);
      setIsLoadingLoginUser(false);
      setAuthToken(token.data.encodedToken);
      localStorage.setItem("token", token.data.encodedToken);
      const lastRoute = location?.state?.from?.pathname || "/";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingLoginUser(false);
      showSnackbar(
        err?.response
          ? err.response.data.errors[0]
          : "Some error occurred. Try again!"
      );
    }
  }

  async function signupUser(data) {
    try {
      setIsLoadingSignup(true);
      const token = await signup(data);
      setIsLoadingSignup(false);
      setAuthToken(token.data.encodedToken);
      localStorage.setItem("token", token.data.encodedToken);
      const lastRoute = location?.state?.from?.pathname || "/";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingSignup(false);
      showSnackbar(
        err?.response
          ? err.response.data.errors[0]
          : "Some error occurred. Try again!"
      );
    }
  }
  function logout() {
    sessionStorage.setItem("token", "");
    setAuthToken("");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        loginAsGuest,
        logout,
        isLoadingLoginAsGuest,
        loginUser,
        isLoadingLoginUser,
        signupUser,
        isLoadingSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
