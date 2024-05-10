import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./views/home/home";
import Footer from "./views/partials/Footer";
import Header from "./views/partials/Header";
import NotFound from "./views/partials/NotFound";
import DetailsOfBook from "./views/detailsOfBook/detailsOfBook";
import Login from "./views/login/login";
import Register from "./views/register/register";
import ShoppingCart from "./views/shoppingCart/shoppingCart";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <div className="App container">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/book/:id" element={<DetailsOfBook />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/shoppingCart/:userId" element={<ShoppingCart />} exact />
            <Route path="*" element={<NotFound />} exact />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
