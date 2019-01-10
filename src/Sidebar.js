import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";

// my imports
import AuthStore from "./stores/AuthStore";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
          {!AuthStore.user ? (
            <h4 className="menu-item">
              <NavLink to="/login">LOGIN</NavLink>
            </h4>
          ) : (
            <h4 className="menu-item">
              <button class="btn btn-danger" onClick={() => AuthStore.logout()}>
                LOGOUT
              </button>
            </h4>
          )}
        </section>
      </div>
    );
  }
}

export default observer(Sidebar);
