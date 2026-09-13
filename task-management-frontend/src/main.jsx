import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

import App from "./App.jsx";


createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <TaskProvider>

                    <App />

                </TaskProvider>

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);