import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/Login";
import Register from "./user/Register";
import MadLibList from "./madlib/MadLibList";
import MadLibDetails from "./madlib/MadLibDetails";
import UserMadLibs from "./madlib/UserMadLibs";
import UserDetails from "./user/UserDetails";
import ListUsers from "./user/ListUsers";
import ListTemplates from "./template/ListTemplates";

export default function ApplicationViews({ isLoggedIn, role }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <MadLibList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="madlibdetails/:id" element={<MadLibDetails />} />

          <Route path="mymadlibs" element={isLoggedIn ? <UserMadLibs /> : <Navigate to="/login" />} />

          <Route path="templates">
            <Route index
              element={
                isLoggedIn ? <ListTemplates /> : <Navigate to="/login" />
              } />
          </Route>

          <Route path="users">
            <Route index
              element={isLoggedIn && role === "Admin" ? <ListUsers />
                : <Navigate to="/login" />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};