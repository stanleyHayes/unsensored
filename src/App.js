import React from 'react';
import './App.css';
import ScrollToTop from "./components/shared/scroll-to-top";
import {Switch, Route} from "react-router-dom";
import TimelinePage from "./pages/timeline/timeline-page";
import ExplorePage from "./pages/explore/explore-page";
import CreateArticlePage from "./pages/articles/create-article-page";
import UpdateArticlePage from "./pages/articles/update-article-page";
import SearchPage from "./pages/search/search-page";
import ProfilePage from "./pages/profile/profile-page";
import EditProfilePage from "./pages/profile/edit-profile-page";
import TrendingPage from "./pages/trending/trending-page";
import SignUpPage from "./pages/authentication/sign-up-page";
import SignInPage from "./pages/authentication/sign-in-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";

function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route path="/" exact={true}>
          <TimelinePage />
        </Route>

        <Route path="/explore" exact={true}>
          <ExplorePage />
        </Route>

        <Route path="/articles/new" exact={true}>
          <CreateArticlePage />
        </Route>

        <Route path="/articles/:articleId/update" exact={true}>
          <UpdateArticlePage />
        </Route>

        <Route path="/search" exact={true}>
          <SearchPage />
        </Route>

        <Route path="/profile/:username" exact={true}>
          <ProfilePage />
        </Route>

        <Route path="/edit-profile" exact={true}>
          <EditProfilePage />
        </Route>

        <Route path="/trending" exact={true}>
          <TrendingPage />
        </Route>

        <Route path="/auth/register" exact={true}>
          <SignUpPage />
        </Route>

        <Route path="/auth/login" exact={true}>
          <SignInPage />
        </Route>

        <Route path="/auth/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>

        <Route path="/auth/change-password" exact={true}>
          <ChangePasswordPage />
        </Route>
      </Switch>
    </ScrollToTop>
  );
}

export default App;
