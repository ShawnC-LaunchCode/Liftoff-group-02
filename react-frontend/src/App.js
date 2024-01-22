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
import AboutPage from './pages/about';
import FriendsPage from './pages/friends';
import WeatherAPI from './components/WeatherAPI';

function App() {

    return (
        <Router >
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

                <Route
                    //temp weather path
                    path='/weather'
                    element={<WeatherAPI />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/friends"
                    element={<FriendsPage />}
                />
            </Routes>
        </Router>
    )
}

export default App;