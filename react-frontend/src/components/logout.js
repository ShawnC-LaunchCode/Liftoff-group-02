import axios from "axios";
import { useNavigate } from "react-router-dom";
import withCredentials from "./withCredentials";


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        // event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/logout',{}, withCredentials());
            console.log();
            console.log("this is status ", response.status);
            if(response.status === 200){
                navigate("/login")
              console.log('hello im if statment')
            }
          } catch (error) {
            console.error('Error logging out user:', error);
          }
        //   navigate("/login")
    };


    return (
        <div>
            <button onClick={handleLogout} className="logout">
                    logout
            </button>
            <button onClick={() => {
                navigate("/login")
            }}>
                login
            </button>
        </div>
    )
}

export default Logout;