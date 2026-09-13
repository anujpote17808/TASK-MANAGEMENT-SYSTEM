import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    function login(token, userData) {

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    }


    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: Boolean(user)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}