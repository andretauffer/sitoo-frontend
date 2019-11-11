import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Background from "./Views/Background";
import UserManagement from "./Views/UserManagement/UserManagement";
import Manufactorers from "./Views/Manufactorers/Manufactorers";
import Products from "./Views/Products/Products";
import "./App.css";
import "./Views/MainLayout.css";
import Logo from "./images/site-logo.svg";
import Menu from "./Views/Menu";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Background />
        <div className="nav-links">
          <header className="App-header">
            <img src={Logo} alt="logo" className="sitoo-logo" />
            <div className="nav-buttons">
              <div className="option-name"></div>
              <Link id="users-management" to="/">
                <i className="fas fa-users-cog icon"></i>
                <p className="icon-text">/users</p>
              </Link>
              <Link id="manufactorers" to="/manufactorers/">
                <i className="fas fa-industry icon"></i>
                <p className="icon-text">/manufactorers</p>
              </Link>
              <Link id="products" to="/products/">
                <i className="fas fa-boxes icon"></i>
                <p className="icon-text">/products</p>
              </Link>
            </div>
          </header>
        </div>
      </div>
      <Menu />
      <Switch>
        <Route exact path="/" component={UserManagement} />
        <Route path="/manufactorers/" component={Manufactorers} />
        <Route path="/products/" component={Products} />
      </Switch>
    </Router>
  );
}
