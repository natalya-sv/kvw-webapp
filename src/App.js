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
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route
          path="/home"
          exact
          element={isLoggedIn ? <HomePage /> : <Login />}
        />
        <Route
          path="/login"
          exact
          element={!isLoggedIn ? <Login /> : <HomePage />}
        />
        <Route path="/" exact element={isLoggedIn ? <HomePage /> : <Login />} />
        <Route
          path="/news"
          exact
          element={isLoggedIn ? <NewsPage /> : <Login />}
        />
        <Route
          path="/sponsors"
          exact
          element={isLoggedIn ? <SponsorsPage /> : <Login />}
        />
        <Route
          path="/groups"
          exact
          element={isLoggedIn ? <SchedulePage /> : <Login />}
        />
        <Route
          path="/countdown"
          exact
          element={isLoggedIn ? <CountDownPage /> : <Login />}
        />
        <Route
          path="/videos"
          exact
          element={isLoggedIn ? <VideosPage /> : <Login />}
        />
        <Route
          path="/more"
          exact
          element={isLoggedIn ? <MorePage /> : <Login />}
        />
        <Route
          path="/social"
          exact
          element={isLoggedIn ? <SocialMediaPage /> : <Login />}
        />
        <Route
          path="/photos"
          exact
          element={isLoggedIn ? <PhotosPage /> : <Login />}
        />
        <Route
          path="/newsletters"
          exact
          element={isLoggedIn ? <NewslettersPage /> : <Login />}
        />
        <Route path="*" element={isLoggedIn ? <HomePage /> : <Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
