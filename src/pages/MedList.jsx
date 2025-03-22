import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Box,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalPharmacy as MedicineIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

const dummyMedicines = [
  {
    id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    manufacturer: "ABC Pharma",
    description: "Pain reliever and fever reducer",
    price: "5",
    batchNumber: "12345",
    inStock: true,
    category: "Pain Relief",
  },
  {
    id: "2",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    manufacturer: "XYZ Pharma",
    description: "Anti-inflammatory pain reliever",
    price: "8",
    batchNumber: "67890",
    inStock: true,
    category: "Pain Relief",
  },
  {
    id: "3",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    manufacturer: "MediCorp",
    description: "Antibiotic for bacterial infections",
    price: "12",
    batchNumber: "11223",
    inStock: false,
    category: "Antibiotics",
  },
  {
    id: "4",
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    manufacturer: "HealthPlus",
    description: "Antihistamine for allergies",
    price: "6",
    batchNumber: "44556",
    inStock: true,
    category: "Allergy",
  },
  {
    id: "5",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    manufacturer: "DiabetiCare",
    description: "Medication for type 2 diabetes",
    price: "15",
    batchNumber: "77889",
    inStock: true,
    category: "Diabetes",
  },
];

const initialFormValues = {
  id: "",
  name: "",
  genericName: "",
  manufacturer: "",
  description: "",
  price: "",
  batchNumber: "",
  inStock: true,
  category: "",
};

const MedicineIndexApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isEditing, setIsEditing] = useState(false);
  const [filterByStock, setFilterByStock] = useState(false);

  useEffect(() => {
    // Load medicines from localStorage or use dummy data if none exists
    const storedMedicines = localStorage.getItem("medicines");
    if (storedMedicines) {
      setMedicines(JSON.parse(storedMedicines));
    } else {
      setMedicines(dummyMedicines);
      localStorage.setItem("medicines", JSON.stringify(dummyMedicines));
    }
  }, []);

  const handleDialogOpen = (isEdit = false, medicine = null) => {
    if (isEdit && medicine) {
      setFormValues(medicine);
      setIsEditing(true);
    } else {
      setFormValues({
        ...initialFormValues,
        id: Date.now().toString(),
      });
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveMedicine = () => {
    let updatedMedicines;

    if (isEditing) {
      updatedMedicines = medicines.map((med) =>
        med.id === formValues.id ? formValues : med
      );
    } else {
      updatedMedicines = [...medicines, formValues];
    }

    setMedicines(updatedMedicines);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    handleDialogClose();
  };

  const handleDeleteMedicine = (id) => {
    const updatedMedicines = medicines.filter((med) => med.id !== id);
    setMedicines(updatedMedicines);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
  };

  // Fixed filter logic
  const filteredMedicines = medicines.filter((med) => {
    // Search term check - if any field contains the search term
    const searchMatch =
      searchTerm === "" || // No search term, include all
      med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Stock filter check
    const stockMatch = !filterByStock || med.inStock;

    // Both conditions must be true
    return searchMatch && stockMatch;
  });

  // For debugging
  console.log("Search term:", searchTerm);
  console.log("Filter by stock:", filterByStock);
  console.log("Total medicines:", medicines.length);
  console.log("Filtered medicines:", filteredMedicines.length);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <AppBar position="fixed" color="primary" elevation={0}>
          <Toolbar>
            <MedicineIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Medicine Index
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="secondary"
                />
              }
              label="Admin Mode"
            />
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              mb: 4,
              p: 3,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="search-field">
                Search medicines...
              </InputLabel>
              <OutlinedInput
                id="search-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Search medicines..."
              />
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={filterByStock}
                    onChange={(e) => setFilterByStock(e.target.checked)}
                  />
                }
                label="In Stock Only"
              />

              {isAdmin && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleDialogOpen()}
                >
                  Add Medicine
                </Button>
              )}
            </Box>
          </Box>

          {filteredMedicines.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No medicines found matching your search criteria.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredMedicines.map((med) => (
                <Grid item xs={12} sm={6} md={4} key={med.id}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="h6" component="div" gutterBottom>
                          {med.name}
                        </Typography>
                        <Chip
                          label={med.inStock ? "In Stock" : "Out of Stock"}
                          color={med.inStock ? "success" : "error"}
                          size="small"
                        />
                      </Box>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {med.genericName}
                      </Typography>

                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Chip
                          label={med.category || "Uncategorized"}
                          size="small"
                          sx={{
                            mr: 1,
                            bgcolor: "primary.light",
                            color: "white",
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ mb: 0.5 }}
                        >
                          <strong>Manufacturer:</strong> {med.manufacturer}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ mb: 0.5 }}
                        >
                          <strong>Description:</strong> {med.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ mb: 0.5 }}
                        >
                          <strong>Batch Number:</strong> {med.batchNumber}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography variant="h6" color="primary.main">
                          ${med.price}
                        </Typography>

                        {isAdmin && (
                          <Box>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleDialogOpen(true, med)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteMedicine(med.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Add/Edit Medicine Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Edit Medicine" : "Add New Medicine"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Medicine Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Generic Name"
              name="genericName"
              value={formValues.genericName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Category"
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={formValues.manufacturer}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Price ($)"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Batch Number"
                name="batchNumber"
                value={formValues.batchNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.inStock}
                  onChange={handleInputChange}
                  name="inStock"
                />
              }
              label="In Stock"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleSaveMedicine}
            variant="contained"
            color="primary"
            disabled={!formValues.name || !formValues.genericName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MedicineIndexApp;
