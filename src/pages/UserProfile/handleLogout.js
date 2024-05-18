import axios from 'axios';

const handleLogout = async (navigate) => {
    try {
        await axios.post("http://localhost:6969/logout", {
            method: "POST",
            credentials: "include" // Include cookies in the request
        });
        // Clear the token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page or perform any other action
        navigate("/Login");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export default handleLogout;
