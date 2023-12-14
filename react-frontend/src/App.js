import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/registration";



function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" 
                element={<HomePage />}
            />

            <Route
            path="/login"
            element={<LoginPage />}
            />

            <Route
            path="/register"
            element={<RegistrationPage />}
            />
            </Routes>
        </Router>
    );
}

export default App;