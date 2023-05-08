import React from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";

const LoginPage: React.FC = (): JSX.Element => {
    return (
      <>
        <div className="component-container">
          <h1>Landing Page</h1>
          <Login></Login>
          <Signup/>
        </div>
      </>
    );
  };

  export default LoginPage;