import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//components
import Home from "./components/Home";
import Search from "./components/Search";

const BooksApp = () => {
  return (
    <Router>
      <Route key={"/"} path={"/"} exact={true} component={() => <Home />} />
      <Route
        key={"/search"}
        path={"/search"}
        exact={true}
        component={() => <Search />}
      />
    </Router>
  );
};
export default BooksApp;
