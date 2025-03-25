import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_LOGIN_URL;

const LoginPopup = ({ openLogin, handleCloseLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    //loading state for button
    setIsLoading(true);

    try {
      const authHeader = "Basic " + btoa(`${username}:${password}`);

      const response = await axios.post(
        API_URL,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 200) {
        const combinedAuth = username + ":::" + password;
        const encodedAuth = btoa(combinedAuth);

        sessionStorage.setItem("isAdmin", "true");
        sessionStorage.setItem("adminAuth", encodedAuth);

        navigate("/admin-list");
        handleCloseLogin();
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, setter) => {
    setLoginError(false);
    setter(e.target.value);
  };

  return (
    <Dialog open={openLogin} onClose={handleCloseLogin}>
      <DialogTitle sx={{ bgcolor: "primary.light", color: "white" }}>
        Admin Login
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 1, px: 3, mt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          error={loginError}
          helperText={loginError ? "Invalid username or password" : ""}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleCloseLogin} variant="text">
          Cancel
        </Button>
        <Button onClick={handleLogin} loading={isLoading} variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LoginPopup;
