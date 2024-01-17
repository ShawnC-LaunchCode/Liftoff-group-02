import axios from "axios";
import { useNavigate } from "react-router-dom";
import withCredentials from "./withCredentials";


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/logout',{}, withCredentials());
            if(response.status === 200){
                navigate("/login")
            }
          } catch (error) {
            console.error('Error logging out user:', error);
          }
    };


    return (
        <div>
            <button onClick={handleLogout} className="logout">
                    logout
            </button>
        </div>
    )
}

export default Logout;