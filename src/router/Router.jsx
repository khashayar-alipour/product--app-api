import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";
import NotFoundPage from "../components/NotFoundPage";

import { getCookie } from "../utils/cookie";
import AuthProvider from "../providers/AuthProvider";

function Router() {
  const token = getCookie("token");
  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthProvider> <HomePage /> </AuthProvider> } />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
