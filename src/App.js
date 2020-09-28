import React from 'react';
import './App.css';
import ScrollToTop from "./components/shared/scroll-to-top";
import {Switch, Route} from "react-router-dom";
import TimelinePage from "./pages/articles/timeline-articles-page";
import CreateArticlePage from "./pages/articles/create-article-page";
import UpdateArticlePage from "./pages/articles/update-article-page";
import SearchPage from "./pages/articles/search-articles-page";
import ProfilePage from "./pages/profile/profile-page";
import EditProfilePage from "./pages/profile/edit-profile-page";
import TrendingPage from "./pages/articles/trending-articles-page";
import SignUpPage from "./pages/authentication/sign-up-page";
import SignInPage from "./pages/authentication/sign-in-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";
import ArticleDetailPage from "./pages/articles/article-detail-page";
import AuthoredArticlesPage from "./pages/articles/authored-articles-page";
import ArticleCommentsPage from "./pages/articles/article-comments-page";
import ArticleViewsPage from "./pages/articles/article-views-page";
import ArticleLikesPage from "./pages/articles/article-likes-page";
import PageNotFound from "./pages/404/404-page-not-found-page";
import ProtectedRoute from "./components/shared/protected-route";
import ArticleCommentRepliesPage from "./pages/articles/article-comment-replies-page";
import UsersPage from "./pages/users/users-page";

function App() {
    return (
        <ScrollToTop>
            <Switch>
                <ProtectedRoute component={TimelinePage} path="/" exact={true}/>

                <ProtectedRoute component={CreateArticlePage} path="/article/new" exact={true}/>

                <ProtectedRoute component={ArticleDetailPage} path="/articles/:articleId" exact={true}/>

                <ProtectedRoute component={AuthoredArticlesPage} path="/articles" exact={true}/>

                <ProtectedRoute component={UpdateArticlePage} path="/articles/:articleId/update" exact={true}/>

                <ProtectedRoute component={ArticleCommentsPage} path="/articles/:articleId/comments" exact={true}/>

                <ProtectedRoute component={ArticleCommentRepliesPage} path="/articles/:articleId/comments/:commentId/replies" exact={true}/>

                <ProtectedRoute component={ArticleLikesPage} path="/articles/:articleId/likes" exact={true}/>

                <ProtectedRoute component={ArticleViewsPage} path="/articles/:articleId/views" exact={true}/>

                <ProtectedRoute component={SearchPage} path="/search" exact={true}/>

                <ProtectedRoute component={ProfilePage} path="/profile/:userId" exact={true}/>

                <ProtectedRoute component={EditProfilePage} path="/edit-profile" exact={true}/>

                <ProtectedRoute component={TrendingPage} path="/trending" exact={true}/>

                <ProtectedRoute path="/auth/forgot-password" component={ForgotPasswordPage}/>

                <ProtectedRoute path="/users" component={UsersPage}/>

                <Route path="/auth/register" exact={true}>
                    <SignUpPage/>
                </Route>

                <Route path="/auth/login" exact={true}>
                    <SignInPage/>
                </Route>

                <Route path="/auth/forgot-password" exact={true}>
                    <ForgotPasswordPage/>
                </Route>

                <ProtectedRoute component={ChangePasswordPage} path="/auth/change-password" exact={true}/>

                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
        </ScrollToTop>
    );
}

export default App;
