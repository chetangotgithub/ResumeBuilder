import React from "react";
import Resume from "./components/Resume";
import "./App.css";
// import Home from './pages/Home'
import Home from "./components/Home";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddForm from "./pages/AddForm";
import UserContext from "./usercontext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <>
      <UserContext>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addDetails" element={<AddForm />} />
            <Route path="/resume/:id" element={<Resume />} />
          </Routes>
        </Router>
      </UserContext>
    </>
  );
};

export default App;
