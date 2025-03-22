import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
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
  Grid2,
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

// Search Component
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filterByStock,
  setFilterByStock,
  isAdmin,
  onAddClick,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        width: "100%",
        mb: 4,
      }}
    >
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="search-field">Search medicines...</InputLabel>
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
            onClick={onAddClick}
          >
            Add Medicine
          </Button>
        )}
      </Box>
    </Box>
  );
};

// Medicine Card Component
const MedicineCard = ({ medicine, isAdmin, onEditClick, onDeleteClick }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {medicine.name}
          </Typography>
          <Chip
            label={medicine.inStock ? "In Stock" : "Out of Stock"}
            color={medicine.inStock ? "success" : "error"}
            size="small"
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {medicine.genericName}
        </Typography>

        <Box sx={{ mt: 1, mb: 2 }}>
          <Chip
            label={medicine.category || "Uncategorized"}
            size="small"
            sx={{ mr: 1, bgcolor: "primary.light", color: "white" }}
          />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" component="div" sx={{ mb: 0.5 }}>
            <strong>Manufacturer:</strong> {medicine.manufacturer}
          </Typography>
          <Typography variant="body2" component="div" sx={{ mb: 0.5 }}>
            <strong>Description:</strong> {medicine.description}
          </Typography>
          <Typography variant="body2" component="div" sx={{ mb: 0.5 }}>
            <strong>Batch Number:</strong> {medicine.batchNumber}
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
            ${medicine.price}
          </Typography>

          {isAdmin && (
            <Box>
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEditClick(medicine)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteClick(medicine.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// Medicine Grid2 Component
const MedicineGrid = ({ medicines, isAdmin, onEditClick, onDeleteClick }) => {
  return medicines.length === 0 ? (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        width: "100%",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No medicines found matching your search criteria.
      </Typography>
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Grid2 container spacing={3} disableEqualOverflow>
        {medicines.map((medicine) => (
          <Grid2 xs={12} sm={6} md={4} key={medicine.id}>
            <MedicineCard
              medicine={medicine}
              isAdmin={isAdmin}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

// Main App Component
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

  // Filter medicines
  const filteredMedicines = medicines.filter((med) => {
    const searchMatch =
      searchTerm === "" ||
      med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const stockMatch = !filterByStock || med.inStock;

    return searchMatch && stockMatch;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
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
        {/* Main content area with fixed width */}
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
          }}
        >
          {/* Search Component */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterByStock={filterByStock}
            setFilterByStock={setFilterByStock}
            isAdmin={isAdmin}
            onAddClick={() => handleDialogOpen()}
          />

          {/* Medicine Grid2 Component */}
          <MedicineGrid
            medicines={filteredMedicines}
            isAdmin={isAdmin}
            onEditClick={(medicine) => handleDialogOpen(true, medicine)}
            onDeleteClick={handleDeleteMedicine}
          />
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
