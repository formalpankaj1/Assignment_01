import { Route, Routes } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Auth/Register";
import './style.css';
import Profile from "./Components/Profile/Profile.js";

function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact={true}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>

    </div>
  );
}

export default App;
