import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import User from "./Pages/User";
import Header from "./Pages/Header";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
