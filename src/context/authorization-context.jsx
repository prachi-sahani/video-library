import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utilities/server-request/server-request";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("token") || "");
  const navigate =  useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  async function loginAsGuest() {
      try{
        setIsLoading(true)
        // default credentials
        const data = {
          email: "adarshbalika@gmail.com",
          password: "adarshBalika123"
        }
        const token = await login(data);
        setIsLoading(false)
        const lastRoute = localStorage.getItem("lastRoute");
        setAuthToken(token.data.encodedToken);
        sessionStorage.setItem("token", token.data.encodedToken ? token.data.encodedToken : "")
        localStorage.setItem("lastRoute","/")
        navigate(lastRoute ? lastRoute : "/")
      }
      catch(err){
        setIsLoading(false)
          console.log(err)
      }
  }
  function logout(){
    sessionStorage.setItem("token","")
    setAuthToken("");
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ authToken, loginAsGuest, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
