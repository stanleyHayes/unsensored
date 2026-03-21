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
import ArticleCommentRepliesPage from "./pages/articles/article-comment-replies-page";
import UsersPage from "./pages/users/users-page";
import MorePage from "./pages/more/more-page";
import AboutPage from "./pages/legal/about-page";
import TermsPage from "./pages/legal/terms-page";
import PrivacyPage from "./pages/legal/privacy-page";

function App() {
    useSocketEvents();

    return (
        <PageTransition>
            <Routes>
                <Route path="/" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />

                <Route path="/article/new" element={<ProtectedRoute><CreateArticlePage /></ProtectedRoute>} />

                <Route path="/articles/me" element={<ProtectedRoute><AuthoredArticlesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId" element={<ProtectedRoute><ArticleDetailPage /></ProtectedRoute>} />

                <Route path="/articles" element={<ProtectedRoute><AuthoredArticlesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/update" element={<ProtectedRoute><UpdateArticlePage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/comments" element={<ProtectedRoute><ArticleCommentsPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/comments/:commentId/replies" element={<ProtectedRoute><ArticleCommentRepliesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/likes" element={<ProtectedRoute><ArticleLikesPage /></ProtectedRoute>} />

                <Route path="/articles/:articleId/views" element={<ProtectedRoute><ArticleViewsPage /></ProtectedRoute>} />

                <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />

                <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />

                <Route path="/trending" element={<ProtectedRoute><TrendingPage /></ProtectedRoute>} />

                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />

                <Route path="/users/:userId/activities" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                <Route path="/auth/register" element={<SignUpPage />} />

                <Route path="/auth/login" element={<SignInPage />} />

                <Route path="/auth/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />

                <Route path="/more" element={<ProtectedRoute><MorePage /></ProtectedRoute>} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </PageTransition>
    );
}

export default App;
