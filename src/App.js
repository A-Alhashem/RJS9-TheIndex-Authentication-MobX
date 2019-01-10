import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";

// Store
import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/BookStore";

// Our Imports
import Signup from "./forms/SignupForm";
import Login from "./forms/LoginForm";

class App extends Component {
  getView() {
    if (authorStore.loading || bookStore.loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route path="/authors/" component={AuthorsList} />
          <Route path="/books/:bookColor?" component={BookList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      );
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(observer(App));
