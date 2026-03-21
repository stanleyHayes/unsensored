import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from './socket-context';
import {
    socketArticleCreated,
    socketArticleUpdated,
    socketArticleDeleted,
} from '../redux/articles/articles-reducer';
import { socketArticleLikeToggled } from '../redux/likes/likes-reducer';
import {
    socketCommentCreated,
    socketCommentUpdated,
    socketCommentDeleted,
    socketCommentLikeToggled,
} from '../redux/comments/comments-reducer';
import {
    socketReplyCreated,
    socketReplyUpdated,
    socketReplyDeleted,
    socketReplyLikeToggled,
} from '../redux/replies/replies-reducer';
import { socketBookmarkToggled } from '../redux/bookmarks/bookmarks-reducer';
import { socketNotificationReceived } from '../redux/notifications/notifications-reducer';

const useSocketEvents = () => {
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        // Article events (global)
        socket.on('article:created', (article) => dispatch(socketArticleCreated(article)));
        socket.on('article:updated', (article) => dispatch(socketArticleUpdated(article)));
        socket.on('article:deleted', (data) => dispatch(socketArticleDeleted(data)));

        // Like events (room-scoped)
        socket.on('like:toggled', (data) => {
            if (data.type === 'ARTICLE') dispatch(socketArticleLikeToggled(data));
            else if (data.type === 'COMMENT') dispatch(socketCommentLikeToggled(data));
            else if (data.type === 'REPLY') dispatch(socketReplyLikeToggled(data));
        });

        // Comment events (room-scoped)
        socket.on('comment:created', (comment) => dispatch(socketCommentCreated(comment)));
        socket.on('comment:updated', (comment) => dispatch(socketCommentUpdated(comment)));
        socket.on('comment:deleted', (data) => dispatch(socketCommentDeleted(data)));

        // Reply events (room-scoped)
        socket.on('reply:created', (reply) => dispatch(socketReplyCreated(reply)));
        socket.on('reply:updated', (reply) => dispatch(socketReplyUpdated(reply)));
        socket.on('reply:deleted', (data) => dispatch(socketReplyDeleted(data)));

        // Bookmark events (room-scoped)
        socket.on('bookmark:toggled', (data) => dispatch(socketBookmarkToggled(data)));

        // Notification events (user-scoped)
        socket.on('notification:new', (notification) => dispatch(socketNotificationReceived(notification)));

        return () => {
            socket.off('article:created');
            socket.off('article:updated');
            socket.off('article:deleted');
            socket.off('like:toggled');
            socket.off('comment:created');
            socket.off('comment:updated');
            socket.off('comment:deleted');
            socket.off('reply:created');
            socket.off('reply:updated');
            socket.off('reply:deleted');
            socket.off('bookmark:toggled');
            socket.off('notification:new');
        };
    }, [socket, dispatch]);
};

export default useSocketEvents;
