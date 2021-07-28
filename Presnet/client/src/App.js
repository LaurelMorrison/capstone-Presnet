import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Spinner } from "reactstrap";
import Header from "./components/Nav/Header";
import Footer from "./components/Nav/Footer";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <Router>
        <Header isLoggedIn={isLoggedIn} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
        {/* <Footer isLoggedIn={isLoggedIn} /> */}
    </Router>
  );
}

export default App;