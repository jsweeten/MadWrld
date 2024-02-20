import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./user/LoginPage";
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
import EditUser from "./user/EditUser";
import IUser from "../interfaces/IUser";

interface ApplicationViewProps {
  isLoggedIn: boolean;
  userProfile: IUser | null;
}

const ProtectedRoute: React.FC<{ isLoggedIn: boolean; path: string; element: JSX.Element }> = ({ isLoggedIn, path, element }) => {
  return isLoggedIn ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

const ApplicationViews: React.FC<ApplicationViewProps> = ({ isLoggedIn, userProfile }) => {
  return (
    <main>
      <Routes>
          <Route index element={<MadLibList />} />
          <Route path="madlibs" element={<MadLibList />} />
          <Route path="madlibs/:id" element={<MadLibDetails userProfile={userProfile} />} />
          <Route path="userposts" element={<UserMadLibs />} />
          <Route index element={<CategoryList />} />
          <Route path="category/:id" element={<CategoryDetails />} />
          <Route path="templates/create" element={<CreateTemplate />} />
          <Route path="templates/:id" element={<TemplateForm userProfile={userProfile} />} />
          <Route path="templates/edit/:existingTemplateId" element={<EditTemplate userProfile={userProfile} />} />
          <ProtectedRoute path="users" element={<ListUsers userProfile={userProfile} />} isLoggedIn={isLoggedIn} />
          <Route path="users/:userId" element={<UserDetails userProfile={userProfile} />} />
          <ProtectedRoute path="users/edit/:id" element={<EditUser userProfile={userProfile} />} isLoggedIn={isLoggedIn} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Routes>
    </main>
  );
};

export default ApplicationViews;