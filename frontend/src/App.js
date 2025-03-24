import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReviewListPage from "./pages/ReviewListPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewReportPage from "./pages/ReviewReportPage";
import "./App.css";

const App = () => {
    return ( <
        Router >
        <
        div className = "app-container" > { /* Navigation Bar */ } <
        nav className = "navbar" >
        <
        h2 > Review System < /h2> <
        ul >
        <
        li > < Link to = "/" > Review List < /Link></li >
        <
        li > < Link to = "/review" > Review Page < /Link></li >
        <
        li > < Link to = "/report" > Review Report < /Link></li >
        <
        /ul> <
        /nav>

        { /* Routes */ } <
        Routes >
        <
        Route path = "/"
        element = { < ReviewListPage / > }
        /> <
        Route path = "/review"
        element = { < ReviewPage / > }
        /> <
        Route path = "/report"
        element = { < ReviewReportPage / > }
        /> <
        /Routes> <
        /div> <
        /Router>
    );
};

export default App;