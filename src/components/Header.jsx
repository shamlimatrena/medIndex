import { Box, Button, Container, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Header = ({ isAdmin, searchTerm, setSearchTerm, handleDialogOpen }) => {
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
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: "1px",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
            position: "relative",
            display: "inline-block",
            px: 2,
          }}
        >
          Medicine Index
        </Typography>
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
