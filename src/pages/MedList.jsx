import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import medicinesData from "../data/medicines.json";

const MedicineIndexPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter medicines based on search query
  const filteredMedicines = medicinesData.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Container */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search medicines by name, description or category..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Medicines Grid Container */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          height: 600, // Fixed height
          overflow: "auto", // Makes it scrollable when content exceeds height
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent={
            filteredMedicines.length < 3 ? "flex-start" : "center"
          }
        >
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      medicine.image ||
                      "https://via.placeholder.com/300x140?text=Medicine+Image"
                    }
                    alt={medicine.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {medicine.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {medicine.category}
                    </Typography>
                    <Typography variant="body2">
                      {medicine.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: "100%", p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No medicines found matching your search.
              </Typography>
            </Box>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default MedicineIndexPage;
