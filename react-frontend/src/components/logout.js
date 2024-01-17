import axios from "axios";
import { useNavigate } from "react-router-dom";
import withCredentials from "./withCredentials";


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/logout',{}, withCredentials());
            console.log("this is status ", response.status);
            if(response.status === 404){
              navigate('/login');
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
            <button onClick={() => {
                console.log("hello")
            }}>
                hello
            </button>
        </div>
    )
}

export default Logout;