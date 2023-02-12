import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/Login";
import Register from "./user/Register";
import MadLibList from "./madlib/MadLibList";
import MadLibDetails from "./madlib/MadLibDetails";
import UserMadLibs from "./madlib/UserMadLibs";
import UserDetails from "./user/UserDetails";
import ListUsers from "./user/ListUsers";
import CreateTemplate from "./template/CreateTemplate";
import EditTemplate from "./template/EditTemplate";
import TemplateForm from "./template/TemplateForm";
import CategoryList from "./category/CategoryList";
import CategoryDetails from "./category/CategoryDetails";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={ isLoggedIn ? <MadLibList /> : <Navigate to="/login" /> }
          />
          <Route path="madlibs" element={isLoggedIn ? <MadLibList /> : <Navigate to="/login" />} />
          <Route path="madlibs/:id" element={ isLoggedIn ? <MadLibDetails /> : <Navigate to="/login" /> }/>
          <Route path="userposts" element={ isLoggedIn ? <UserMadLibs /> : <Navigate to="/login" /> }/>

          <Route path="category">
            <Route index
              element={ isLoggedIn ? <CategoryList /> : <Navigate to="/login" /> }
            />
          </Route>
          <Route path="category/:id" element={ isLoggedIn ? < CategoryDetails /> : <Navigate to="/login" /> } />
          <Route path="templates/:id" element={ isLoggedIn ? < TemplateForm /> : <Navigate to="/login" /> } />
          <Route path="templates/create" element={ isLoggedIn ? < CreateTemplate /> : <Navigate to="/login" /> } />
          <Route path="templates/edit/:existingTemplateId" element={ isLoggedIn ? < EditTemplate /> : <Navigate to="/login" /> } />

          <Route path="users">
            <Route index
              element={ isLoggedIn ? <ListUsers /> : <Navigate to="/login" /> } />
            <Route path=":id"  element={ isLoggedIn ? < UserDetails /> : <Navigate to="/login" /> } />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};