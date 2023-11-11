import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./pages/Login";
import Layout from "./components/UI/layout/Layout.js";
import HomePage from "./pages/home/index.js";
import NewsPage from "./pages/news/index";
import AuthContext from "./context/auth-context";
import SponsorsPage from "./pages/sponsors/index";
import SchedulePage from "./pages/schedule/index";
import CountDownPage from "./pages/countdown/index";
import VideosPage from "./pages/videos";
import MorePage from "./pages/more";
import SocialMediaPage from "./pages/social-media";
import PhotosPage from "./pages/photos";
import NewslettersPage from "./pages/more/newsletters";

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route
          path="/home"
          exact
          element={auth.isLoggedIn ? <HomePage /> : <Login />}
        />
        <Route
          path="/login"
          exact
          element={!auth.isLoggedIn ? <Login /> : <HomePage />}
        />
        <Route
          path="/"
          exact
          element={auth.isLoggedIn ? <HomePage /> : <Login />}
        />
        <Route
          path="/news"
          exact
          element={auth.isLoggedIn ? <NewsPage /> : <Login />}
        />
        <Route
          path="/sponsors"
          exact
          element={auth.isLoggedIn ? <SponsorsPage /> : <Login />}
        />
        <Route
          path="/groups"
          exact
          element={auth.isLoggedIn ? <SchedulePage /> : <Login />}
        />
        <Route
          path="/countdown"
          exact
          element={auth.isLoggedIn ? <CountDownPage /> : <Login />}
        />
        <Route
          path="/videos"
          exact
          element={auth.isLoggedIn ? <VideosPage /> : <Login />}
        />
        <Route
          path="/more"
          exact
          element={auth.isLoggedIn ? <MorePage /> : <Login />}
        />
        <Route
          path="/social"
          exact
          element={auth.isLoggedIn ? <SocialMediaPage /> : <Login />}
        />
        <Route
          path="/photos"
          exact
          element={auth.isLoggedIn ? <PhotosPage /> : <Login />}
        />
        <Route
          path="/newsletters"
          exact
          element={auth.isLoggedIn ? <NewslettersPage /> : <Login />}
        />
        <Route path="*" element={auth.isLoggedIn ? <HomePage /> : <Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
