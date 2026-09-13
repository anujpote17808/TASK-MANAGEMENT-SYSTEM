import "./App.css";

import AppNavbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import {
    Routes,
    Route
} from "react-router-dom";


function App() {

    return (

        <>

            <AppNavbar />

            <Routes>

                {/* Public routes */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Protected routes */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/tasks"
                        element={<Tasks />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

            </Routes>

        </>

    );

}


export default App;