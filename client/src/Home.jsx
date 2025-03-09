import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

  // checking login
  useEffect(() => {
    axios.get("/auth/current_user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={styles.container}>
      <h1>WELCOME TO SPOOLER!!</h1>

      {user ? (
        // logged in
        <div>
          <p>Welcome, {user.username}!</p>
          <img src={user.profilePicture} width="50" />
          <br />
          <a href="/logout">
            <button style={styles.button}>Logout</button>
          </a>
        </div>
      ) : (
        // logged out
        <a href="/auth/google">
          <button style={styles.button}>Spool Away!</button>
        </a>
      )}
    </div>
  );
};

// styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Home;
