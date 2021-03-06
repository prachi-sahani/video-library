import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
HomePage,
  Navbar,
  Footer,
  PageNotFound,
  ExplorePage,
  LoginPage,
  SignupPage,
} from "./Components/index";
import { Snackbar } from "./Components/snackbar/Snackbar";
import { useMessageHandling } from "./context/message-handling";
function App() {
  const{errorMessage} = useMessageHandling()
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/explore/*" element={<ExplorePage />}></Route>
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
      {errorMessage &&  <Snackbar />}
      <Footer />
    </div>
  );
}

export default App;
