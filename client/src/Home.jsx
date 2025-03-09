import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, Avatar } from "@mui/material";

const Home = () => {
  const [user, setUser] = useState(null);

  // checking login
  useEffect(() => {
    axios
      .get("/auth/current_user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="black">
        WELCOME TO SPOOLER!!
      </Typography>

      {user ? (
        // login
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" color="black">
            Welcome, {user.username}!
          </Typography>
          <Avatar
            src={user.profilePicture}
            alt="User Profile"
            sx={{ width: 80, height: 80, mt: 2 }}
          />
          <Button
            variant="contained"
            href="/logout"
            sx={{
              mt: 2,
              backgroundColor: "rgb(229, 229, 234)",
              color: "rgb(87,27,126)",
              "&:hover": {
                backgroundColor: "rgb(200, 200, 220)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        // logout
        <Button
          variant="contained"
          href="/auth/google"
          sx={{
            mt: 4,
            backgroundColor: "rgb(31, 101, 66)",
            color: "rgb(229, 229, 234)",
            "&:hover": {
              backgroundColor: "rgb(160, 132, 72)",
            },
          }}
        >
          Spool Away!
        </Button>
      )}
    </Box>
  );
};

export default Home;
