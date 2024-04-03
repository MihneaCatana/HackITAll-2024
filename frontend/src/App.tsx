import "./App.css";
import {Login} from "./pages/Login.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
        <Route path="/homepage" element={<>HOMEPAGE</>} />
            <Route path="/login" element={<Login/>}/>
        <Route path="/test" element={<>TEST</>} />
        <Route path="*" element={<>404 Error</>} />
        </Routes>
    </>
  );
}

export default App;
