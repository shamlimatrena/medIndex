import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

// Create a custom theme with light blue colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4", // Light blue
      light: "#67daff",
      dark: "#007ac1",
    },
    secondary: {
      main: "#81d4fa", // Lighter blue
      light: "#b6ffff",
      dark: "#4ba3c7",
    },
    background: {
      default: "#e1f5fe",
      paper: "#ffffff",
    },
  },
});

// Styled components
const GradientBox = styled(Box)({
  background: "linear-gradient(45deg,rgb(245, 246, 247) 30%, #00e5ff 90%)",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  position: "absolute",
  top: 0,
  left: 0,
  overflow: "auto",
});

const LogoContainer = styled(motion.div)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(4),
});

const ButtonContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  alignItems: "center",
  marginTop: theme.spacing(2),
});

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleGoToList = () => {
    navigate('/list');
  }

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login attempted with:", username, password);

    //place holder
    if(username=="trena" && password=="1234") {
      navigate('/admin-list');
      handleCloseLogin();
    } else {
      setLoginError(true);
    }
    
  };

  const handleInputChange = (e, setter) => {
    setLoginError(false);
    setter(e.target.value);
  };


  return (
    <ThemeProvider theme={theme}>
      <GradientBox>
        <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
          <Paper
            elevation={10}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            {/* Logo with Animation */}
            <LogoContainer
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 1.5 },
                }}
              >
                <IconButton
                  size="large"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "white",
                    p: 2,
                    border: "3px solid #03a9f4",
                    boxShadow: 3,
                  }}
                >
                  <LocalHospitalIcon sx={{ fontSize: 60 }} />
                </IconButton>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    ml: 2,
                    fontWeight: "bold",
                    color: "primary.dark",
                    letterSpacing: 1,
                  }}
                >
                  Med Index
                </Typography>
              </motion.div>
            </LogoContainer>

            <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
              Your Complete Medical Resources Database
            </Typography>

            <ButtonContainer>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: 18,
                    boxShadow: 3,
                    width: 220,
                  }}
                  onClick={handleGoToList}
                >
                  Go to Med List
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleOpenLogin}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: 18,
                    borderWidth: 2,
                    width: 220,
                  }}
                >
                  Admin Login
                </Button>
              </motion.div>
            </ButtonContainer>
          </Paper>
        </Container>
      </GradientBox>

      {/* Admin Login Dialog */}
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
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
