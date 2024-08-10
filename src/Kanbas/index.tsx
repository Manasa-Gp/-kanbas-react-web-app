import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import * as client from "./Courses/client";
import { useState,useEffect } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as profile_client from "./Account/client";
import AddCourse from "./Dashboard/AddCourse";


export default function Kanbas() {



  return (
    <Provider store={store}>

  <div id="wd-kanbas" className="h-100">
  <div className="d-flex h-100">
    <div className="d-none d-md-block bg-black" style = {{marginRight:"25px"}}>
      <KanbasNavigation />
    </div>
    <div className="flex-fill">
      <Routes>
      <Route path="/" element={<Navigate to="Dashboard" />} />
      <Route path="/Account/*" element={<Account />} />
      <Route path="Dashboard" element={
                        <ProtectedRoute>
            <Dashboard/>
                            </ProtectedRoute>
              } />
            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses /> </ProtectedRoute>} />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
            <Route path="Courses/Add" element={<AddCourse/>} />
      </Routes>
    </div>
  </div>
</div>
</Provider>
);}


