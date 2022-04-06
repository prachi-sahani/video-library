import { useState, createContext, useContext } from "react";

const MessageHandlingContext = createContext();

function MessageHandlingProvider({children}){
  const [errorMessage, setErrorMessage] = useState("")

    function showSnackbar(message){
        setErrorMessage(message);
      }
    
    function dismissSnackbar(){
        setErrorMessage("")
      }
    return(
        <MessageHandlingContext.Provider value={{
            showSnackbar,
            dismissSnackbar,
            errorMessage
        }}>
            {children}
        </MessageHandlingContext.Provider>
    )
}

const useMessageHandling = () => useContext(MessageHandlingContext);

export { useMessageHandling, MessageHandlingProvider}