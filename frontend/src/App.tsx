import { Route, Routes } from "react-router-dom";
import Readme from "./pages/Readme";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
function App(){
  return (
    <div>
      <Routes>
        <Route path="/readme" element={<Readme />} />
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
