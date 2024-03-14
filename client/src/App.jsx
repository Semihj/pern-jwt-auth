import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {

  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<SignIn/>}/>
  <Route path="/register" element={<SignUp/>}/>
 </Routes>
 </BrowserRouter>
  )
}

export default App
