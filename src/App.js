import { Switch, Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./pages/Login";
import Layout from "./components/UI/layout/Layout.js";
import HomwPage from "./pages/home/index.js";
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
      <Switch>
        <Route path="/" exact>
          {auth.isLoggedIn && <Redirect to="/home" />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/login" exact>
          {!auth.isLoggedIn && <Login />}
          {auth.isLoggedIn && <Redirect to="/home" />}
        </Route>

        <Route path="/home">
          {auth.isLoggedIn && <HomwPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/news">
          {auth.isLoggedIn && <NewsPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/sponsors">
          {auth.isLoggedIn && <SponsorsPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/groups">
          {auth.isLoggedIn && <SchedulePage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/countdown">
          {auth.isLoggedIn && <CountDownPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path={"/videos"}>
          {auth.isLoggedIn && <VideosPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path={"/more"}>
          {auth.isLoggedIn && <MorePage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path={"/social"}>
          {auth.isLoggedIn && <SocialMediaPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path={"/photos"}>
          {auth.isLoggedIn && <PhotosPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path={"/newsletters"}>
          {auth.isLoggedIn && <NewslettersPage />}
          {!auth.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
