import axios from "axios";

authorize = () => {
    
    let username = this.state.username;
    let password = this.state.password;
    
    fetch("http://localhost:8080/login", {
        headers: {
            "Authorization": 'basic' + window.btoa(username + ":" + password)
        }
    }).then(response => {
        console.log(response);
        if (response.ok) {
            this.setState({
                isLoginSucces : true});
        } else {
            this.setState({isLoginSucces: false});
        }

        return response.text();
    });
}