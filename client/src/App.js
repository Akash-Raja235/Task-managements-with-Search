import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIslogin] = useState()
  useEffect(() => {
    setIslogin(sessionStorage.getItem('name'))
  }, [])
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<Login />} />

        <Route path="/user-signup" element={<Signup />} />
        {
          isLogin &&
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        }
        <Route path="/*" element={<ErrorPage />} />



      </Routes>

    </BrowserRouter>

  );
}

export default App;
