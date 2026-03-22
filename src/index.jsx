import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeContextProvider } from "./theme/theme-context";
import { SocketProvider } from "./socket/socket-context";
import SplashScreen from "./components/shared/splash-screen";

const Root = () => {
    const [showSplash, setShowSplash] = useState(true);
    const handleSplashFinish = useCallback(() => setShowSplash(false), []);

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeContextProvider>
                    <Provider store={store}>
                        <SocketProvider>
                            {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
                            <App />
                        </SocketProvider>
                    </Provider>
                </ThemeContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
