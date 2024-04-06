import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/navbar/Navbar.tsx";
import CreateSpace from "./pages/CreateSpace.tsx";
import {Login} from "./pages/Login.tsx";
import {Subscription} from "./pages/Subscription.tsx";
import {Management} from "./pages/Management.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<Navbar/>}>
                    <Route path="/homepage" element={<>HOMEPAGE</>}/>
                    <Route path="/test" element={<>TEST</>}/>
                    <Route path="/management" element={<Management/>}/>
                    <Route path="/create-space" element={<CreateSpace/>} />
                    <Route path="/subscription" element={<Subscription/>}/>
                    <Route path="*" element={<>404 Error</>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
