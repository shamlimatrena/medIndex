import { Box, Button, Container, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const Header = ({ isAdmin, searchTerm, setSearchTerm, handleDialogOpen }) => {
  const navigate = useNavigate();

  const handleGoToLandingPage = () => {
    navigate("/");
  };
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        padding: "20px",
        backgroundImage: `url("img/cover-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Button
          variant="text"
          onClick={handleGoToLandingPage}
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            letterSpacing: "1px",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
            position: "relative",
            display: "inline-block",
            px: 2,
            transition: "all 0.3s ease-in-out", 
            "&:hover": {
              boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.7)", 
              transform: "translateY(-2px)",
            },
          }}
        >
          Medicine Index
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen(false)}
            sx={{ mb: 2 }}
          >
            Add Medicine
          </Button>
        )}
      </Box>
      <TextField
        fullWidth
        label="Search by name or generic name..."
        variant="outlined"
        color="secondary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          backgroundColor: "white",
          mt: 2,
          mb: 0,
        }}
      />
    </Container>
  );
};

export default Header;
