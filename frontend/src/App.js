import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import User from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
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
