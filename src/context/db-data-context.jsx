import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { dataReducer } from "../reducers/dataReducer";
  
  const DBdataContext = createContext();
  
  function DBdataProvider({ children }) {
  
    const [dataState, dataDispatch] = useReducer(dataReducer, {
      categories: [],
      videos:[]
    });
  
  
    return (
      <DBdataContext.Provider
        value={{
          dataState,
          dataDispatch
        }}
      >
        {children}
      </DBdataContext.Provider>
    );
  }
  
  const useDBdata = () => useContext(DBdataContext);
  
  export { useDBdata, DBdataProvider };
  