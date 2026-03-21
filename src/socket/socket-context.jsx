import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { TOKEN_KEY } from '../constants/constants';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;

        const socketUrl = import.meta.env.VITE_API_URL
            ? new URL(import.meta.env.VITE_API_URL).origin
            : window.location.origin;

        const newSocket = io(socketUrl, {
            auth: { token },
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useArticleRoom = (articleId) => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket || !articleId) return;

        socket.emit('article:join', articleId);

        return () => {
            socket.emit('article:leave', articleId);
        };
    }, [socket, articleId]);
};
