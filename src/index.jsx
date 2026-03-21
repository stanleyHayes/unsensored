import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeContextProvider } from "./theme/theme-context";
import { SocketProvider } from "./socket/socket-context";

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeContextProvider>
                <Provider store={store}>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </Provider>
            </ThemeContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
