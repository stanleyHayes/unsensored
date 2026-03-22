import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import useSocketEvents from "./socket/use-socket-events";
import PageTransition from "./components/shared/page-transition";
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
import OptionalAuthRoute from "./components/shared/optional-auth-route";
import ArticleCommentRepliesPage from "./pages/articles/article-comment-replies-page";
import UsersPage from "./pages/users/users-page";
import MorePage from "./pages/more/more-page";
import AboutPage from "./pages/legal/about-page";
import TermsPage from "./pages/legal/terms-page";
import PrivacyPage from "./pages/legal/privacy-page";
import GlobalToast from "./components/shared/global-toast";

function App() {
    useSocketEvents();

    return (
        <PageTransition>
            <Routes>
                <Route path="/" element={<OptionalAuthRoute><TimelinePage /></OptionalAuthRoute>} />

                <Route path="/article/new" element={<ProtectedRoute><CreateArticlePage /></ProtectedRoute>} />

                <Route path="/articles/me" element={<ProtectedRoute><AuthoredArticlesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId" element={<OptionalAuthRoute><ArticleDetailPage /></OptionalAuthRoute>} />

                <Route path="/articles" element={<ProtectedRoute><AuthoredArticlesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/update" element={<ProtectedRoute><UpdateArticlePage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/comments" element={<OptionalAuthRoute><ArticleCommentsPage /></OptionalAuthRoute>} />

                <Route path="/articles/:articleId/comments/:commentId/replies" element={<OptionalAuthRoute><ArticleCommentRepliesPage /></OptionalAuthRoute>} />

                <Route path="/articles/:articleId/likes" element={<OptionalAuthRoute><ArticleLikesPage /></OptionalAuthRoute>} />

                <Route path="/articles/:articleId/views" element={<OptionalAuthRoute><ArticleViewsPage /></OptionalAuthRoute>} />

                <Route path="/search" element={<OptionalAuthRoute><SearchPage /></OptionalAuthRoute>} />

                <Route path="/profile/:userId" element={<OptionalAuthRoute><ProfilePage /></OptionalAuthRoute>} />

                <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />

                <Route path="/trending" element={<OptionalAuthRoute><TrendingPage /></OptionalAuthRoute>} />

                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                <Route path="/users" element={<OptionalAuthRoute><UsersPage /></OptionalAuthRoute>} />

                <Route path="/users/:userId/activities" element={<OptionalAuthRoute><ProfilePage /></OptionalAuthRoute>} />

                <Route path="/auth/register" element={<SignUpPage />} />

                <Route path="/auth/login" element={<SignInPage />} />

                <Route path="/auth/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />

                <Route path="/more" element={<OptionalAuthRoute><MorePage /></OptionalAuthRoute>} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <GlobalToast />
        </PageTransition>
    );
}

export default App;
